import { ComponentRender } from "../../ComponentRender";

import styles from "./DropDownSearch.module.css";

export function DropDownSearchList(props: DropDownSearchListProps): ComponentRender<DropDownSearchListProps> {
    const dropDownSearchListContainer = document.createElement("div");
    dropDownSearchListContainer.className = styles.dropdownSearchListContainer;

    renderItems(props.items, props.selectedItems);

    return {
        element: dropDownSearchListContainer,
        updateProps: update,
    };

    function renderItems(items: string[], selectedItems: string[]): void {
        const filterElementListSelectedItems = document.createElement("ul");
        filterElementListSelectedItems.className = styles.dropdownSearchListSelectedItems;

        const filterElementListUnselectedItems = document.createElement("ul");
        filterElementListUnselectedItems.className = styles.dropdownSearchListUnselectedItems;

        const selectedItemsSet = new Set(selectedItems);

        selectedItems.forEach(item => renderSelectedItem(item, filterElementListSelectedItems));

        items.forEach(item => {
            if (!selectedItemsSet.has(item)) {
                renderUnselectedItem(item, filterElementListUnselectedItems);
            }

            // const filterElement = document.createElement("li");
            // filterElement.className = styles.filterElement;

            // filterElement.textContent = item;
            // filterElement.dataset.item = item;
            // filterElement.addEventListener("click", selectedElement);

            // function selectedElement() {
            //     const closeBtn = document.createElement("img");
            //     closeBtn.src = "assets/icones/closeBtn.svg";
            //     closeBtn.alt = "close Button";
            //     closeBtn.addEventListener("click", () => console.log("je t'enlève"));
            //     filterElement.removeEventListener("click", selectedElement);

            //     filterElementListSelectedItems.appendChild(filterElement);
            //     filterElement.appendChild(closeBtn);

            //     props.onItemSelected(item);
            // }

            // filterElementListUnselectedItems.appendChild(filterElement);
        });

        dropDownSearchListContainer.replaceChildren(filterElementListSelectedItems, filterElementListUnselectedItems);
    }

    function renderSelectedItem(item: string, listElement: HTMLElement) {
        const filterElement = document.createElement("li");
        filterElement.className = styles.filterElement;
        filterElement.textContent = item;
        filterElement.dataset.item = item;

        const closeBtn = document.createElement("img");
        closeBtn.src = "assets/icones/closeBtn.svg";
        closeBtn.alt = "close Button";
        closeBtn.dataset.item = item;
        closeBtn.addEventListener("click", removeElement);

        filterElement.appendChild(closeBtn);

        listElement.appendChild(filterElement);
    }

    function renderUnselectedItem(item: string, listElement: HTMLElement) {
        const filterElement = document.createElement("li");
        filterElement.className = styles.filterElement;
        filterElement.textContent = item;
        filterElement.dataset.item = item;
        filterElement.addEventListener("click", selectElement);

        listElement.appendChild(filterElement);
    }

    function update(updatedProps: Partial<DropDownSearchListProps>): void {
        renderItems(updatedProps.items ?? props.items, updatedProps.selectedItems ?? props.selectedItems);
    }

    function selectElement(e: MouseEvent) {
        const item: string = (<HTMLElement>e.currentTarget).dataset.item!;

        props.onItemSelected(item);
    }

    function removeElement(e: MouseEvent) {
        const item: string = (<HTMLElement>e.target).dataset.item!;

        props.onItemRemoved(item);
    }
}

export interface DropDownSearchListProps {
    items: string[];
    selectedItems: string[];

    onItemSelected: (item: string) => void;
    onItemRemoved: (item: string) => void;
}
