import {
  Component,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  SecurityContext,
} from '@angular/core';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { NgIf, NgForOf, NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
  htmlContent?: SafeHtml | string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass, CommonModule, FormsModule, TranslatePipe],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatBody') private chatBodyContainer!: ElementRef;

  constructor(private sanitizer: DomSanitizer) {}

  messages: ChatMessage[] = [];
  userInput: string = '';
  isChatOpen: boolean = false;
  isTyping: boolean = false;

  // private readonly webhookUrl =
  //   'https://n8n.marcopalummieri.de/webhook/138e6ea1-ec82-4503-9126-0f74d9b88a99/chat';
  // Live:
  private readonly webhookUrl = 'chat-proxy.php';

  ngOnInit(): void {
    this.loadChatFromLocalStorage();
  }

  // Sorgt dafür, dass bei neuen Nachrichten automatisch nach unten gescrollt wird
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  getChatId(): string {
    let chatId = sessionStorage.getItem('chatId');
    if (!chatId) {
      chatId = 'chat_' + Math.random().toString(36).substring(2, 11);
      sessionStorage.setItem('chatId', chatId);
    }
    return chatId;
  }

  async sendMessage() {
    const text = this.userInput.trim();
    if (!text) return;

    // User Nachricht lokal hinzufügen
    this.messages.push({ type: 'user', text });
    this.userInput = '';
    this.isTyping = true;

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.getChatId(),
          chatInput: text,
          route: 'general',
        }),
      });

      const data = await response.json();
      this.isTyping = false;

      const botText = (
        data.output || 'Leider konnte ich das nicht verstehen.'
      ).trim();

      // Markdown Check
      const looksLikeMarkdown =
        /(^#{1,6}\s)|(\*\*.*\*\*)|(^-\s)|(^\*\s)|(```)/m.test(botText);

      let finalHtml: SafeHtml | string = botText;

      if (looksLikeMarkdown) {
        // 1. Markdown in HTML umwandeln
        const rawHtml = marked.parse(botText) as string;

        // 2. HTML säubern (Entfernt <script>, onerror, etc.)
        const cleanHtml = DOMPurify.sanitize(rawHtml);

        // 3. Angular sagen, dass dieses saubere HTML sicher ist
        finalHtml = this.sanitizer.bypassSecurityTrustHtml(cleanHtml);
      }

      this.messages.push({
        type: 'bot',
        text: botText,
        htmlContent: finalHtml,
      });

      this.saveChatToLocalStorage();
    } catch (error) {
      this.isTyping = false;
      this.messages.push({
        type: 'bot',
        text: 'Verbindungsproblem. Bitte versuche es später noch einmal.',
      });
    }
  }

  private saveChatToLocalStorage() {
    // SafeHtml nicht direkt serialisierbar -> als string speichern (sicher sanitizen)
    const serializable = this.messages.map((m) => {
      let htmlString: string | null = null;
      if (m.htmlContent) {
        // Falls bereits SafeHtml, sanitiere es zu String
        try {
          htmlString =
            this.sanitizer.sanitize(
              SecurityContext.HTML,
              m.htmlContent as any
            ) || null;
        } catch {
          htmlString = typeof m.htmlContent === 'string' ? m.htmlContent : null;
        }
      }
      return { type: m.type, text: m.text, htmlContent: htmlString };
    });

    const payload = {
      messages: serializable.slice(-50), // Letzte 50 Nachrichten
      savedAt: Date.now(),
    };
    localStorage.setItem('chatMessages', JSON.stringify(payload));
  }

  private loadChatFromLocalStorage() {
    try {
      const raw = localStorage.getItem('chatMessages');
      if (!raw) return;

      const data = JSON.parse(raw);
      const EXPIRATION_TIME = 2 * 60 * 60 * 1000;

      if (Date.now() - data.savedAt < EXPIRATION_TIME) {
        // Auf SafeHtml zurückkonvertieren
        this.messages = data.messages.map((m: any) => {
          if (m.htmlContent) {
            const clean = DOMPurify.sanitize(m.htmlContent);
            return {
              type: m.type,
              text: m.text,
              htmlContent: this.sanitizer.bypassSecurityTrustHtml(clean),
            };
          }
          return { type: m.type, text: m.text };
        });
      } else {
        localStorage.removeItem('chatMessages');
      }
    } catch (err) {
      localStorage.removeItem('chatMessages');
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatBodyContainer.nativeElement.scrollTop =
        this.chatBodyContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
