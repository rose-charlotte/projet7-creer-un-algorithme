import { buildRecipes } from "./recipes";
import { getAllRecipes } from "../utils/recipeRepository";

export function buildRecipeList(): HTMLElement {
    const body = document.querySelector("body");
    const recipeListContainer = document.createElement("div");
    recipeListContainer.className = "recipeList-container";
    getAllRecipes().forEach(recipe => {
        const recipeContainer = buildRecipes(recipe);
        recipeListContainer.appendChild(recipeContainer);
    });

    body?.appendChild(recipeListContainer);

    return recipeListContainer;
}
