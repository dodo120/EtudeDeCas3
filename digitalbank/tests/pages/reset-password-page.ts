import { test, expect, Page, Locator} from '@playwright/test';

export class ResetPasswordPage {

    readonly mailInput: Locator;
    readonly sendLinkButton: Locator;
    readonly resetSuccessMessage: Locator;
    readonly resetErrorMessage: Locator;
    

    constructor(public page: Page) {
        this.mailInput = page.getByTestId('input-reset-email');
        this.sendLinkButton = page.getByTestId('btn-reset-password');
        this.resetSuccessMessage = page.getByTestId('reset-success');
        this.resetErrorMessage = page.getByTestId('reset-error');
    }

    async resetPassword(username: string) {
        const stepName = `Reset Password for : ${username}`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.mailInput.fill(username);
            await this.sendLinkButton.click();
        });
    }

    async checkSuccessMessage(expectedMessage: string) {
        const stepName = `Checking success message: ${expectedMessage}`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await expect(this.resetSuccessMessage).toBeVisible();
            await expect(this.resetSuccessMessage).toHaveText(expectedMessage);
        }); 
    }

    async checkErrorMessage(expectedMessage: string) {
        const stepName = `Checking error message: ${expectedMessage}`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await expect(this.resetErrorMessage).toBeVisible();
            await expect(this.resetErrorMessage).toHaveText(expectedMessage);
        }); 
    }
}
