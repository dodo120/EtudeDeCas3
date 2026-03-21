import { test, expect, Page, Locator} from '@playwright/test';

export class LoginPage {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly forgotPasswordLink: Locator;
    readonly errorMessage: Locator;
    readonly twoFAInput: Locator;
    readonly twoFASubmitButton: Locator;
    readonly twoFAErrorMessage: Locator;
    readonly loginContainer: Locator;

    constructor(public page: Page) {
        this.usernameInput = page.getByTestId('input-email');
        this.passwordInput = page.getByTestId('input-password');
        this.loginButton = page.getByTestId('btn-login');
        this.rememberMeCheckbox = page.getByTestId('checkbox-remember');
        this.forgotPasswordLink = page.getByTestId('link-forgot-password');
        this.errorMessage = page.getByTestId('login-error');
        this.twoFAInput = page.locator('.code-inputs');
        this.twoFASubmitButton = page.getByTestId('btn-verify-2fa');
        this.twoFAErrorMessage = page.getByTestId('2fa-error');
        this.loginContainer = page.locator('form#login-form');
    }

    async login(username: string, password: string, rememberMe: boolean = false) {
        const stepName = `Logging in with username: ${username}`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
        if (rememberMe) {
            await this.rememberMeCheckbox.check();
        }
        await this.loginButton.click();
        });
    }

    async checkErrorMessage(expectedMessage: string) {
        const stepName = `Checking error message: ${expectedMessage}`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await expect(this.errorMessage).toBeVisible();
            await expect(this.errorMessage).toHaveText(expectedMessage);
        }); 
    }

    async login2FA(username: string, password: string, twoFACode: string, rememberMe: boolean = false) {
        await this.login(username, password, rememberMe);
        const stepName = `Entering 2FA code: ${twoFACode}`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await expect(this.twoFAInput).toBeVisible();
            const inputs = this.twoFAInput.locator('.code-input');
            for (let i = 0; i < twoFACode.length; i++) {
                await inputs.nth(i).fill(twoFACode[i]);
            }
            await this.twoFASubmitButton.click();
        });
    }
        
    async enter2FACode(code: string) {
        const stepName = `Entering 2FA code (manual): ${code}`;
        console.log(stepName);
        await test.step(stepName, async () => {
        await expect(this.twoFAInput).toBeVisible();
            const inputs = this.twoFAInput.locator('.code-input');
        for (let i = 0; i < code.length; i++) {
            await inputs.nth(i).fill(code[i]);
        }
        await this.twoFASubmitButton.click();
        });
    }
    
    async check2FAErrorMessage(expectedMessage: string) {
        const stepName = `Checking 2FA error message: ${expectedMessage}`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await expect(this.twoFAErrorMessage).toBeVisible();
            await expect(this.twoFAErrorMessage).toHaveText(expectedMessage);
        }); 
    }

    async navigateToForgotPassword() {
        await this.forgotPasswordLink.click();
    }
    
    async checkRememberedEmail(expectedEmail: string) {
        await test.step(`Checking remembered email: ${expectedEmail}`, async () => {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.usernameInput).toHaveValue(expectedEmail);
        });
    }
}
