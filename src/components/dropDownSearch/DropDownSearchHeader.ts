import styles from "./DropDownSearch.module.css";

//Build the header element of the dropDown

export function DropDownSearchHeader(props: DropDownSearchHeaderProps): HTMLElement {
    const dropDownFilterContainer = document.createElement("div");
    dropDownFilterContainer.classList.add(styles.dropdownSearchHeader);

    dropDownFilterContainer.textContent = props.title;
    dropDownFilterContainer.addEventListener("click", toggleOpenClose);

    const arrowDown = document.createElement("img");
    arrowDown.classList.add(styles.arrowDown);
    arrowDown.alt = "Ouvrir";
    arrowDown.src = "assets/icones/arrowDown.svg";

    dropDownFilterContainer.appendChild(arrowDown);

    return dropDownFilterContainer;

    function toggleOpenClose() {
        const isOpened = dropDownFilterContainer.classList.toggle(styles.open);

        if (isOpened) {
            arrowDown.src = "assets/icones/arrowUp.svg";
            arrowDown.alt = "Fermer";
        } else {
            arrowDown.src = "assets/icones/arrowDown.svg";
            arrowDown.alt = "Ouvrir";
        }

        props.onToggleOpenClose(false);
    }
}

export interface DropDownSearchHeaderProps {
    title: string;
    onToggleOpenClose: (open: boolean) => void;
}
