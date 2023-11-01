export function buildRecipes($name: string, recipesInstructions: string): HTMLElement {
    const body = document.querySelector("body");
    const recipeContainer = document.createElement("article");
    recipeContainer.setAttribute("class", "recipe-container");

    const img = document.createElement("img");
    img.setAttribute("class", "recipe-img");
    // img.setAttribute("src", "assets/images/lampos-aritonang-24gR_9lCdes-unsplash 1.png");
    img.src = "assets/images/lampos-aritonang-24gR_9lCdes-unsplash 1.png";

    const recipeTitle = document.createElement("h1");
    recipeTitle.setAttribute("class", "recipe-title");
    recipeTitle.textContent = $name;

    const recetteTitle = document.createElement("h2");
    recetteTitle.setAttribute("class", "second-title");
    recetteTitle.textContent = "recette";

    const recipeInstructions = document.createElement("p");
    recipeInstructions.setAttribute("class", "recipe-instructions");
    recipeInstructions.textContent = recipesInstructions;

    const ingredientsTitle = document.createElement("h2");
    ingredientsTitle.setAttribute("class", "second-title");
    ingredientsTitle.textContent = "Ingrédients";

    body?.appendChild(recipeContainer);
    recipeContainer.appendChild(img);
    recipeContainer.appendChild(recipeTitle);
    recipeContainer.appendChild(recetteTitle);
    recipeContainer.appendChild(recipeInstructions);
    recipeContainer.appendChild(ingredientsTitle);

    return recipeContainer;
}
