import { Recipe } from "../../types/Recipe";
import {
    recipeMatchAppliances,
    recipeMatchGlobalSearch,
    recipeMatchIngredients,
    recipeMatchUstensils,
} from "./common.ts";

export function filterWithNativeLoop(
    allRecipes: Recipe[],
    selectedIngredients: Set<string>,
    selectedAppliance: string | undefined,
    selectedUstensils: Set<string>,
    globalSearch: string | undefined
): Recipe[] {
    if (
        selectedIngredients.size === 0 &&
        !selectedAppliance &&
        selectedUstensils.size === 0 &&
        globalSearch === undefined
    ) {
        return allRecipes;
    }

    const filteredRecipes: Recipe[] = [];

    for (const recipe of allRecipes) {
        if (!selectedAppliance && selectedIngredients.size === 0 && selectedUstensils.size === 0) {
            if (recipeMatchGlobalSearch(recipe, globalSearch)) {
                filteredRecipes.push(recipe);
            }
        } else if (
            recipeMatchAppliances(recipe, selectedAppliance) &&
            recipeMatchIngredients(recipe, selectedIngredients) &&
            recipeMatchUstensils(recipe, selectedUstensils) &&
            recipeMatchGlobalSearch(recipe, globalSearch)
        ) {
            filteredRecipes.push(recipe);
        }
    }

    return filteredRecipes;
}
