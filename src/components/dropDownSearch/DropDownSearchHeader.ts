//Build the header element of the dropDown

export function DropDownSearchHeader(props: DropDownSearchHeaderProps): HTMLElement {
    const dropDownFilterContainer = document.createElement("div");
    dropDownFilterContainer.classList.add("dropdown-search-header");
    dropDownFilterContainer.textContent = props.title;
    dropDownFilterContainer.addEventListener("click", toggleOpenClose);

    const arrowDown = document.createElement("img");
    arrowDown.classList.add("arrow-down");
    arrowDown.src = "assets/icones/arrowDown.svg";

    dropDownFilterContainer.appendChild(arrowDown);

    return dropDownFilterContainer;

    function toggleOpenClose() {
        const isOpened = dropDownFilterContainer.classList.toggle("open");

        if (isOpened) {
            arrowDown.src = "assets/icones/arrowUp.svg";
        } else {
            arrowDown.src = "assets/icones/arrowDown.svg";
        }

        props.onToggleOpenClose(false);
    }
}

export interface DropDownSearchHeaderProps {
    title: string;
    onToggleOpenClose: (open: boolean) => void;
}
