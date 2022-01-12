import { getUpdateStrategy } from "./update-strategies/update-strategy-helper";

/**
 * Class representing an article.
 * @param {string} name The name of the item.
 * @param {number} category The number of days we have to sell the item
 * @param {number} quality The number of denotes how valuable the item is
 */
export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality : number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    /**
     * Update the quality of the items according to the category to which they correspond.
     * @returns an array with updated items 
     */
    updateQuality() : Array<Item> {
        this.items.forEach(item => {
            let updateStrategy = getUpdateStrategy(item.name);
            updateStrategy.updateItem(item);
        });
        return this.items;
    }
}
