import { test, expect, Page, Locator} from '@playwright/test';

export class SecurityPage {

    readonly check2FA : Locator;
    readonly checkNotifyEmail : Locator;
    readonly checkNotifySMS : Locator;
    readonly editPasswordButton : Locator;
    readonly actualPasswordInput : Locator;
    readonly newPasswordInput : Locator;
    readonly confirmNewPasswordInput : Locator;
    readonly savePasswordButton : Locator;
    readonly nameText : Locator;
    readonly emailText : Locator;
    readonly phoneText : Locator;

    constructor(public page: Page) {
        this.check2FA = page.getByTestId('toggle-2fa');
        this.checkNotifyEmail = page.getByTestId('toggle-email-notifications');
        this.checkNotifySMS = page.getByTestId('toggle-sms-notifications');
        this.editPasswordButton = page.getByTestId('btn-change-password');
        this.actualPasswordInput = page.getByTestId('input-current-password');
        this.newPasswordInput = page.getByTestId('input-new-password');
        this.confirmNewPasswordInput = page.getByTestId('input-confirm-password');
        this.savePasswordButton = page.getByTestId('btn-save-password');
        this.nameText = page.getByTestId('user-name');
        this.emailText = page.getByTestId('user-email');
        this.phoneText = page.getByTestId('user-phone');
    }

    async toggle2FA(enable: boolean) {
        const isChecked = await this.check2FA.isChecked();
        if (isChecked !== enable) {
            await this.check2FA.click();
        }
    }

    async toggleNotifyEmail(enable: boolean) {
        const isChecked = await this.checkNotifyEmail.isChecked();
        if (isChecked !== enable) {
            await this.checkNotifyEmail.click();
        }
    }

    async toggleNotifySMS(enable: boolean) {
        const isChecked = await this.checkNotifySMS.isChecked();
        if (isChecked !== enable) {
            await this.checkNotifySMS.click();
        }
    }

    async editPassword(actualPassword: string, newPassword: string) {
        const stepName = `Change password`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.editPasswordButton.click();
            await this.actualPasswordInput.fill(actualPassword);
            await this.newPasswordInput.fill(newPassword);
            await this.confirmNewPasswordInput.fill(newPassword);
            await this.savePasswordButton.click();
        });
    }

    async checkPersonalInformation(name: string, email: string, phone: string) {
        const stepName = `Check Personal Information`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await expect(this.nameText).toContainText(name);
            await expect(this.emailText).toContainText(email);
            await expect(this.phoneText).toContainText(phone);
        });
    }

}