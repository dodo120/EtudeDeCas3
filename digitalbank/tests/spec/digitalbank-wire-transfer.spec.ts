import { test, expect } from '../base-test';
import user from '../data/user.json';
import { Utils } from '../utils/utils';

test.beforeEach(async ({ page, loginPage, homePage }) => {
    await page.goto('/');
    const userData = user.StandardAccount;
    await loginPage.login(userData.email, userData.password, true);
    await homePage.navigateToWireTransferTab();
});

test.describe('DigitalBank Wire Transfer Internal', () => {

    test('Valid WireTransfer Internal Without Description', async ({ wireTransferPage }) => {
        wireTransferPage.internalWireTransfer("Livret A", "Compte Courant","500");
        await expect(wireTransferPage.validMessage).toBeVisible();
    });

    test('Valid WireTransfer Internal With Description', async ({ wireTransferPage }) => {
        wireTransferPage.internalWireTransfer("Livret A", "Compte Courant","500", "Gift For Mom");
        await expect(wireTransferPage.validMessage,"Virement effectué avec succès !").toBeVisible();
    });

    test('Invalid WireTransfer Internal', async ({ wireTransferPage }) => {
        wireTransferPage.internalWireTransfer("Livret A", "Compte Courant","50000");
        await expect(wireTransferPage.errorMessage,"Solde insuffisant pour effectuer ce virement").toBeVisible();
    });

});

test.describe('DigitalBank Wire Transfer External', () => {

    test('Valid WireTransfer External Without Description', async ({ wireTransferPage }) => {
        wireTransferPage.externalWireTransfer("Livret A", "Marc Bernard","500");
        await expect(wireTransferPage.validMessage).toBeVisible();
    });

    test('Valid WireTransfer External With Description', async ({ wireTransferPage }) => {
        wireTransferPage.externalWireTransfer("Livret A", "Marc Bernard","500", "Gift For Marc");
        await expect(wireTransferPage.validMessage).toBeVisible();
    });

    test('Valid WireTransfer External With new Benificiary', async ({ wireTransferPage }) => {
        const name = Utils.randomName();
        const iban = Utils.randomIban();
        await wireTransferPage.addBeneficiary(name,iban)
        await wireTransferPage.externalWireTransfer("Livret A", name, "500", "Gift For Marc");
        await expect(wireTransferPage.validMessage).toBeVisible();
    });

    test('Invalid WireTransfer Enternal', async ({ wireTransferPage }) => {
        wireTransferPage.externalWireTransfer("Livret A", "Marc Bernard","50000", "Gift For Marc");
        await expect(wireTransferPage.errorMessage).toBeVisible();
    });

});