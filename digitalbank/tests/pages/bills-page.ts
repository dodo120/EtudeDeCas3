import { expect, Locator, Page, test } from '@playwright/test';

export class BillsPage {

  readonly pendingBillsContainer: Locator;
  readonly billItems: Locator;
  readonly billProviders: Locator;
  readonly billReferences: Locator;
  readonly billDues: Locator;
  readonly billAmounts: Locator;
  readonly payButtons: Locator;
  readonly confirmModal: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;
  readonly successAlert: Locator;

  constructor(public page: Page) {

    this.pendingBillsContainer = page.getByTestId('pending-bills');
    this.billItems = page.locator('.bill-item');
    this.billProviders = page.locator('.bill-provider');
    this.billReferences = page.locator('.bill-reference');
    this.billDues = page.locator('.bill-due');
    this.billAmounts = page.locator('.bill-amount');
    this.payButtons = page.locator('[data-testid^="btn-pay-bill-"]');
    this.confirmModal = page.getByTestId('modal-confirm-payment');
    this.confirmButton = page.getByTestId('btn-confirm-payment');
    this.cancelButton = page.getByTestId('btn-cancel-payment');
    this.successAlert = page.getByTestId('bill-success');
  }

  async expectListHasAtLeast(min = 1) {
    await test.step(`Vérifier qu'il y a au moins ${min} facture(s)`, async () => {
      const count = await this.billItems.count();
      expect(count).toBeGreaterThanOrEqual(min);
    });
  }

  async expectBillItemFieldsVisible() {
    const first = this.billItems.first();
    await expect(first.locator('.bill-provider')).toBeVisible();
    await expect(first.locator('.bill-reference')).toBeVisible();
    await expect(first.locator('.bill-due')).toBeVisible();
    await expect(first.locator('.bill-amount')).toBeVisible();
    await expect(first.locator('[data-testid^="btn-pay-bill-"]')).toBeVisible();
  }

  private billItemByProvider(provider: string): Locator {
    return this.billItems.filter({
      has: this.page.locator('.bill-provider', { hasText: provider }),
    });
  }

  async clickPayForProvider(provider: string) {
    await test.step(`Sélectionner la facture du fournisseur : ${provider} et cliquer "Payer"`, async () => {
      const item = this.billItemByProvider(provider);
      await expect(item, `Aucune facture trouvée pour fournisseur "${provider}"`).toHaveCount(1);

      const row = item.first();
      await row.scrollIntoViewIfNeeded();
      await expect(row).toBeVisible;

      const payBtn = row.locator('[data-testid^="btn-pay-bill-"]');
      await expect(payBtn).toBeVisible();
      await payBtn.click();
    });
  }

  async waitForConfirmModal() {
    await test.step('Attendre la modale de confirmation de paiement', async () => {
      await expect(this.confirmModal).toBeVisible();
    });
  }

  async confirmPayment() {
    await test.step('Confirmer le paiement', async () => {
      await this.confirmButton.click();
    });
  }

  async cancelPayment() {
    await test.step('Annuler le paiement', async () => {
      await this.cancelButton.click();
      await expect(this.confirmModal).toBeHidden();
    });
  }

  async expectPaymentSuccess(messagePart?: string) {
    await test.step('Vérifier le message de succès', async () => {
      await expect(this.successAlert).toBeVisible();
      if (messagePart) {
        await expect(this.successAlert).toContainText(messagePart);
      }
    });
  }

  async payBillByProvider(provider: string, expectedSuccessPart?: string) {
    await this.clickPayForProvider(provider);
    await this.waitForConfirmModal();
    await this.confirmPayment();
    await this.expectPaymentSuccess(expectedSuccessPart);
  }
}