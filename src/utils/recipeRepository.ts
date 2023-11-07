import { type Recipe } from "../types/Recipe";
import { type Ingredient } from "../types/Ingredient";
import { recipes as jsRecipes } from "../../assets/data/recipes";

const recipes: Recipe[] = mapRecipes();

export function getAllRecipes(): Recipe[] {
    return recipes;
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
