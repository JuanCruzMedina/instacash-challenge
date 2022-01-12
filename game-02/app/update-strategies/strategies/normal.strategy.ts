import { Item } from "../../gilded-rose";
import { UpdateStrategy } from "../interfaces/update-strategy.interface";

export class NormalStrategy implements UpdateStrategy {
    constructor(){};

    updateItem(item: Item): Item {
        item.sellIn -= 1 ;

        if (item.sellIn === 0){
            item.quality = 0;
        }
        else {
            let multiplier: number = item.sellIn <= 0 ? 2 : 1;
            item.quality -= 1 * multiplier;
            if (item.quality < 0) {
                item.quality = 0;
            }
        }
        
        return item;
    }
}
