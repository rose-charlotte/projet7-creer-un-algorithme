export function DropDownSearchList(props: DropDownSearchListProps): HTMLElement {
    const dropDownSearchListContainer = document.createElement("div");

    const filterElementList = document.createElement("ul");

    props.items.forEach(ingredient => {
        const filterElement = document.createElement("li");
        filterElement.className = "filter-element";
        filterElement.textContent = ingredient;
        filterElement.addEventListener("click", selectedElement);
        function selectedElement() {
            props.onItemSelected(ingredient);
        }
        filterElementList.appendChild(filterElement);
    });
    dropDownSearchListContainer.appendChild(filterElementList);

    return dropDownSearchListContainer;
}

export interface DropDownSearchListProps {
    items: string[];
    onItemSelected: (item: string) => void;
}
