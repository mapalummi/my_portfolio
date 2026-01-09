interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
}

import {
  Component,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  NgIf,
  NgForOf,
  NgClass,
  CommonModule,
} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatBody') private chatBodyContainer!: ElementRef;

  messages: ChatMessage[] = [];
  userInput: string = '';
  isChatOpen: boolean = false;
  isTyping: boolean = false;

  private readonly webhookUrl =
    'https://n8n.marcopalummieri.de/webhook/138e6ea1-ec82-4503-9126-0f74d9b88a99/chat';

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
    this.saveChatToLocalStorage();

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
      this.messages.push({ type: 'bot', text: botText });
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
    const payload = {
      messages: this.messages.slice(-50), // Letzte 50 Nachrichten
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
        this.messages = data.messages;
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
