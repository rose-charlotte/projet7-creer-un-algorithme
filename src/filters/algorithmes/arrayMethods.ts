import { Recipe } from "../../types/Recipe";
import { recipeMatchAppliances, recipeMatchGlobalSearch, recipeMatchIngredients, recipeMatchUstensils } from "./common";

export function filterWithArrayMethods(
    allRecipes: Recipe[],
    selectedIngredients: Set<string>,
    selectedAppliances: Set<string>,
    selectedUstensils: Set<string>,
    globalSearch: string | undefined
): Recipe[] {
    if (
        selectedIngredients.size === 0 &&
        selectedAppliances.size === 0 &&
        selectedUstensils.size === 0 &&
        globalSearch === undefined
    ) {
        return allRecipes;
    }

    return allRecipes.filter(
        recipe => {
            if (selectedAppliances.size === 0 && selectedIngredients.size === 0 && selectedUstensils.size === 0) {
                return recipeMatchGlobalSearch(recipe, globalSearch);
            }

            return (
                recipeMatchAppliances(recipe, selectedAppliances) &&
                recipeMatchIngredients(recipe, selectedIngredients) &&
                recipeMatchUstensils(recipe, selectedUstensils) &&
                recipeMatchGlobalSearch(recipe, globalSearch)
            );
        }

        // (recipeMatchAppliances(recipe, selectedAppliances) &&
        //     recipeMatchIngredients(recipe, selectedIngredients) &&
        //     recipeMatchUstensils(recipe, selectedUstensils)) ||
        // recipeMatchGlobalSearch(recipe, globalSearch)
    );
}
