# Robo Atendimento WhatsApp

Bot de atendimento automatizado para WhatsApp utilizando a biblioteca [Baileys](https://github.com/adiwajshing/Baileys).

---

## Funcionalidades

- Exibe um menu com opções de atendimento.
- Responde com informações de serviços, contato e horário de atendimento.
- Mantém o estado da conversa para cada usuário.
- Reconecta automaticamente em caso de desconexão.

---

## Tecnologias

- Node.js
- Baileys (WhatsApp Web API)
- Pino (logger)
- FS (sistema de arquivos para salvar dados)

---

## Como usar

### Requisitos

- Node.js instalado (recomendo a versão 16 ou superior)
- WhatsApp no celular para escanear o QR Code

### Passos

1. Clone o repositório ou copie os arquivos para sua máquina.
2. Execute `npm install` para instalar as dependências.
3. Rode o bot com `node bot.js`.
4. No terminal, escaneie o QR Code com seu WhatsApp.
5. Após conectar, envie mensagens para seu WhatsApp e veja o bot responder.

---

## Arquivos importantes

- `bot.js` — código principal do bot.
- `db.json` — arquivo que armazena o estado das conversas.
- `auth_info/` — pasta criada automaticamente para armazenar as credenciais de autenticação.

---

## Customização

Você pode editar o menu e as respostas dentro da função `handleMessage` no arquivo `bot.js` para adaptar o bot às suas necessidades.

---

## Avisos

- O bot depende da API do WhatsApp Web, que pode mudar e afetar o funcionamento.
- Use com responsabilidade e evite spam para não ter sua conta bloqueada.

---

## Contato

Para dúvidas e suporte: atendimento@empresa.com

---
# 🤖 Robô de Atendimento para WhatsApp

Este projeto é um robô simples de atendimento via WhatsApp, desenvolvido com [Baileys](https://github.com/WhiskeySockets/Baileys) (uma API não oficial do WhatsApp Web) e Node.js. Ele oferece um menu interativo para responder automaticamente aos clientes.

---

## 🚀 Funcionalidades

- Exibição de menu interativo
- Respostas automáticas baseadas em opções
- Armazenamento de estado do usuário em arquivo local
- Suporte a reconexão automática
- Exibição de QR Code no terminal

---

## 📦 Requisitos

- Node.js 16 ou superior
- Um número do WhatsApp exclusivo para o bot (recomendado)
- Git Bash ou terminal compatível (em Windows)

---

## 🛠️ Instalação

```bash
git clone https://github.com/LuizPauloJRM/robo-whatsapp-bot.git
cd robo-whatsapp-bot
npm install

**Desenvolvido por Luiz Paulo Medeiros da Cunha Júnior**
