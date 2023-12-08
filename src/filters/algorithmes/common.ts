import { Recipe } from "../../types/Recipe";

export function recipeMatchIngredients(recipe: Recipe, selectedIngredients: Set<string>): boolean {
    if (selectedIngredients.size === 0) {
        return true;
    }
    console.log(selectedIngredients);
    const recipeIngredients = new Set(recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()));

    for (const ingredient of selectedIngredients) {
        console.log(ingredient);
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
    console.log(globalSearch);
    // if (!globalSearch) {
    //     return true;
    // }

    // const lowerCaseGlobalSearch = globalSearch.toLowerCase();

    // if (recipe.name.toLowerCase().includes(lowerCaseGlobalSearch)) {
    //     return true;
    // }
    // if (recipe.description.toLowerCase().includes(lowerCaseGlobalSearch)) {
    //     return true;
    // }
    // return false;

    if (!globalSearch) {
        return true;
    }
    console.log(globalSearch);
    const lowerCaseGlobalSearch = globalSearch.toLowerCase();

    const ingredients = recipe.ingredients.flatMap(ingredient => ingredient.ingredient);
    console.log(ingredients);

    return (
        recipe.name.toLowerCase().includes(lowerCaseGlobalSearch) ||
        recipe.description.toLowerCase().includes(lowerCaseGlobalSearch)
    );
}
