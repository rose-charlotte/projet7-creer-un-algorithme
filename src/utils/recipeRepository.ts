import { type Recipe } from "../types/Recipe";
import { type Ingredient } from "../types/Ingredient";
import { recipes as jsRecipes } from "../../assets/data/recipes";

const recipes: Recipe[] = mapRecipes();
const { appliances, ingredients, ustensils } = getAllFilters(recipes);

export function getAllRecipes(): Recipe[] {
    return recipes;
}

export function getAllAppliances(): string[] {
    return appliances;
}

export function getAllIngredients(): string[] {
    return ingredients;
}

export function getAllUstensils(): string[] {
    return ustensils;
}

function getNumber(value: any): number | undefined {
    if (typeof value === "string") {
        return parseInt(value);
    }

    if (typeof value === "number") {
        return value;
    }

    return undefined;
}

function mapIngredient(ingredient: any): Ingredient {
    return {
        ingredient: ingredient.ingredient,
        quantity: getNumber(ingredient.quantity),
        unit: ingredient.unit,
    };
}

function mapIngredients(ingredients: any[]): Ingredient[] {
    return ingredients.map((ingredient: any) => mapIngredient(ingredient));
}

function mapRecipes(): Recipe[] {
    return (jsRecipes as any).map((recipe: any) => ({
        appliance: recipe.appliance,
        description: recipe.description,
        id: recipe.id,
        image: recipe.image,
        ingredients: mapIngredients(recipe.ingredients),
        name: recipe.name,
        servings: recipe.servings,
        time: recipe.time,
        ustensils: recipe.ustensils,
    }));
}

export interface GetAllFiltersResult {
    ingredients: string[];
    appliances: string[];
    ustensils: string[];
}

export function getAllFilters(recipes: Recipe[]): GetAllFiltersResult {
    const ingredientsSet: Set<string> = new Set();
    const appliancesSet: Set<string> = new Set();
    const ustensilsSet: Set<string> = new Set();

    for (const recipe of recipes) {
        recipe.ingredients.forEach(ingredient => ingredientsSet.add(ingredient.ingredient));
        appliancesSet.add(recipe.appliance);
        recipe.ustensils.forEach(ustensil => ustensilsSet.add(ustensil));
    }

    return {
        ingredients: Array.from(ingredientsSet).sort(),
        appliances: Array.from(appliancesSet).sort(),
        ustensils: Array.from(ustensilsSet).sort(),
    };
}
