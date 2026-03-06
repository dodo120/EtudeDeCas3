import { test, expect, Page, Locator} from '@playwright/test';

export class HomePage {

    readonly welcomeMessage: Locator;
    readonly logoutButton : Locator;

    constructor(public page: Page) {
        this.welcomeMessage = page.getByRole('heading' , { name : /Bonjour, .* 👋/});
        this.logoutButton = page.getByTestId('btn-logout');
    }

    async getWelcomeMessageText() {
        const stepName = `Getting welcome message text`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await expect(this.welcomeMessage).toBeVisible();
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