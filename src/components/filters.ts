//regroupe l'ensemble des 3 filtres

import { getAllRecipes } from "../utils/recipeRepository";
import { DropDownSearch } from "./dropDownSearch/DropDownSearch.ts";

const AllRecipesIngredients: string[] = getAllRecipes().flatMap(recipe =>
    recipe.ingredients.map(ingredient => ingredient.ingredient)
);
const toLowercaseIngredients = AllRecipesIngredients.map(ingredient => ingredient.toLowerCase());

const setIngredients = new Set(toLowercaseIngredients);
const ingredients = Array.from(setIngredients);

// function that handle the dropDown display

export function buildFilters(): HTMLElement {
    const body = document.querySelector("body");
    const filtersContainer = document.createElement("div");
    filtersContainer.className = "filters-container";

    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";

    const dropDownIngredientFilter = DropDownSearch({
        title: "Ingredient",
        items: ingredients,
        onItemSelected,
    });

    const dropDownApplianceFilter = DropDownSearch({
        title: "Appareils",
        items: ["saladier", "robot", "four"],
        onItemSelected,
    });

    body?.appendChild(filtersContainer);

    filtersContainer.appendChild(dropDownIngredientFilter);
    filtersContainer.appendChild(dropDownApplianceFilter);

    return filtersContainer;

    function onItemSelected(item: string) {
        console.log(item);
        const selectedItemContainer = document.createElement("div");
        selectedItemContainer.className = "selectedItem-container";
        selectedItemContainer.textContent = item;
        filtersContainer.appendChild(selectedItemContainer);
    }
}
