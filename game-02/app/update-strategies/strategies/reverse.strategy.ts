import { Item } from "../../gilded-rose";
import { UpdateStrategy } from "../interfaces/update-strategy.interface";


export class ReverseStrategy implements UpdateStrategy {
    static textIds : string[] = ["Aged Brie", "Backstage passes"];
    
    constructor(){};

    updateItem(item: Item): Item {
        
        item.sellIn -= 1;

        if (item.sellIn > 0){
            
            let increment : number = 1;
            
            if (item.sellIn <= 10){
                increment = 2;
            }
            else if (item.sellIn <= 5){
                increment = 3;
            }

            if (item.quality + increment > 50){
                item.quality = 50;
            }
            else{
                item.quality += increment;
            }
        }
        else{
            item.quality = 0;
        }   
        
        return item;
    }
}
