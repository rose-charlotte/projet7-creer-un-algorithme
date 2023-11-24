import { Ingredient } from "../../types/Ingredient";
import { Recipe } from "../../types/Recipe";
import styles from "./recipes.module.css";

export function buildRecipes(recipe: Recipe): HTMLElement {
    const recipeListContainer = document.querySelector("recipeList-container");

    const recipeContainer = document.createElement("article");
    recipeContainer.className = styles.recipeContainer;

    const imgContainer = document.createElement("div");
    imgContainer.className = styles.imgContainer;
    const img = document.createElement("img");
    img.className = styles.recipeImg;
    img.src = `assets/images/photo/${recipe.image}`;

    const recipeTitle = document.createElement("h1");
    recipeTitle.className = styles.recipeTitle;
    recipeTitle.textContent = recipe.name;

    const recetteTitle = document.createElement("h2");
    recetteTitle.className = styles.secondTitle;
    recetteTitle.textContent = "recette";

    const recipeInstructions = document.createElement("p");
    recipeInstructions.className = styles.recipeInstructions;
    recipeInstructions.textContent = recipe.description;

    const ingredientsTitle = document.createElement("h2");
    ingredientsTitle.className = styles.secondTitle;
    ingredientsTitle.textContent = "ingrédient";

    const ingredientsList = recipe.ingredients;
    const ingredientListContainer = document.createElement("div");
    ingredientListContainer.className = styles.ingredientListContainer;
    ingredientsList.forEach(ingredient => {
        const ingredientList = buildIngredientsList(ingredient);
        ingredientListContainer.appendChild(ingredientList);
    });

    recipeListContainer?.appendChild(recipeContainer);
    recipeContainer.appendChild(imgContainer);
    imgContainer.appendChild(img);
    recipeContainer.appendChild(recipeTitle);
    recipeContainer.appendChild(recetteTitle);
    recipeContainer.appendChild(recipeInstructions);
    recipeContainer.appendChild(ingredientsTitle);
    recipeContainer.appendChild(ingredientListContainer);

    return recipeContainer;
}

function buildIngredientsList(ingredient: Ingredient): HTMLElement {
    const container = document.createElement("div");
    const li = document.createElement("li");
    li.className = styles.ingredientList;
    li.textContent = ingredient.ingredient;

    const ingredientsComplement = document.createElement("p");
    ingredientsComplement.className = styles.ingredientComplement;

    const complements: string[] = [];

    if (ingredient.quantity !== undefined) {
        complements.push(ingredient.quantity.toString());
    }

    if (ingredient.unit) {
        complements.push(ingredient.unit);
    }

    ingredientsComplement.textContent = complements.join(" ");

    container.appendChild(li);
    container.appendChild(ingredientsComplement);
    return container;
}
