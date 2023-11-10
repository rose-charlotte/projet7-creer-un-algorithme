//construire un filtre

export function DropDownFilter(props: DropDownFilterProps): HTMLElement {
    const dropDownFilterContainer = document.createElement("div");
    dropDownFilterContainer.classList.add("dropDown-filter-container");
    dropDownFilterContainer.classList.add("dropDown-filter-container-closed");
    dropDownFilterContainer.textContent = props.title;
    dropDownFilterContainer.addEventListener("click", props.onClick);

    const arrowDown = document.createElement("img");
    arrowDown.classList.add("arrow-down");
    arrowDown.src = "assets/icones/arrowDown.svg";

    dropDownFilterContainer.appendChild(arrowDown);
    //dropDownFilterContainer.appendChild(arrowUp);

    return dropDownFilterContainer;
}

export interface DropDownFilterProps {
    title: string;
    onClick: () => void;
}
