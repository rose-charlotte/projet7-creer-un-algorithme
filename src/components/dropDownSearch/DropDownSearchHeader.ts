//Build the header element of the dropDown

export function DropDownSearchHeader(props: DropDownSearchHeader): HTMLElement {
    const dropDownFilterContainer = document.createElement("div");
    dropDownFilterContainer.classList.add("open");
    dropDownFilterContainer.classList.add("closed");
    dropDownFilterContainer.textContent = props.title;
    dropDownFilterContainer.addEventListener("click", props.onClick);

    const arrowDown = document.createElement("img");
    arrowDown.classList.add("arrow-down");
    arrowDown.src = "assets/icones/arrowDown.svg";

    dropDownFilterContainer.appendChild(arrowDown);

    return dropDownFilterContainer;
}

export interface DropDownSearchHeader {
    title: string;
    onClick: () => void;
}

//dropDown-filter-container-closed
