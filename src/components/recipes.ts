interface Recipe {
    id: number;
    image: string;
    name: string;
    servings: number;
    ingredients: (
        | {
              ingredient: string;
              quantity: number;
              unit: string;
          }
        | {
              ingredient: string;
              quantity: number;
              unit?: undefined;
          }
        | {
              ingredient: string;
              quantity?: undefined;
              unit?: undefined;
          }
    )[];
    time: number;
    description: string;
    appliance: string;
    ustensils: string[];
}

export function buildRecipes(recipe: Recipe): HTMLElement {
    const body = document.querySelector("body");

    const recipeContainer = document.createElement("article");
    recipeContainer.setAttribute("class", "recipe-container");

    body?.appendChild(recipeContainer);

    const img = document.createElement("img");
    img.setAttribute("class", "recipe-img");
    img.src = "";

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
    const ingredient = document.createElement("p");
    ingredient.className = "ingredient";
    const ingredientsList = recipe.ingredients;
    ingredientsList.forEach(ingredient => buildIngredientsList(ingredient));

    recipeContainer.appendChild(img);
    recipeContainer.appendChild(recipeTitle);
    recipeContainer.appendChild(recetteTitle);
    recipeContainer.appendChild(recipeInstructions);
    recipeContainer.appendChild(ingredientsTitle);
    recipeContainer.appendChild(ingredientsTitle);
    recipeContainer.appendChild(ingredient);

    return recipeContainer;
}

interface Ingredient {
    ingredient: string;
    quantity?: number | undefined;
    unit?: string | undefined;
}

function buildIngredientsList(ingredient: Ingredient): HTMLElement {
    const recipeContainer = document.querySelector("ingredient");
    const ingredientsListContainer = document.createElement("p");
    console.log(ingredient.ingredient);
    ingredientsListContainer.textContent = ingredient.ingredient;

    recipeContainer?.appendChild(ingredientsListContainer);

    return ingredientsListContainer;
}
