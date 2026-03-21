import { faker } from '@faker-js/faker';
import account from '../data/account.json'

export abstract class Utils {

    public static randomPassword(): string {
        return faker.internet.password({
            length: 10,
            memorable: false,
            pattern: /[A-Za-z0-9!@#$%^&*]/,
            prefix: 'Aa1!',
        });
    }

    public static randomIban(): string {
        const iban = "FR76";
        const digits = Array.from({ length: 23 }, () => Math.floor(Math.random() * 10)).join('');
        return iban + digits;
    }

    public static randomName(): string {
        return faker.person.firstName() + " " + faker.person.lastName();
    }

    public static getIdFromAccountName(accountType: string): string {
        const accountFound = account.find(acc => acc.type === accountType)

        if(!accountFound) throw new Error(`None account found for type "${accountType}"`)

        return accountFound.id.toString()
    }
}