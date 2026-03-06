import { test as base, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { ResetPasswordPage } from './pages/reset-password-page';
import { HomePage } from './pages/home-page';
import { WireTransferPage } from './pages/wire-transfer-page';
import { BillsPage } from './pages/bills-page';

type FixturesPage = {
    loginPage: LoginPage;
    resetPasswordPage: ResetPasswordPage;
    homePage: HomePage;
    wireTransferPage: WireTransferPage;
    billsPage: BillsPage;
};

export const test = base.extend<FixturesPage>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    resetPasswordPage: async({ page }, use) => {
        const resetPasswordPage = new ResetPasswordPage(page);
        await use (resetPasswordPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
     wireTransferPage: async ({ page }, use) => {
        const wireTransferPage = new WireTransferPage(page);
        await use(wireTransferPage);
    },
     billsPage: async({ page }, use) => {
        const billsPage = new BillsPage(page);
        await use (billsPage);
    },
});


export { expect } from '@playwright/test';