import { getAllRecipes } from "../utils/recipeRepository.ts";

export function buildFilterModal(): HTMLElement {
    const filterContainer = document.querySelector(".filter");
    const filterModalContainer = document.createElement("div");
    filterModalContainer.classList.add("filter-modal");
    // filterModalContainer.classList.add("closed");

    const filterModalSearchBar = document.createElement("input");
    filterModalSearchBar.setAttribute("type", "text");
    filterModalSearchBar.className = "filter-modal__searchBar";

    const filterElementList = document.createElement("ul");

    getAllRecipes().forEach(recipe =>
        recipe.ingredients.forEach(ingredient => {
            const list = document.createElement("li");
            list.textContent = ingredient.ingredient;
            list.className = "searchbar-item-list";
            filterElementList.appendChild(list);
        })
    );

    filterContainer?.appendChild(filterModalContainer);
    filterModalContainer.appendChild(filterModalSearchBar);
    filterModalContainer.appendChild(filterElementList);

    return filterModalContainer;
}
