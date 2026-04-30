# CLAUDE.md — Portfolio Website

## Projektübersicht

Persönliche Portfolio-Website eines freiberuflichen Frontend-Entwicklers aus Düsseldorf.
Die Seite dient als Visitenkarte, Projektübersicht und beinhaltet einen KI-gestützten Chatbot
als Live-Demo meiner technischen Fähigkeiten.

## Tech Stack

- **Framework:** Angular 17+ (Standalone Components, Signals, neuer Control Flow)
- **Sprache:** TypeScript (strict mode bevorzugt)
- **Backend/Proxy:** PHP (läuft auf All-Inkl Shared Hosting)
- **Styling:** CSS/SCSS (kein Tailwind, kein UI-Framework)
- **Build:** Angular CLI mit esbuild (Standard seit Angular 17)
- **Package Manager:** npm
- **IDE:** VS Code

## Hosting & Deployment

- **Hoster:** All-Inkl (Shared Hosting, PHP-fähig)
- **Deployment:** Statischer Build (`ng build`) → Upload des `dist/`-Ordners + PHP-Dateien ins Root
- **Hinweis:** Kein Node.js auf dem Server — Angular läuft als Client-Side SPA, PHP-Dateien werden serverseitig ausgeführt

## Features & Integrationen

### KI-Chatbot
- Backend-Workflow läuft über eine selbstgehostete **n8n**-Instanz (auf Avoro VPS via Coolify)
- Nutzt **OpenAI Embeddings** + **Supabase Vector Store** für kontextbasierte Antworten
- Der Chatbot wird über ein persönliches Datenblatt (Markdown) gespeist
- n8n-Webhook empfängt Anfragen vom Angular-Frontend

### WhatsApp Business Button
- Direkter Kontakt-Button für potenzielle Kunden
- Öffnet WhatsApp Business Chat mit vordefinierter Nachricht

### PHP-Proxy & Backend-Dateien (im Projekt-Root)
Diese PHP-Dateien liegen im Root und werden auf All-Inkl serverseitig ausgeführt:
- **`chat-proxy.php`** — Leitet Chatbot-Anfragen vom Angular-Frontend an den n8n-Webhook weiter.
  Dient als Proxy, um CORS-Probleme zu umgehen und den Webhook-Endpunkt nicht im Frontend offenzulegen.
- **`chat-limit-proxy.php`** — Rate-Limiting / Anfragebegrenzung für den Chatbot,
  damit die n8n-Instanz nicht überlastet wird.
- **`sendMail.php`** — Verarbeitet das Kontaktformular und versendet E-Mails serverseitig.

**Wichtig:** Diese Dateien sind sicherheitskritisch. Bei Änderungen auf Input-Validierung,
Rate-Limiting und das Verstecken von Endpunkten/Credentials achten.

## Code-Konventionen

### Allgemein
- **Clean Code first:** Lesbarkeit und Wartbarkeit haben Vorrang vor Cleverness
- **Sprache im Code:** Englisch (Variablen, Funktionen, Kommentare)
- **Sprache in UI-Texten:** Deutsch
- **Kommentare:** Nur wo das "Warum" nicht offensichtlich ist, nicht das "Was"

### Angular-spezifisch
- **Standalone Components** verwenden (keine NgModules)
- **Signals** für State Management bevorzugen (statt RxJS wo möglich)
- Neuen **Control Flow** nutzen (`@if`, `@for`, `@switch` statt `*ngIf`, `*ngFor`)
- Services mit `providedIn: 'root'` registrieren
- Lazy Loading für Routen verwenden
- Interfaces/Types in eigenen `.model.ts`-Dateien definieren

### Dateistruktur
```
my_portfolio/
├── src/
│   ├── app/
│   │   ├── chatbot/            # Chatbot-Komponente (n8n-Integration)
│   │   ├── contact-success-dialog/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── imprint/
│   │   ├── main-page/
│   │   ├── mobile-header/
│   │   ├── mobile-navbar/
│   │   ├── pages/
│   │   ├── privacy-policy/
│   │   ├── services/           # Angular Services
│   │   ├── shared/             # Wiederverwendbare Components, Pipes, Directives
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   └── styles.scss             # Globale Styles
├── chat-proxy.php              # Proxy → n8n Webhook (CORS-Umgehung)
├── chat-limit-proxy.php        # Rate-Limiting für Chatbot
├── sendMail.php                # Kontaktformular-Mailversand
├── angular.json
├── package.json
└── CLAUDE.md
```

### Naming Conventions
- Components: `kebab-case` (Angular CLI Standard)
- Services: `*.service.ts`
- Models/Interfaces: `*.model.ts` — PascalCase für Interface-Namen
- Konstanten: `UPPER_SNAKE_CASE`

## Wichtige Hinweise für Claude

1. **TypeScript erklären:** Ich lerne TypeScript aktiv — bei komplexeren Type-Konstrukten
   (Generics, Utility Types, Mapped Types) bitte das "Warum" kurz erklären.
2. **Angular 17+ Syntax:** Immer die neue Syntax verwenden, nicht die alte (z.B. `@if` statt `*ngIf`).
3. **Keine Over-Engineering:** Das ist ein Portfolio, kein Enterprise-Projekt. Pragmatische Lösungen bevorzugen.
4. **All-Inkl Limitierung:** Kein Node.js auf dem Server — alles was gebaut wird, muss als statischer Build deploybar sein.
5. **Bestehende Integrationen nicht brechen:** Der Chatbot kommuniziert mit einem n8n-Webhook. Bei Änderungen an der Chatbot-Komponente sicherstellen, dass die API-Calls kompatibel bleiben.
6. **PHP-Dateien mit Vorsicht behandeln:** Die PHP-Proxies sind sicherheitskritische Schnittstellen. Bei Änderungen immer auf Input-Sanitization, Error-Handling und das Verstecken von Endpunkten achten. Keine Credentials hardcoden.
