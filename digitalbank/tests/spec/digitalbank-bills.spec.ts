import { test, expect } from '../base-test';
import user from '../data/user.json';

test.beforeEach(async ({ page, loginPage, homePage }) => {
  await page.goto('/');
  const userData = user.StandardAccount;
  await loginPage.login(userData.email, userData.password, false);
  await homePage.getWelcomeMessageText();
  await homePage.navigateToBillTab();
});

test.describe('Paiement de Factures', () => {

  test('Consultation de la liste des factures', async ({ billsPage }) => {
    
    await billsPage.expectListHasAtLeast(1);
    await billsPage.expectBillItemFieldsVisible();
  });

  test('Paiement d’une facture EDF', async ({ billsPage }) => {

    await billsPage.payBillByProvider('EDF', 'succès');
  });

  test('Annulation du paiement', async ({ billsPage }) => {

    await billsPage.clickPayForProvider('Orange');
    await billsPage.waitForConfirmModal();
    await billsPage.cancelPayment();

    await expect(billsPage.successAlert).toBeHidden();
  });

});