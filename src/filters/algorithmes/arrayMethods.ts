import { Recipe } from "../../types/Recipe";
import { executeAndLogTiming } from "../../utils/performance";
import { recipeMatchAppliances, recipeMatchGlobalSearch, recipeMatchIngredients, recipeMatchUstensils } from "./common";

export function filterWithArrayMethods(
    allRecipes: Recipe[],
    selectedIngredients: Set<string>,
    selectedAppliances: Set<string>,
    selectedUstensils: Set<string>,
    globalSearch: string | undefined
): Recipe[] {
    return executeAndLogTiming("filterWithArrayMethods", () => {
        if (
            selectedIngredients.size === 0 &&
            selectedAppliances.size === 0 &&
            selectedUstensils.size === 0 &&
            globalSearch === undefined
        ) {
            return allRecipes;
        }

        return allRecipes.filter(
            recipe =>
                (recipeMatchAppliances(recipe, selectedAppliances) &&
                    recipeMatchIngredients(recipe, selectedIngredients) &&
                    recipeMatchUstensils(recipe, selectedUstensils)) ||
                recipeMatchGlobalSearch(recipe, globalSearch)
        );
    });
}
