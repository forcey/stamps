import priceTable from '../algorithm/prices_20230122.json';

export function displayPrice(value) {
    if (value < 100) {
        return value + "¢";
    } else {
        return "$" + (value / 100).toFixed(2);
    }
}

export function calculatePrice(product, international = false, weight = 1) {
    const price = priceTable[product];
    if (international) {
        return price['international'];
    } else {
        return price['base'] + (weight - 1) * (price['additional'] ?? 0);
    }
}

export class Stamp {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.id = name.replace(/[^a-zA-Z0-9]/g, '-') + "-" + value;
    }

    static fixed(value) {
        return new Stamp(displayPrice(value), value);
    }

    static forever() {
        return new Stamp("forever", calculatePrice("letter"));
    }

    static globalForever() {
        return new Stamp("global forever", calculatePrice("letter", true));
    }
}
