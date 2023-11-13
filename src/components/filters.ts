//regroupe l'ensemble des 3 filtres

import { getAllRecipes } from "../utils/recipeRepository";
import { DropDownSearch } from "./dropDownSearch/DropDownSearch.ts";

const ingredients: string[] = getAllRecipes().flatMap(recipe =>
    recipe.ingredients.map(ingredient => ingredient.ingredient)
);

// function that handle the dropDown display

export function buildFilters(): HTMLElement {
    const body = document.querySelector("body");
    const filtersContainer = document.createElement("div");
    filtersContainer.className = "filters-container";

    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";

    const dropDownIngredientFilter = DropDownSearch({
        title: "Ingredient",
        onClick: displayDropDownMenu,
        items: ingredients,
        onItemSelected: consoleLog,
    });

    const dropDownApplianceFilter = DropDownSearch({
        title: "Appareils",
        onClick: displayDropDownMenu,
        items: ["saladier", "robot", "four"],
        onItemSelected: consoleLog,
    });

    //const dropDownSearchComponent = DropDownSearchComponent({ items: ingredients });

    body?.appendChild(filtersContainer);

    filtersContainer.appendChild(dropDownIngredientFilter);
    filtersContainer.appendChild(dropDownApplianceFilter);
    //filterContainer.appendChild(dropDownSearchComponent);

    return filtersContainer;
}

function displayDropDownMenu() {
    const alldropDownContainer = document.querySelector(".dropDownContainer");
    // console.log(dropDownContainer);
    const dropDownFilterContainer = document.querySelector(".dropDown-filter-container");
    const ouvert = document.querySelector(".open");
    const arrowDown = document.querySelector(".arrow-down") as HTMLImageElement;

    if (alldropDownContainer) {
        alldropDownContainer?.classList.toggle("hidden");
        dropDownFilterContainer?.classList.toggle("dropDown-filter-container-closed");
        ouvert?.classList.toggle("closed");
    }

    if (arrowDown?.src.match("assets/icones/arrowDown.svg")) {
        arrowDown.src = "assets/icones/arrowUp.svg";
    } else {
        arrowDown.src = "assets/icones/arrowDown.svg";
    }
}
function consoleLog() {
    console.log("ok");
}
