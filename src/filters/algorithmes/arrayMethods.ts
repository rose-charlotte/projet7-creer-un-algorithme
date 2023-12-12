import { Recipe } from "../../types/Recipe";
import { recipeMatchAppliances, recipeMatchGlobalSearch, recipeMatchIngredients, recipeMatchUstensils } from "./common";

export function filterWithArrayMethods(
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

    return allRecipes.filter(recipe => {
        if (!selectedAppliance && selectedIngredients.size === 0 && selectedUstensils.size === 0) {
            return recipeMatchGlobalSearch(recipe, globalSearch);
        }

        return (
            recipeMatchAppliances(recipe, selectedAppliance) &&
            recipeMatchIngredients(recipe, selectedIngredients) &&
            recipeMatchUstensils(recipe, selectedUstensils) &&
            recipeMatchGlobalSearch(recipe, globalSearch)
        );
    });
}
