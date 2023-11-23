import { ComponentRender } from "../../ComponentRender";

export function DropDownSearchList(props: DropDownSearchListProps): ComponentRender<DropDownSearchListProps> {
    const dropDownSearchListContainer = document.createElement("div");
    dropDownSearchListContainer.className = "dropdown-search-list-container";

    renderItems(props.items);

    return {
        element: dropDownSearchListContainer,
        updateProps: update,
    };

    function renderItems(items: string[]): void {
        const filterElementListSelectedItems = document.createElement("ul");
        filterElementListSelectedItems.className = "dropdown-search-list-selected-items";

        const filterElementListUnselectedItems = document.createElement("ul");
        filterElementListUnselectedItems.className = "dropdown-search-list-unselected-items";

        items.forEach(ingredient => {
            const filterElement = document.createElement("li");
            filterElement.className = "filter-element";
            filterElement.textContent = ingredient;
            filterElement.dataset.item = ingredient;
            filterElement.addEventListener("click", selectedElement);
            function selectedElement() {
                props.onItemSelected(ingredient);
            }
            filterElementListUnselectedItems.appendChild(filterElement);
        });

        dropDownSearchListContainer.replaceChildren(filterElementListSelectedItems, filterElementListUnselectedItems);
    }

    function update(updatedProps: Partial<DropDownSearchListProps>): void {
        renderItems(updatedProps.items ?? props.items);
    }
}

export interface DropDownSearchListProps {
    items: string[];
    onItemSelected: (item: string) => void;
}
