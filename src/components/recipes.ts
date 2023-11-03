import { Ingredient } from "../types/Ingredient";
import { Recipe } from "../types/Recipe";

export function buildRecipes(recipe: Recipe): HTMLElement {
    const recipeListContainer = document.querySelector("recipeList-container");

    const recipeContainer = document.createElement("article");
    recipeContainer.setAttribute("class", "recipe-container");

    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    const img = document.createElement("img");
    img.setAttribute("class", "recipe-img");
    img.src = `assets/images/photo/${recipe.image}`;

    const recipeTitle = document.createElement("h1");
    recipeTitle.setAttribute("class", "recipe-title");
    recipeTitle.textContent = recipe.name;

    const recetteTitle = document.createElement("h2");
    recetteTitle.setAttribute("class", "second-title");
    recetteTitle.textContent = "recette";

    const recipeInstructions = document.createElement("p");
    recipeInstructions.setAttribute("class", "recipe-instructions");
    recipeInstructions.textContent = recipe.description;

    const ingredientsTitle = document.createElement("h2");
    ingredientsTitle.setAttribute("class", "second-title");
    ingredientsTitle.textContent = "ingrédient";

    const ingredientsList = recipe.ingredients;
    const ingredientListContainer = document.createElement("div");
    ingredientListContainer.className = "ingredientList-container";
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
    li.className = "ingredient-list";
    li.textContent = ingredient.ingredient;

    const ingredientsComplement = document.createElement("p");
    ingredientsComplement.className = "ingredient-complement";

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
