//regroupe l'ensemble des 3 filtres

import { getAllRecipes } from "../../utils/recipeRepository.ts";
import { DropDownSearch } from "../dropDownSearch/DropDownSearch.ts";

import styles from "./filters.module.css";

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
    filtersContainer.className = styles.filtersContainer;

    const filterContainer = document.createElement("div");
    filterContainer.className = styles.filterContainer;

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

    filtersContainer.appendChild(filterContainer);
    filterContainer.appendChild(dropDownIngredientFilter);
    filterContainer.appendChild(dropDownApplianceFilter);

    return filtersContainer;

    function onItemSelected(item: string) {
        console.log(item);
        const selectedItemContainer = document.createElement("div");
        selectedItemContainer.className = styles.selectedItemContainer;
        selectedItemContainer.textContent = item;
        filtersContainer.appendChild(selectedItemContainer);
    }
}
