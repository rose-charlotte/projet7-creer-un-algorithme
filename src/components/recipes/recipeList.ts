import { buildRecipes } from "./recipes";
import { getAllRecipes } from "../../utils/recipeRepository";
import styles from "./recipes.module.css";

export function buildRecipeList(): HTMLElement {
    const body = document.querySelector("body");
    const recipeListContainer = document.createElement("div");
    recipeListContainer.className = styles.recipeListContainer;
    getAllRecipes().forEach(recipe => {
        const recipeContainer = buildRecipes(recipe);
        recipeListContainer.appendChild(recipeContainer);
    });

    body?.appendChild(recipeListContainer);

    return recipeListContainer;
}
