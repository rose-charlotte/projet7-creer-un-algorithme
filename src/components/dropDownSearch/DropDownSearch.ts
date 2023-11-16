//Element which build the dropDownSearchComponent

import { DropDownSearchBar } from "./DropDownSearchBar";
import { DropDownSearchHeader } from "./DropDownSearchHeader";
import { DropDownSearchList } from "./DropDownSearchList";

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
            dropDownSearchContainer?.classList.toggle("hidden");
            dropDownFilterContainer?.classList.toggle("dropDown-filter-container-closed");
            ouvert?.classList.toggle("closed");
        }
    }

    function onChange(value: string) {
        const foundIngredients = props.items.filter(item => item.includes(value));

        console.log(foundIngredients);
    }

    function onItemSelected(item: string) {
        props.onItemSelected(item);
        console.log(item);
    }

    dropDownSearchHeaderContainer.appendChild(header);
    dropDownSearchHeaderContainer.appendChild(dropDownSearchContainer);
    dropDownSearchContainer.appendChild(dropDownSearchbar);
    dropDownSearchContainer.appendChild(dropDownSearchList);

    return dropDownSearchHeaderContainer;
}

export interface DropDownSearchProps {
    title: string;
    items: string[];
    onItemSelected: (item: string) => void;
}
