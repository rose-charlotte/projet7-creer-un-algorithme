export function DropDownSearchComponent(): HTMLElement {
    const dropDownSearchContainer = document.createElement("div");
    dropDownSearchContainer.classList.add("filter-modal");

    const dropDownSearchBar = document.createElement("input");
    dropDownSearchBar.setAttribute("type", "text");
    dropDownSearchBar.className = "filter-modal__searchBar";

    const filterElementList = document.createElement("ul");

    // getAllRecipes().forEach(recipe =>
    //     recipe.ingredients.forEach(ingredient => {
    //         const list = document.createElement("li");
    //         list.textContent = ingredient.ingredient;
    //         list.className = "searchbar-item-list";
    //         filterElementList.appendChild(list);
    //     })
    // );

    dropDownSearchContainer.appendChild(dropDownSearchBar);
    dropDownSearchContainer.appendChild(filterElementList);

    return dropDownSearchContainer;
}
