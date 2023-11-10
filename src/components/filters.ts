//regroupe l'ensemble des 3 filtres

import { DropDownSearchComponent } from "./dropDownSearchComponent";
import { DropDownFilter } from "./filter";
import { getAllRecipes } from "../utils/recipeRepository";

const ingredients: string[] = getAllRecipes().flatMap(recipe =>
    recipe.ingredients.map(ingredient => ingredient.ingredient)
);

// function that handle the dropDown display
function displayDropDownMenu() {
    const dropDownContainer = document.querySelector("#dropDownContainer");
    const dropDownFilterContainer = document.querySelector(".dropDown-filter-container");
    const arrowDown = document.querySelector(".arrow-down") as HTMLImageElement;

    if (dropDownContainer) {
        dropDownContainer.classList.toggle("closed");
        dropDownFilterContainer?.classList.toggle("dropDown-filter-container-closed");
    } else {
        dropDownContainer!.classList.toggle("dropDownContainer");
        dropDownFilterContainer?.classList.toggle("dropDown-filter-container");
    }
    if (arrowDown?.src.match("assets/icones/arrowDown.svg")) {
        arrowDown.src = "assets/icones/arrowUp.svg";
    } else {
        arrowDown.src = "assets/icones/arrowDown.svg";
    }
}
export function buildFilters(): HTMLElement {
    const body = document.querySelector("body");
    const filtersContainer = document.createElement("div");
    filtersContainer.className = "filters-container";

    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";

    const ingredientFilter = DropDownFilter({
        title: "Ingrédient",
        onClick: displayDropDownMenu,
    });

    const dropDownSearchComponent = DropDownSearchComponent({ ingredients: ingredients });

    body?.appendChild(filtersContainer);
    filtersContainer.appendChild(filterContainer);
    filterContainer.appendChild(ingredientFilter);
    filterContainer.appendChild(dropDownSearchComponent);

    return filtersContainer;
}
