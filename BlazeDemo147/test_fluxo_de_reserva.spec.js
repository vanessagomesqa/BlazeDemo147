//Importações / Bibliotecas / Frameworks

import { test, expect } from '@playwright/test';

// Função ou método
test('Fluxo de Reserva - Cenário Positivo', async ({ page }) => {

// Abre o navegador na URL
    await page.goto('https://blazedemo.com/');

// Seleciona a origem como São Paulo
  await page.locator('select[name="fromPort"]').selectOption('São Paolo');

// Seleciona o destino como Lodon
  await page.locator('select[name="toPort"]').selectOption('London');
// Clicar no botão Find Flights
// await page.locator('.btn.btn-primary').click(); // exemplo de alternativa para o click
  await page.getByRole('button', { name: 'Find Flights' }).click();

// Mudar de página
// Verificação do texto esperado 
  await expect(page.getByRole('heading')).toCotaintText('Flights from São Paolo to London:'); 

// Selecionou um voo
  await page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button').click();

// Muda de página
// Preenchimento de campos no formulário
  await page.getByRole('textbox', { name: 'Name', exact: true }).click(); // clica no campo Nome
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Vanessa'); // preenche o nome
  await page.locator('div').nth(5).click(); 
  await page.locator('#cardType').selectOption('amex'); // seleciona a bandeira do cartão
  await page.locator('div').filter({ hasText: 'Visa American Express Diner\'s' }).nth(2).click();
  await page.getByRole('checkbox', { name: 'Remember me' }).check(); // seleciona o check box
  await expect(page.getByRole('heading')).toContainText('Your flight from TLV to SFO has been reserved.');

// Muda de página
  await page.getByRole('button', { name: 'Purchase Flight' }).click(); // clica no botão Purchase Flight
  
// Verifica o texto de agradecimento
  await expect(page.getByRole('heading')).toContainText('Thank you for your purchase today!');

// Verifica o preço (de forma grosseira)
  await expect(page.locator('tbody')).toContainText('555 USD');
});