Feature: Envio de e-mail ao falhar o upload de vídeo

  Como sistema de notificações
  Quero notificar o usuário quando o upload de vídeo falhar
  Para que ele possa tomar uma ação ou buscar ajuda

  Background:
    Dado que o sistema está escutando a fila SQS de falhas de upload de vídeo

  Scenario: Receber mensagem de falha e enviar e-mail
    Dado que uma mensagem válida chega à fila contendo os dados do usuário e do vídeo
    Quando o consumidor processa a mensagem
    Então um e-mail deve ser enviado para o usuário com as informações do erro
    E o assunto do e-mail deve ser "Falha no upload do seu vídeo"
    E o corpo do e-mail deve conter o nome do usuário, o título do vídeo e o link de suporte

  Scenario: Mensagem inválida na fila
    Dado que uma mensagem inválida chega à fila sem os dados obrigatórios
    Quando o consumidor tentar processar a mensagem
    Então nenhuma tentativa de envio de e-mail deve ser feita
    E o erro deve ser registrado nos logs

  Scenario: Falha no envio do e-mail
    Dado que a mensagem na fila é válida
    E ocorre um erro durante o envio do e-mail (ex: SMTP indisponível)
    Quando o consumidor processa a mensagem
    Então o erro deve ser capturado e logado
    E a aplicação não deve falhar por completo
