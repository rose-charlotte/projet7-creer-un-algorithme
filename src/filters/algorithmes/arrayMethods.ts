import { Recipe } from "../../types/Recipe";
import { executeAndLogTiming } from "../../utils/performance";

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
                recipeMatchAppliances(recipe, selectedAppliances) &&
                recipeMatchGlobalSearch(recipe, globalSearch) &&
                recipeMatchIngredients(recipe, selectedIngredients) &&
                recipeMatchUstensils(recipe, selectedUstensils)
        );
    });
}

function recipeMatchIngredients(recipe: Recipe, selectedIngredients: Set<string>): boolean {
    if (selectedIngredients.size === 0) {
        return true;
    }

    const recipeIngredients = new Set(recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()));

    for (const ingredient of selectedIngredients) {
        // Si on cherche au moins un ingredient, alors utiliser cela
        // if (recipeIngredients.has(ingredient)) {
        //     return true;
        // }

        // return false;

        // Il faut que la recette contienne tous les ingrédients demandés
        if (!recipeIngredients.has(ingredient)) {
            return false;
        }
    }

    return true;
}

function recipeMatchAppliances(recipe: Recipe, selectedAppliances: Set<string>): boolean {
    if (selectedAppliances.size === 0) {
        return true;
    }
}

function recipeMatchUstensils(recipe: Recipe, selectedUstensils: Set<string>): boolean {
    if (selectedUstensils.size === 0) {
        return true;
    }
}

function recipeMatchGlobalSearch(recipe: Recipe, globalSearch: string | undefined): boolean {
    if (!globalSearch) {
        return true;
    }
}
