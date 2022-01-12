import { Item } from "../../gilded-rose";

export interface UpdateStrategy {
    updateItem(item: Item) : Item;
}
