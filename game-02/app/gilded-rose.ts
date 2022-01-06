/**
 * The abstract class Category and the method get category by name are imported to carry out the update of the articles based on the category to which they belong.
 */
import { ICategory, getCategoryByName } from "./categories";

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

/**
 * Class representing an item and its category
 */
export class ItemWithCategory extends Item {
    category: ICategory;

    constructor(item: Item, category: ICategory) {
        super(item.name, item.sellIn, item.quality)
        this.category = category;
    }

    /**
     * Update the quantity in the '' sellIn ”property of the item, as appropriate.
     */
    private updateSellIn(){
        if (this.category.canExpire){
            this.sellIn = this.sellIn - 1 ;
        }
    }

    /**
     * Updates the quality value of the item, according to the category to which it corresponds.
     */
    private updateQuality(){
        if (this.quality > this.category.minQuality){

            let increment = this.category.getIncrement(this.sellIn);

            if (((this.quality + increment) < this.category.minQuality) || this.sellIn === 0){
                this.quality = this.category.minQuality;
            } 
            else if ((this.quality + increment) > this.category.maxQuality){
                this.quality = this.category.maxQuality;
            }
            else if (this.category.canExpire){ 
                this.quality = this.sellIn + increment
            }
        }
    }

    /**
     * Updates all the properties of the item.
     */
    public updateItem(){
        this.updateSellIn();
        this.updateQuality();
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
            let category : ICategory = getCategoryByName(item.name);
            let itemWithCategory : ItemWithCategory = new ItemWithCategory(item, category);
            itemWithCategory.updateItem();
        });
        return this.items;
    }
}
