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

        selectedItems
            .sort(alphabeticSortCaseAndAccentInsensitive)
            .forEach(item => renderSelectedItem(item, filterElementListSelectedItems));

        items.sort(alphabeticSortCaseAndAccentInsensitive).forEach(item => {
            if (!selectedItemsSet.has(item)) {
                renderUnselectedItem(item, filterElementListUnselectedItems);
            }
        });

        dropDownSearchListContainer.replaceChildren(filterElementListSelectedItems, filterElementListUnselectedItems);
    }

    function renderSelectedItem(item: string, listElement: HTMLElement) {
        const filterElement = document.createElement("li");
        filterElement.className = styles.filterElement;

        const elementName = document.createElement("p");
        elementName.className = styles.elementName;
        elementName.textContent = item;
        elementName.dataset.item = item;

        const closeBtn = document.createElement("img");
        closeBtn.src = "assets/icones/closeBtn.svg";
        closeBtn.alt = "close Button";
        closeBtn.dataset.item = item;
        closeBtn.addEventListener("click", removeElement);

        filterElement.appendChild(elementName);
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

function alphabeticSortCaseAndAccentInsensitive(val1: string, val2: string): number {
    return val1.localeCompare(val2, "fr", { sensitivity: "base" });
}

export interface DropDownSearchListProps {
    items: string[];
    selectedItems: string[];

    onItemSelected: (item: string) => void;
    onItemRemoved: (item: string) => void;
}
