import { buildRecipes } from "./recipes";
import { recipes } from "../../assets/data/recipes.js";

export function buildRecipeList(): HTMLElement {
    const body = document.querySelector("body");
    const recipeListContainer = document.createElement("div");
    recipeListContainer.className = "recipeList-container";
    const recipesList = recipes;
    recipesList.forEach(recipe => {
        const recipeContainer = buildRecipes(recipe);
        recipeListContainer.appendChild(recipeContainer);
    });

    body?.appendChild(recipeListContainer);

    return recipeListContainer;
}
