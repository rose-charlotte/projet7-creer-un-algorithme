import { Recipe } from "../../types/Recipe";

const regexByGlobalSearch: Map<string, RegExp> = new Map();

export const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function recipeMatchIngredients(recipe: Recipe, selectedIngredients: Set<string>): boolean {
    if (selectedIngredients.size === 0) {
        return true;
    }

    for (const ingredient of selectedIngredients) {
        if (
            !recipe.ingredients.some(
                recipeIngredient =>
                    recipeIngredient.ingredient.localeCompare(ingredient, "fr", { sensitivity: "base" }) === 0
            )
        ) {
            return false;
        }
    }

    return true;
}

export function recipeMatchAppliances(recipe: Recipe, selectedAppliance: string | undefined): boolean {
    if (!selectedAppliance) {
        return true;
    }

    return recipe.appliance.localeCompare(selectedAppliance, "fr", { sensitivity: "base" }) === 0;
}

export function recipeMatchUstensils(recipe: Recipe, selectedUstensils: Set<string>): boolean {
    if (selectedUstensils.size === 0) {
        return true;
    }

    for (const ustensil of selectedUstensils) {
        if (
            !recipe.ustensils.some(
                recipeUstensil => recipeUstensil.localeCompare(ustensil, "fr", { sensitivity: "base" }) === 0
            )
        ) {
            return false;
        }
    }

    return true;
}

export function recipeMatchGlobalSearch(recipe: Recipe, globalSearch: string | undefined): boolean {
    if (!globalSearch) {
        return true;
    }

    const searchRegex = getGlobalSearchRegex(globalSearch);

    const recipeTitleWithoutAccent = removeAccents(recipe.name);

    if (searchRegex.test(recipeTitleWithoutAccent)) {
        return true;
    }

    const recipeDescriptionWithoutAccent = removeAccents(recipe.description);
    if (searchRegex.test(recipeDescriptionWithoutAccent)) {
        return true;
    }

    return recipe.ingredients.some(ingredient => searchRegex.test(removeAccents(ingredient.ingredient)));
}

function getGlobalSearchRegex(item: string): RegExp {
    if (regexByGlobalSearch.has(item)) {
        return regexByGlobalSearch.get(item)!;
    }
    //On cherche les strings sans accent ni majuscule
    const searchStringWithoutAccents = removeAccents(item);

    // Transforme en tableau de mots
    const searchWords = searchStringWithoutAccents.split(" ");

    // Transforme le tableau de mot en tableau de regex
    const searchWordsLookaheadRegex = searchWords.map(word => `(?=.*\\b${word}\\b)`);

    // Crée la regex finale
    const searchRegexExpression = `^${searchWordsLookaheadRegex.join("")}.*$`;

    const regex = new RegExp(searchRegexExpression, "i");

    regexByGlobalSearch.set(item, regex);

    return regex;
}
