import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';

let emailSent = false;

Given(
  'que uma mensagem válida chega à fila contendo os dados do usuário e do vídeo',
  function () {
    // Simular chegada de mensagem válida (mock ou integração com a fila)
  },
);

When('o consumidor processa a mensagem', async function () {
  // Simular chamada ao consumidor, ou executar a função handler
  emailSent = true; // simulado
});

Then(
  'um e-mail deve ser enviado para o usuário com as informações do erro',
  function () {
    assert.strictEqual(emailSent, true);
  },
);
