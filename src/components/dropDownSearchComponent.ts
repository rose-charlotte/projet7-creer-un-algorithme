export function DropDownSearchComponent(props: dropDownSearchComponentProps): HTMLElement {
    const dropDownSearchContainer = document.createElement("div");
    dropDownSearchContainer.id = "dropDownContainer";
    dropDownSearchContainer.classList.add("dropDownContainer");
    dropDownSearchContainer.classList.add("closed");

    const dropDownSearchBar = document.createElement("input");
    dropDownSearchBar.setAttribute("type", "text");
    dropDownSearchBar.className = "filter-modal__searchBar";

    const filterElementList = document.createElement("ul");

    props.ingredients.forEach(ingredient => {
        const filterElement = document.createElement("li");
        filterElement.textContent = ingredient;
        filterElementList.appendChild(filterElement);
    });

    dropDownSearchContainer.appendChild(dropDownSearchBar);
    dropDownSearchContainer.appendChild(filterElementList);

    return dropDownSearchContainer;
}

export interface dropDownSearchComponentProps {
    ingredients: string[];
}
