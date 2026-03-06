import { accessibilityTest, test, expect } from '../base-test';
import user from '../data/user.json';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('DigitalBank WCAG2.1 Tests : Login Page', () => {

    accessibilityTest('Login Page', async ({ makeAxeBuilder }, testInfo) => {
        const accessibilityScanResults = await makeAxeBuilder().analyze();
        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: 'application/json'
        });
        expect(accessibilityScanResults.violations).toEqual([]);
    });

});

test.describe('DigitalBank WCAG2.1 Tests : Other Page', () => {

    test.beforeEach(async ({ loginPage }) => {
        const userData = user.StandardAccount;
        await loginPage.login(userData.email, userData.password, true);
    });

    accessibilityTest('Account Page', async ({ homePage, makeAxeBuilder }, testInfo) => {
        await homePage.navigateToAccountTab();
        const accessibilityScanResults = await makeAxeBuilder().analyze();
        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: 'application/json'
        });
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    accessibilityTest('Wire Transfer Page', async ({ homePage, makeAxeBuilder }, testInfo) => {
        await homePage.navigateToWireTransferTab();
        const accessibilityScanResults = await makeAxeBuilder().analyze();
        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: 'application/json'
        });
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    accessibilityTest('Bills Page', async ({ homePage, makeAxeBuilder }, testInfo) => {
        await homePage.navigateToBillTab();
        const accessibilityScanResults = await makeAxeBuilder().analyze();
        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: 'application/json'
        });
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    accessibilityTest('Security Page', async ({ homePage, makeAxeBuilder }, testInfo) => {
        await homePage.navigateToSecurityTab()
        const accessibilityScanResults = await makeAxeBuilder().analyze();
        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: 'application/json'
        });
        expect(accessibilityScanResults.violations).toEqual([]);
    });

});


