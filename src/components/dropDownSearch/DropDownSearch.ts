//Element which build the dropDownSearchComponent

import { DropDownSearchBar } from "./DropDownSearchBar";
import { DropDownSearchHeader } from "./DropDownSearchHeader";
import { DropDownSearchList } from "./DropDownSearchList";

export function DropDownSearch(props: DropDownSearchProps): HTMLElement {
    const dropDownSearchHeaderContainer = document.createElement("div");
    dropDownSearchHeaderContainer.className = "dropDown-filter-container";

    const header = DropDownSearchHeader(props);

    const dropDownSearchContainer = document.createElement("div");

    dropDownSearchContainer.classList.add("dropDownContainer");
    dropDownSearchContainer.classList.add("hidden");

    const dropDownSearchbar = DropDownSearchBar();
    const dropDownSearchList = DropDownSearchList(props);

    dropDownSearchHeaderContainer.appendChild(header);
    dropDownSearchHeaderContainer.appendChild(dropDownSearchContainer);
    dropDownSearchContainer.appendChild(dropDownSearchbar);
    dropDownSearchContainer.appendChild(dropDownSearchList);

    return dropDownSearchHeaderContainer;
}

export interface DropDownSearchProps {
    title: string;
    items: string[];
    onClick: () => void;
    onItemSelected: (item: string) => void;
}
