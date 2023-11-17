//Build the header element of the dropDown

export function DropDownSearchHeader(props: DropDownSearchHeaderProps): HTMLElement {
    const dropDownFilterContainer = document.createElement("div");
    dropDownFilterContainer.classList.add("open");
    dropDownFilterContainer.classList.add("closed");
    dropDownFilterContainer.textContent = props.title;
    dropDownFilterContainer.addEventListener("click", toggleOpenClose);

    const arrowDown = document.createElement("img");
    arrowDown.classList.add("arrow-down");
    arrowDown.src = "assets/icones/arrowDown.svg";

    dropDownFilterContainer.appendChild(arrowDown);

    return dropDownFilterContainer;

    function toggleOpenClose() {
        if (arrowDown?.src.match("assets/icones/arrowDown.svg")) {
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
