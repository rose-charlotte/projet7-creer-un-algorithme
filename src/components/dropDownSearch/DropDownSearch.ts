//Element which build the dropDownSearchComponent

import { ComponentRender } from "../../ComponentRender";
import { DropDownSearchBar } from "./DropDownSearchBar";
import { DropDownSearchHeader } from "./DropDownSearchHeader";
import { DropDownSearchList, DropDownSearchListProps } from "./DropDownSearchList";

import styles from "./DropDownSearch.module.css";

export function DropDownSearch(props: DropDownSearchProps): HTMLElement {
    class InitialState {
        private _items: string[];

        constructor() {
            this._items = props.items;
        }
        public get items(): string[] {
            return this._items;
        }
        public set items(value: string[]) {
            this._items = value;

            renderDropDownSearchBar();
            renderDropDownSearchList();
        }
    }

    const state: InitialState = new InitialState();

    const uiState: UIState = {
        container: document.createElement("div"),
        dropDownContainer: document.createElement("div"),
    };

    return initialRender();

    function renderHeader(): void {
        uiState.header = DropDownSearchHeader({
            onToggleOpenClose,
            title: props.title,
        });

        uiState.container.appendChild(uiState.header);
    }

    function renderDropDownSearchBar(): void {
        if (!uiState.dropDownSearchBar) {
            uiState.dropDownSearchBar = DropDownSearchBar({ onChange });
            uiState.dropDownContainer.appendChild(uiState.dropDownSearchBar);
        }
    }

    function renderDropDownSearchList(): void {
        if (uiState.dropDownSearchList) {
            uiState.dropDownSearchList.updateProps({
                items: state.items,
                onItemSelected,
            });
            console.log("les items trié", state.items);
        } else {
            uiState.dropDownSearchList = DropDownSearchList({
                items: state.items,
                onItemSelected,
            });
            uiState.dropDownContainer.appendChild(uiState.dropDownSearchList.element);
        }
    }

    function onToggleOpenClose(open: boolean) {
        if (!open) {
            console.log(open);
            uiState.dropDownContainer.classList.toggle(styles.hidden);
        }
    }

    function onChange(value: string) {
        if (uiState.debounceTimer) {
            clearTimeout(uiState.debounceTimer);
            uiState.debounceTimer = undefined;
        }

        uiState.debounceTimer = setTimeout(() => {
            const foundIngredients = props.items.filter(item => item.includes(value));
            state.items = foundIngredients;
            uiState.debounceTimer = undefined;
            console.log(foundIngredients);
        }, 500);
    }

    function onItemSelected(item: string) {
        console.log(item);
        const selectedItemContainer = document.createElement("div");

        selectedItemContainer.className = "selectedItemContainer";
        selectedItemContainer.textContent = item;

        const filtersContainer = document.querySelector(".filters-container");
        filtersContainer?.appendChild(selectedItemContainer);
        props.onItemSelected(item);
    }

    function initialRender(): HTMLElement {
        uiState.container.className = styles.dropDownFilterContainer;

        uiState.dropDownContainer.className = styles.dropDownContainer;
        uiState.dropDownContainer.classList.add(styles.hidden);

        renderHeader();

        renderDropDownSearchBar();
        renderDropDownSearchList();
        uiState.container.appendChild(uiState.dropDownContainer);
        return uiState.container;
    }
}

export interface DropDownSearchProps {
    title: string;
    items: string[];
    onItemSelected: (item: string) => void;
}

interface UIState {
    container: HTMLDivElement;
    dropDownContainer: HTMLDivElement;
    header?: HTMLElement;
    dropDownSearchBar?: HTMLElement;
    dropDownSearchList?: ComponentRender<DropDownSearchListProps>;
    debounceTimer?: number;
}
