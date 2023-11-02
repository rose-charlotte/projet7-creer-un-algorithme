import { buildRecipes } from "./recipes";
import { recipes } from "../../assets/data/recipes";

export function buildRecipeList(): HTMLElement {
    const body = document.querySelector("body");
    const recipeListContainer = document.createElement("div");
    recipeListContainer.className = "recipeList-container";
    recipes.forEach(recipe => {
        const recipeContainer = buildRecipes(recipe);
        recipeListContainer.appendChild(recipeContainer);
    });

    body?.appendChild(recipeListContainer);

    return recipeListContainer;
}
