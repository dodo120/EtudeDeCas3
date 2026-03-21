import { test, expect } from '../base-test';
import user from '../data/user.json';

test.describe('DigitalBank Smoke Tests', () => {

    test('Valid Login Test', async ({ page, loginPage, homePage }) => {
        await page.goto('/');
        const userData = user.StandardAccount;
        await loginPage.login(userData.email, userData.password, true);
        await homePage.getWelcomeMessageText();

        await homePage.navigateToWireTransferTab()

        await homePage.navigateToBillTab();

        await homePage.navigateToSecurityTab();

        await homePage.navigateToAccountTab();

        await homePage.logout();
        await expect(loginPage.loginContainer).toBeVisible();
    });
    
});