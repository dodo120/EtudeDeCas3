import { test, expect, Page, Locator} from '@playwright/test';
import { Utils } from '../utils/utils';

export class WireTransferPage {

    readonly transferInternalButton : Locator;
    readonly transferExternalButton : Locator;
    readonly selectDebitAccount : Locator;
    readonly selectCreditAccount : Locator;
    readonly amount : Locator;
    readonly description : Locator;
    readonly transferButton : Locator;
    readonly beneficiaryList : Locator;
    readonly addBeneficiaryButton: Locator;
    readonly inputBeneficiaryName: Locator;
    readonly inputBeneficiaryIban: Locator;
    readonly saveBeneficiaryButton: Locator;
    readonly validMessage: Locator;
    readonly errorMessage: Locator;

    constructor(public page: Page) {
       this.transferInternalButton = page.getByTestId('btn-transfer-internal');
       this.transferExternalButton = page.getByTestId('btn-transfer-external');
       this.selectDebitAccount = page.getByTestId('select-from-account');
       this.selectCreditAccount = page.getByTestId('select-to-account');
       this.amount = page.getByTestId('input-amount');
       this.description = page.getByTestId('input-description');
       this.transferButton = page.getByTestId('btn-submit-transfer');
       this.beneficiaryList = page.getByTestId('beneficiary-list');
       this.addBeneficiaryButton = page.getByTestId('btn-add-beneficiary');
       this.inputBeneficiaryName = page.getByTestId('input-beneficiary-name');
       this.inputBeneficiaryIban = page.getByTestId('input-beneficiary-iban');
       this.saveBeneficiaryButton = page.getByTestId('btn-save-beneficiary');
       this.validMessage = page.getByTestId('transfer-success');
       this.errorMessage = page.getByTestId('transfer-error');
    }

    async internalWireTransfer(debitAccount: string, creditAccount: string, amount: string, description?: string) {
        const stepName = `Internal Wire Transfer`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.selectDebitAccount.selectOption(Utils.getIdFromAccountName(debitAccount));
            await this.transferInternalButton.click();
            await this.selectCreditAccount.selectOption(Utils.getIdFromAccountName(creditAccount));
            await this.amount.fill(amount);
            if(description) {
                await this.description.fill(description);
            }
        }); 
        await this.transferButton.click();
    }

    async externalWireTransfer(debitAccount: string, beneficiary: string, amount: string, description?: string) {
        const stepName = `External Wire Transfer`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.transferExternalButton.click();
            await this.selectDebitAccount.selectOption(Utils.getIdFromAccountName(debitAccount));
            await this.selectBeneficiary(beneficiary)
            await this.amount.fill(amount);
            if(description) {
                await this.description.fill(description);
            }
        });
        await this.transferButton.click();
    }

    async selectBeneficiary(name: string) {
        const stepName = `Select beneficiary: ${name}`;
        console.log(stepName);
        await test.step(stepName, async () => {
            const option = this.beneficiaryList.locator('.beneficiary-option', { has: this.page.locator('.beneficiary-name', { hasText: name }) });
            await option.first().click();
        });
    }

    async addBeneficiary(name: string, iban: string) {
        const stepName = `Add beneficiary: ${name}`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.transferExternalButton.click();
            await this.addBeneficiaryButton.click();
            await this.inputBeneficiaryName.fill(name);
            await this.inputBeneficiaryIban.fill(iban);
            await this.saveBeneficiaryButton.click();
        });
    }

}