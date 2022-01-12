import { Item } from "../../gilded-rose";
import { UpdateStrategy } from "../interfaces/update-strategy.interface";


export class LegendaryStrategy implements UpdateStrategy {
    static textIds : string[] = ["Sulfuras"];
    constructor(){};

    updateItem(item: Item): Item {
        item.quality = 80;
        return item;
    }
}
