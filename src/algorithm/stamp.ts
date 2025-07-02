// https://pe.usps.com/text/dmm300/Notice123.htm
import prices2024 from './prices_20240714.json';
import prices2025 from './prices_20250713.json';

const EFFECTIVE_2025 = new Date('2025-07-13');
const today = new Date();
const priceTable = today >= EFFECTIVE_2025 ? prices2025 : prices2024;

export function displayPrice(value: number): string {
    if (value < 100) {
        return value + "¢";
    } else {
        return "$" + (value / 100).toFixed(2);
    }
}

export type Product = 'letter' | 'large_envelope' | 'postcard';
export function calculatePrice(product: Product, international = false, weight = 1) {
    const price = priceTable[product];
    if (international) {
        return price.international;
    } else if (product == 'postcard') {
        return price.base;
    } else {
        return price.base + (weight - 1) * price.additional;
    }
}

export class Stamp {
    name: string;
    value: number;
    id: string;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
        this.id = name.replace(/[^a-zA-Z0-9]/g, '-') + "-" + value;
    }

    static fixed(value: number): Stamp {
        return new Stamp(displayPrice(value), value);
    }

    static forever(): Stamp {
        return new Stamp("forever", calculatePrice("letter"));
    }

    static globalForever(): Stamp {
        return new Stamp("global forever", calculatePrice("letter", true));
    }
}
