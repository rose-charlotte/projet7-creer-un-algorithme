//Element which build the dropDownSearchComponent

import { ComponentRender } from "../../ComponentRender";
import { DropDownSearchBar } from "./DropDownSearchBar";
import { DropDownSearchHeader } from "./DropDownSearchHeader";
import { DropDownSearchList, DropDownSearchListProps } from "./DropDownSearchList";

// 1. Va devoir filtrer les items en fonction de ce que contient la search bar
//     ** Attention au filtre vide
// 2. Va devoir renvoyer au parent l'élément selectionné

export function DropDownSearch(props: DropDownSearchProps): HTMLElement {
    const dropDownSearchHeaderContainer = document.createElement("div");
    dropDownSearchHeaderContainer.className = "dropDown-filter-container";

    const header = DropDownSearchHeader({
        onToggleOpenClose,
        title: props.title,
    });

    const dropDownSearchContainer = document.createElement("div");

    dropDownSearchContainer.classList.add("dropDownContainer");
    dropDownSearchContainer.classList.add("hidden");

    const dropDownSearchbar = DropDownSearchBar({ onChange });
    const dropDownSearchList = DropDownSearchList({
        items: props.items,
        onItemSelected,
    });

    function onToggleOpenClose(open: boolean) {
        const dropDownFilterContainer = document.querySelector(".dropDown-filter-container");
        const ouvert = document.querySelector(".open");

        if (open === false) {
            dropDownSearchContainer.classList.toggle("hidden");
            dropDownFilterContainer?.classList.toggle("dropDown-filter-container-closed");
            ouvert?.classList.toggle("closed");
        }
    }

    function onChange(value: string) {
        const foundIngredients = props.items.filter(item => item.includes(value));

        console.log(foundIngredients);
    }

    function onItemSelected(item: string) {
        console.log(item);
        const selectedItemContainer = document.createElement("div");
        selectedItemContainer.className = "selectedItem-container";
        selectedItemContainer.textContent = item;

        const filtersContainer = document.querySelector(".filters-container");
        filtersContainer?.appendChild(selectedItemContainer);
        props.onItemSelected(item);
    }

    dropDownSearchHeaderContainer.appendChild(header);
    dropDownSearchHeaderContainer.appendChild(dropDownSearchContainer);
    dropDownSearchContainer.appendChild(dropDownSearchbar);
    dropDownSearchContainer.appendChild(dropDownSearchList);

    return dropDownSearchHeaderContainer;

    // class InitialState {
    //     private _items: string[];

    //     constructor() {
    //         this._items = props.items;
    //     }
    //     public get items(): string[] {
    //         return this._items;
    //     }
    //     public set items(value: string[]) {
    //         this._items = value;

    //         renderDropDownSearchList();
    //     }
    // }

    // const state: InitialState = new InitialState();

    // const uiState: UIState = {
    //     container: document.createElement("div"),
    // };
    // return initialRender();

    // function renderDropDownSearchList() {
    //     if (uiState.dropDownSearchList) {
    //         uiState.dropDownSearchList.updateProps({ items: state.items });
    //     } else {
    //         uiState.dropDownSearchList = DropDownSearchList({
    //             items: state.items,
    //             onItemSelected,
    //         });
    //         uiState.container.appendChild(uiState.dropDownSearchList.element);
    //     }
    // }

    // function initialRender(): HTMLElement {
    //     uiState.container.classList.add("dropDownContainer");
    //     // uiState.container.classList.add("hidden");

    //     uiState.container.appendChild(header);
    //     renderDropDownSearchList();
    //     return uiState.container;
    // }
    // interface UIState {
    //     container: HTMLDivElement;
    //     dropDownSearchList?: ComponentRender<DropDownSearchListProps>;
    // }
}

export interface DropDownSearchProps {
    title: string;
    items: string[];
    onItemSelected: (item: string) => void;
}
