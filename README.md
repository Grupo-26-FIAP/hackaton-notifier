# Hackaton Notifier

Sistema de envio de notificações por e-mail para falhas no processo de upload de vídeos. Desenvolvido como parte do projeto do Tech Challenge da FIAP.

## ✨ Tecnologias

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Handlebars](https://handlebarsjs.com/)
- [AWS SQS](https://aws.amazon.com/pt/sqs/)
- [Mailtrap](https://mailtrap.io/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/)

## 📁 Estrutura de Pastas

```
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── infrastructure/
│   ├── email/
│   │   ├── mail.service.ts
│   │   ├── templates/
│   │   │   └── video-upload-failure.hbs
│   ├── queue/
│   │   └── consumer/
│   │       └── sqs.consumer.ts
├── domain/
│   └── notification/
│       ├── notification.repository.ts
│       └── notification.service.ts
└── main.ts
```

## 🚀 Funcionalidades

- Consumo de mensagens da fila AWS SQS.
- Envio de e-mails utilizando templates dinâmicos com Handlebars.
- Template atual: `video-upload-failure.hbs`
- Estrutura modular (Controller, Service, Repository).

## 🔧 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Grupo-26-FIAP/hackaton-notifier.git
cd hackaton-notifier
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz com os seguintes dados:

```env
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=seu_usuario_mailtrap
MAIL_PASS=sua_senha_mailtrap
MAIL_FROM=no-reply@example.com

AWS_REGION=us-east-1
AWS_SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/123456789012/sua-fila
AWS_ACCESS_KEY_ID=sua_chave_aws
AWS_SECRET_ACCESS_KEY=sua_secreta_aws
```

### 4. Rodando a aplicação

```bash
npm run start:dev
```

### 5. Rodando com Docker

```bash
docker build -t hackaton-notifier .
docker-compose up
```

## 🧪 Testes

```bash
npm run test
```

## 📬 Template de E-mail

Template: `video-upload-failure.hbs`

Parâmetros dinâmicos aceitos:

- `name`: nome do usuário
- `videoTitle`: título do vídeo com erro
- `supportUrl`: link para suporte
- `year`: ano atual

## 📦 Produção

A pasta `dist/` gerada após `npm run build` inclui os templates compilados corretamente para uso em produção.

## 👥 Contribuidores

- Grupo 26 – FIAP Tech Challenge

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.
