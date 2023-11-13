export function DropDownSearchList(props: DropDownSearchList): HTMLElement {
    const dropDownSearchListContainer = document.createElement("div");

    const filterElementList = document.createElement("ul");

    props.items.forEach(ingredient => {
        const filterElement = document.createElement("li");
        filterElement.textContent = ingredient;
        filterElementList.appendChild(filterElement);
    });
    dropDownSearchListContainer.appendChild(filterElementList);

    return dropDownSearchListContainer;
}

export interface DropDownSearchList {
    items: string[];
    onItemSelected: (item: string) => void;
}
