//construire un filtre

export function DropDownFilter(props: DropDownFilterProps): HTMLElement {
    const dropDownFilterContainer = document.createElement("div");
    dropDownFilterContainer.className = "dropDown-filter-container";
    dropDownFilterContainer.textContent = props.title;
    dropDownFilterContainer.addEventListener("click", props.onClick);

    const arrowDown = document.createElement("img");
    arrowDown.src = "assets/icones/arrowDown.svg";
    arrowDown.className = "arrow-down";

    dropDownFilterContainer.appendChild(arrowDown);

    return dropDownFilterContainer;
}

export interface DropDownFilterProps {
    title: string;
    onClick: () => void;
}
