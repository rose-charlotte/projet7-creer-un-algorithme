import { Recipes } from "./recipes";
import styles from "./recipes.module.css";
import { Recipe } from "../../types/Recipe";

export function RecipeList(props: RecipeListProps): HTMLElement {
    const recipeListContainer = document.createElement("div");
    recipeListContainer.className = styles.recipeListContainer;

    if (props.recipes.length === 0) {
        console.log("nada");
        const message = document.createElement("div");
        message.textContent = `Aucune recette ne contient "${props.globalSearch}" vous pouvez chercher «
tarte aux pommes », « poisson », etc.`;
        recipeListContainer.appendChild(message);
    }

    props.recipes.forEach(recipe => {
        const recipeContainer = Recipes(recipe);
        recipeListContainer.appendChild(recipeContainer);
    });

    return recipeListContainer;
}

export interface RecipeListProps {
    recipes: Recipe[];
    globalSearch: string | undefined;
}
