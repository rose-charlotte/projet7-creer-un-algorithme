//regroupe l'ensemble des 3 filtres

import { getAllRecipes } from "../../utils/recipeRepository.ts";
import { DropDownSearch } from "../dropDownSearch/DropDownSearch.ts";

import styles from "./filters.module.css";

//Get all  recipes ingredients, put them all in lowercase, put them in a set and tyransform it into  an array:

const t0 = performance.now();
const allRecipesIngredients: string[] = getAllRecipes().flatMap(recipe =>
    recipe.ingredients.map(ingredient => ingredient.ingredient)
);
const toLowercaseIngredients = allRecipesIngredients.map(ingredient => ingredient.toLowerCase());

const setIngredients = new Set(toLowercaseIngredients);
const ingredients = Array.from(setIngredients);
const t1 = performance.now();
console.log(`call to make it took ${t1 - t0} miliseconds`);

//Same for all appliances

const allRecipesAppliances: string[] = getAllRecipes().map(recipe => recipe.appliance);
const toLowerCaseAppliances = allRecipesAppliances.map(appliance => appliance.toLowerCase());
const setAppliances = new Set(toLowerCaseAppliances);
const appliances = Array.from(setAppliances);

//Same for Ustensils

const allRecipesUstensils: string[] = getAllRecipes().flatMap(recipe => recipe.ustensils.map(ustensil => ustensil));
const toLowerCaseUstensils = allRecipesUstensils.map(ustensil => ustensil.toLowerCase());
const setUstensils = new Set(toLowerCaseUstensils);
const ustensils = Array.from(setUstensils);

console.log(ustensils);

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
        items: appliances,
        onItemSelected,
    });

    const dropDownUstensilFilter = DropDownSearch({
        title: "Ustensiles",
        items: ustensils,
        onItemSelected,
    });

    body?.appendChild(filtersContainer);

    filtersContainer.appendChild(filterContainer);
    filterContainer.appendChild(dropDownIngredientFilter);
    filterContainer.appendChild(dropDownApplianceFilter);
    filterContainer.appendChild(dropDownUstensilFilter);

    return filtersContainer;

    function onItemSelected(item: string) {
        console.log(item);
        const selectedItemContainer = document.createElement("div");
        selectedItemContainer.className = styles.selectedItemContainer;
        selectedItemContainer.textContent = item;
        filtersContainer.appendChild(selectedItemContainer);
    }
}
