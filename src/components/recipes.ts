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
    const recipeListContainer = document.querySelector("recipeList-container");

    const recipeContainer = document.createElement("article");
    recipeContainer.setAttribute("class", "recipe-container");

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

    const ingredientListContainer = document.createElement("ul");

    const ingredientsList = recipe.ingredients;

    ingredientsList.forEach(ingredient => {
        const ingredientList = buildIngredientsList(ingredient);
        ingredientListContainer.appendChild(ingredientList);
    });

    recipeListContainer?.appendChild(recipeContainer);
    recipeContainer.appendChild(img);
    recipeContainer.appendChild(recipeTitle);
    recipeContainer.appendChild(recetteTitle);
    recipeContainer.appendChild(recipeInstructions);
    recipeContainer.appendChild(ingredientsTitle);
    recipeContainer.appendChild(ingredientsTitle);
    recipeContainer.appendChild(ingredientListContainer);

    return recipeContainer;
}

interface Ingredient {
    ingredient: string;
    quantity?: number | undefined;
    unit?: string | undefined;
}

function buildIngredientsList(ingredient: Ingredient): HTMLElement {
    const li = document.createElement("li");
    li.className = "ingredient-list";
    li.textContent = ingredient.ingredient;
    return li;
}
