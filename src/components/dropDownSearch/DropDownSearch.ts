//Element which build the dropDownSearchComponent

import { ComponentRender } from "../../ComponentRender";
import { DropDownSearchBar } from "./DropDownSearchBar";
import { DropDownSearchHeader } from "./DropDownSearchHeader";
import { DropDownSearchList, DropDownSearchListProps } from "./DropDownSearchList";

import styles from "./DropDownSearch.module.css";

export function DropDownSearch(props: DropDownSearchProps): ComponentRender<DropDownSearchProps> {
    class InitialState {
        private _items: string[];
        private _selectedItems: string[];

        constructor() {
            this._items = props.items;
            this._selectedItems = props.selectedItems;
        }
        public get items(): string[] {
            return this._items;
        }
        public set items(value: string[]) {
            this._items = value;

            renderDropDownSearchBar();
            renderDropDownSearchList();
        }

        public get selectedItems(): string[] {
            return this._selectedItems;
        }
        public set selectedItems(value: string[]) {
            this._selectedItems = value;

            renderDropDownSearchBar();
            renderDropDownSearchList();
        }
    }

    const state: InitialState = new InitialState();

    const uiState: UIState = {
        container: document.createElement("div"),
        dropDownContainer: document.createElement("div"),
    };

    return {
        element: initialRender(),
        updateProps,
    };

    function updateProps(updatedProps: Partial<DropDownSearchProps>) {
        state.items = updatedProps.items!;
        state.selectedItems = updatedProps.selectedItems!;
    }

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
                selectedItems: state.selectedItems,
            });
        } else {
            uiState.dropDownSearchList = DropDownSearchList({
                items: state.items,
                selectedItems: state.selectedItems,
                onItemSelected,
                onItemRemoved,
            });
            uiState.dropDownContainer.appendChild(uiState.dropDownSearchList.element);
        }
    }

    function onToggleOpenClose(open: boolean) {
        if (!open) {
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
        }, 500);
    }

    function initialRender(): HTMLElement {
        uiState.container.className = styles.dropDownFilterContainer;

        uiState.dropDownContainer.className = styles.dropDownContainer;
        uiState.dropDownContainer.classList.add(styles.hidden);

        renderHeader();

        renderDropDownSearchBar();
        renderDropDownSearchList();

        uiState.selectedFiltersContainer = document.createElement("div");
        uiState.selectedFiltersContainer.className = styles.selectedItemsContainer;

        uiState.container.appendChild(uiState.dropDownContainer);

        uiState.container.appendChild(uiState.selectedFiltersContainer);
        return uiState.container;
    }

    function onItemSelected(item: string) {
        const elementContainer = document.createElement("div");
        elementContainer.className = styles.selectedItemContainer;

        const element = document.createElement("p");
        element.className = styles.selectedItem;
        element.textContent = item;

        uiState.selectedFiltersContainer!.appendChild(elementContainer);
        elementContainer.appendChild(element);

        props.onItemSelected(item);
    }

    function onItemRemoved(item: string) {
        props.onItemRemoved(item);
    }
}

export interface DropDownSearchProps {
    title: string;
    items: string[];
    selectedItems: string[];

    onItemSelected: (item: string) => void;
    onItemRemoved: (item: string) => void;
}

interface UIState {
    container: HTMLDivElement;
    dropDownContainer: HTMLDivElement;
    header?: HTMLElement;
    dropDownSearchBar?: HTMLElement;
    dropDownSearchList?: ComponentRender<DropDownSearchListProps>;
    debounceTimer?: number;
    selectedFiltersContainer?: HTMLElement;
}
