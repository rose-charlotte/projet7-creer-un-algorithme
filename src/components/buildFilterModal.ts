import { recipes } from "../../assets/data/recipes";

export function buildFilterModal(): HTMLElement {
    const filterContainer = document.querySelector(".filter");
    const filterModalContainer = document.createElement("div");
    filterModalContainer.className = "filter-modal";

    const filterModalSearchBar = document.createElement("input");
    filterModalSearchBar.setAttribute("type", "text");
    filterModalSearchBar.className = "filter-modal__searchBar";

    const filterElementList = document.createElement("ul");

    recipes.forEach(recipe =>
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
