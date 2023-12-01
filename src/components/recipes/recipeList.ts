import { Recipes } from "./recipes";
import styles from "./recipes.module.css";
import { Recipe } from "../../types/Recipe";

export function RecipeList(props: RecipeListProps): HTMLElement {
    const recipeListContainer = document.createElement("div");
    recipeListContainer.className = styles.recipeListContainer;

    props.recipes.forEach(recipe => {
        const recipeContainer = Recipes(recipe);
        recipeListContainer.appendChild(recipeContainer);
    });

    return recipeListContainer;
}

export interface RecipeListProps {
    recipes: Recipe[];
}
