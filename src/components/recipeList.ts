import { buildRecipes } from "./recipes";
import { recipes } from "../../assets/data/recipes.js";

export function buildRecipeList(): HTMLElement {
    const body = document.querySelector("body");
    const recipeListContainer = document.createElement("div");
    const recipesList = recipes;
    recipesList.forEach(recipe => buildRecipes(recipe));

    body?.appendChild(recipeListContainer);

    return recipeListContainer;
}
