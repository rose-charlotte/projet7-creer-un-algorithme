import { Recipe } from "../../types/Recipe";
import { executeAndLogTiming } from "../../utils/performance";
import { recipeMatchAppliances, recipeMatchGlobalSearch, recipeMatchIngredients, recipeMatchUstensils } from "./common";

export function filterWithNativeLoop(
    allRecipes: Recipe[],
    selectedIngredients: Set<string>,
    selectedAppliances: Set<string>,
    selectedUstensils: Set<string>,
    globalSearch: string | undefined
): Recipe[] {
    return executeAndLogTiming("filterWithNativeLoop", () => {
        if (
            selectedIngredients.size === 0 &&
            selectedAppliances.size === 0 &&
            selectedUstensils.size === 0 &&
            globalSearch === undefined
        ) {
            return allRecipes;
        }

        const filteredRecipes: Recipe[] = [];

        for (const recipe of allRecipes) {
            if (
                recipeMatchAppliances(recipe, selectedAppliances) &&
                recipeMatchGlobalSearch(recipe, globalSearch) &&
                recipeMatchIngredients(recipe, selectedIngredients) &&
                recipeMatchUstensils(recipe, selectedUstensils)
            ) {
                filteredRecipes.push(recipe);
            }
        }

        return filteredRecipes;
    });
}
