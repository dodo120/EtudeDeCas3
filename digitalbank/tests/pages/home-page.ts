import { test, expect, Page, Locator} from '@playwright/test';

export class HomePage {

    readonly welcomeMessage: Locator;
    readonly navToSecurity : Locator;
    readonly navToWireTransfer : Locator;
    readonly navToAccount : Locator;
    readonly navToBill : Locator;
    readonly logoutButton : Locator;
    readonly accountContainer : Locator;
    readonly securityContainer : Locator;
    readonly wireTransferContainer : Locator;
    readonly billContainer : Locator;

    constructor(public page: Page) {
        this.welcomeMessage = page.getByRole('heading' , { name : /Bonjour, .* 👋/});
        this.navToSecurity = page.getByTestId('tab-security');
        this.navToWireTransfer = page.getByTestId('tab-transfer');
        this.navToAccount = page.getByTestId('tab-dashboard');
        this.navToBill = page.getByTestId('tab-bills');
        this.logoutButton = page.getByTestId('btn-logout');
        this.accountContainer = page.getByTestId('balance-cards');
        this.securityContainer = page.getByRole('heading' , { name : 'Paramètres de sécurité'});
        this.wireTransferContainer = page.getByRole('heading' , { name : 'Effectuer un virement'});
        this.billContainer = page.getByTestId('pending-bills');
    }

    async getWelcomeMessageText() {
        const stepName = `Getting welcome message text`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await expect(this.welcomeMessage).toBeVisible();
        });
    }

    async navigateToSecurityTab() {
        const stepName = `Navigating to Security Tab`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.navToSecurity.click();
            await expect(this.securityContainer).toBeVisible();
        });
    }

    async navigateToWireTransferTab() {
        const stepName = `Navigating to Wire Transfer Tab`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.navToWireTransfer.click();
            await expect(this.wireTransferContainer).toBeVisible();
        });
    }

    async navigateToAccountTab() {
        const stepName = `Navigating to Account Tab`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.navToAccount.click();
            await expect(this.accountContainer).toBeVisible();
        });
    }

    async navigateToBillTab() {
        const stepName = `Navigating to Bill Tab`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.navToBill.click();
            await expect(this.billContainer).toBeVisible();
        });
    }

    async logout() {
        const stepName = `Logout`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.logoutButton.click();
        });
    }
}