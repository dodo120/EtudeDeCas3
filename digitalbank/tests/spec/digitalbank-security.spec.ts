import { test, expect } from '../base-test';
import user from '../data/user.json';
import { Utils } from '../utils/utils';

//Connexion and go to security page
test.beforeEach(async ({ page, loginPage, homePage }) => {
    await page.goto('/');
    const userData = user.StandardAccount;
    await loginPage.login(userData.email, userData.password, true);
    await homePage.navigateToSecurityTab();
});

test.describe('DigitalBank Security Tests : Personal Information', () => {

    test('Check Personal Information', async ({ securityPage }) => {
        const userData = user.StandardAccount;
        securityPage.checkPersonalInformation(userData.name, userData.email, userData.phone);
    });

});