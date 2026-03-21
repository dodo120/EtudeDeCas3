import { test, expect } from '../base-test';
import user from '../data/user.json';
import message from '../data/message.json';


test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('DigitalBank Login Tests', () => {

    test('Valid Login Test', async ({ loginPage, homePage }) => {
        const userData = user.StandardAccount;
        await loginPage.login(userData.email, userData.password, true);
        await homePage.getWelcomeMessageText();
    });

    test('Valid 2FA Login Test', async ({ loginPage, homePage }) => {
        const userData = user.TwoFAAccount;
        await loginPage.login2FA(userData.email, userData.password, userData['2fa_code'], true);
        await homePage.getWelcomeMessageText();
    });

    test('Invalid Login Test', async ({ loginPage }) => {
        const userData = user.InvalidAccount;
        await loginPage.login(userData.email, userData.password, true);
        await loginPage.checkErrorMessage('Email ou mot de passe incorrect');
    });

   test ('Invalid 2FA Code Test', async ({loginPage}) => {
        const userData = user.TwoFAAccount;
        await loginPage.login(userData.email, userData.password, false)
        await loginPage.enter2FACode('999999');
        await loginPage.check2FAErrorMessage('Code de vérification incorrect');
   });

   test('Remember Me', async ({ loginPage, homePage }) => {
        const userData = user.StandardAccount;
        await loginPage.login(userData.email, userData.password, true)
        await homePage.getWelcomeMessageText();
        await homePage.logout();
        await loginPage.checkRememberedEmail(userData.email);
    });

    test('Reset Password Success', async ({ loginPage, resetPasswordPage }) => {
        await loginPage.navigateToForgotPassword()
        const userData = user.StandardAccount;
        await resetPasswordPage.resetPassword(userData.email);
        const successMessage = message.resetPassword.success.replace('{{email}}',userData.email);
        await resetPasswordPage.checkSuccessMessage(successMessage);
    });

    test('Reset Password Error', async ({ loginPage, resetPasswordPage }) => {
        await loginPage.navigateToForgotPassword()
        const userData = user.InvalidAccount;
        await resetPasswordPage.resetPassword(userData.email);
        const errorMessage = message.resetPassword.error
        await resetPasswordPage.checkErrorMessage(errorMessage);
    });

});