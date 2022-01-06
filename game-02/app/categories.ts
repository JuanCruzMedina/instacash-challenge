/**
 * Interface that represents the category of an article.
 */
export interface ICategory {
    name : string;
    maxQuality: number;
    minQuality: number;
    canExpire: boolean;

    /**
     * Calculate the value of quality increase
     */
    getIncrement(sellIn?: number, value? : number): number;
}

export abstract class Category implements ICategory{
    name : string;
    maxQuality: number;
    minQuality: number;
    canExpire: boolean;

    constructor(name: string, maxQuality: number,minQuality: number,canExpire: boolean) {
        this.name = name;
        this.minQuality = minQuality;
        this.maxQuality = maxQuality;
        this.canExpire = canExpire;
    }

    getIncrement(sellIn?: number): number {
        let multiplier : number = 1;
        if (sellIn !== undefined && sellIn <= 0) {
            multiplier = 2;
        }
        return multiplier;
    }
}

/**
 * Class representing the 'Normal' category. Inherits from the category class.
 * It is the default category of an article.
 */
export class Normal extends Category {
    constructor(){
        super("Normal", 0, 50,true);
    }

    getIncrement(): number{
        return -1 * super.getIncrement();
    }
}

/**
 * Class representing the 'Conjured' category. Inherits from the category class.
 * Its quality decreases twice as fast.
 */
export class Conjured extends Category{
    static textIds : string[] = ["Conjured"];

    constructor(){
        super("Conjured", 0, 50, true);
    }

    getIncrement(): number{
        return -2 * super.getIncrement();
    }
}

/**
 * Class representing the 'Legendary' category. Inherits from the category class.
   Its quality does not decrease.
 */
export class Legendary  extends Category{
    static textIds : string[] = ["Sulfuras"]

    constructor(){
        super("Legendary", 0, 80, false);
    }

    getIncrement(): number{
        return 0 ;
    }
}

/**
 * Class representing the 'ReverseQuality' category. Inherits from the category class. Its quality increases as the value of sellIn decreases.
 */
export class ReverseQuality  extends Category{
    static textIds : string[] = ["Aged Brie", "Backstage passes"]

    constructor(){
        super("ReverseQuality", 0, 50, true);
    }

    getIncrement(sellIn: number): number{
        let increment : number; 

        if (sellIn <= 10){
            increment = 2;
        }
        else if (sellIn >= 5){
            increment = 3;
        }
        else{
            increment = 1;
        }

        return increment * super.getIncrement();
    }
}

/**
 * Contains all the categories.
 */
const categoriesMap = {
    "ReverseQuality": ReverseQuality,
    "Legendary": Legendary,
    "Conjured": Conjured,
}

/**
 * Obtains the category to which an article corresponds based on its name.
 * @returns a category
 */
export function getCategoryByName(name: string) : Category {

    for (let categoryName in categoriesMap) {

        let categoryClass  = categoriesMap[categoryName];

        for (let textId of categoryClass.textIds) {

            if (name.indexOf(textId) !== -1) {
                return new categoryClass()
            }
        }
    }
    return new Normal();
};
