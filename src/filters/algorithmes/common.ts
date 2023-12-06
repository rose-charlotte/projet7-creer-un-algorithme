import { Recipe } from "../../types/Recipe";

export function recipeMatchIngredients(recipe: Recipe, selectedIngredients: Set<string>): boolean {
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

export function recipeMatchAppliances(recipe: Recipe, selectedAppliances: Set<string>): boolean {
    if (selectedAppliances.size === 0) {
        return true;
    }
    //console.log(selectedAppliances);
    for (const appliance of selectedAppliances) {
        if (recipe.appliance.toLowerCase() !== appliance) {
            return false;
        }
    }
    return true;
}

export function recipeMatchUstensils(recipe: Recipe, selectedUstensils: Set<string>): boolean {
    if (selectedUstensils.size === 0) {
        return true;
    }
    const recipeUstensils = new Set(recipe.ustensils.map(ustensil => ustensil.toLowerCase()));

    for (const ustensil of selectedUstensils) {
        if (!recipeUstensils.has(ustensil)) {
            return false;
        }
    }
    return true;
}

export function recipeMatchGlobalSearch(recipe: Recipe, globalSearch: string | undefined): boolean {
    if (!globalSearch) {
        return true;
    }

    //console.log(globalSearch);

    if (!recipe.name.toLowerCase().includes(globalSearch.toLowerCase())) {
        return false;
    }

    // if (!recipe.name.includes(globalSearch)) {
    //     console.log(recipe.name);
    //     return false;
    // }
    //  return true;

    //console.log(recipe.name);
    // const recipeIngredients = new Set(recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()));
    // const recipeUstensils = new Set(recipe.ustensils.map(ustensil => ustensil.toLowerCase()));

    // if (
    //     !recipeIngredients.has(globalSearch) &&
    //     !recipeUstensils.has(globalSearch) &&
    //     recipe.appliance.toLowerCase() !== globalSearch
    // ) {
    //     return false;
    // }
    return true;
}
