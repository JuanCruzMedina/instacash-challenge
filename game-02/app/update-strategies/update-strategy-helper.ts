import { UpdateStrategy } from "./interfaces/update-strategy.interface";
import { ConjuredStrategy } from "./strategies/conjured.strategy";
import { LegendaryStrategy } from "./strategies/legendary.strategy";
import { NormalStrategy } from "./strategies/normal.strategy";
import { ReverseStrategy } from "./strategies/reverse.strategy";

/**
 * Contains all the strategies.
 */
 const updateStrategiesMap = {
    "Reverse": ReverseStrategy,
    "Legendary": LegendaryStrategy,
    "Conjured": ConjuredStrategy,
}

/**
 * Obtains the strategy to update corresponds based on its name.
 * @returns a category
 */
export function getUpdateStrategy(itemName: string) : UpdateStrategy {

    for (let strategyName in updateStrategiesMap) {

        let strategy  = updateStrategiesMap[strategyName];

        for (let textId of strategy.textIds) {

            if (itemName.indexOf(textId) !== -1) {
                return new strategy()
            }
        }
    }
    return new NormalStrategy();
};