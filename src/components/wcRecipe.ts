// export class Recipe extends HTMLElement {
//     private $name: string;
//     private recipesInstructions: string;

//     constructor($name: string, recipesInstructions: string) {
//         super();
//         this.$name = $name;
//         this.recipesInstructions = recipesInstructions;
//     }

//     connectedCallback() {
//         const recipeContainer = document.createElement("article");
//         recipeContainer.setAttribute("class", "recipe-container");

//         const img = document.createElement("img");
//         img.setAttribute("class", "recipe-img");
//         // img.setAttribute("src", "assets/images/lampos-aritonang-24gR_9lCdes-unsplash 1.png");
//         img.src = "assets/images/lampos-aritonang-24gR_9lCdes-unsplash 1.png";

//         const recipeTitle = document.createElement("h1");
//         recipeTitle.setAttribute("class", "recipe-title");
//         recipeTitle.textContent = this.$name;

//         const recetteTitle = document.createElement("h2");
//         recetteTitle.setAttribute("class", "second-title");
//         recetteTitle.textContent = "recette";

//         const recipeInstructions = document.createElement("p");
//         recipeInstructions.setAttribute("class", "recipe-instructions");
//         recipeInstructions.textContent = this.recipesInstructions;

//         const ingredientsTitle = document.createElement("h2");
//         ingredientsTitle.setAttribute("class", "second-title");
//         ingredientsTitle.textContent = "Ingrédients";

//         this.appendChild(recipeContainer);
//         recipeContainer.appendChild(img);
//         recipeContainer.appendChild(recipeTitle);
//         recipeContainer.appendChild(recetteTitle);
//         recipeContainer.appendChild(recipeInstructions);
//         recipeContainer.appendChild(ingredientsTitle);
//     }
// }

// customElements.define("recipe-container", Recipe);
