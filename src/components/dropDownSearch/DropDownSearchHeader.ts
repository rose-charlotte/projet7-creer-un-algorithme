import { ComponentRender } from "../../ComponentRender";
import styles from "./DropDownSearch.module.css";

//Build the header element of the dropDown

export function DropDownSearchHeader(props: DropDownSearchHeaderProps): ComponentRender<DropDownSearchHeaderProps> {
    const dropDownFilterContainer = document.createElement("div");
    dropDownFilterContainer.classList.add(styles.dropdownSearchHeader);

    dropDownFilterContainer.textContent = props.title;
    dropDownFilterContainer.addEventListener("click", toggleOpenClose);

    const arrowDown = document.createElement("img");
    arrowDown.classList.add(styles.arrowDown);
    arrowDown.alt = "Ouvrir";
    arrowDown.src = "assets/icones/arrowDown.svg";

    dropDownFilterContainer.appendChild(arrowDown);
    return {
        element: dropDownFilterContainer,
        updateProps,
    };

    function toggleOpenClose() {
        props.onToggleOpenClose();
    }

    function setClose() {
        if (dropDownFilterContainer.classList.contains(styles.open)) {
            dropDownFilterContainer.classList.remove(styles.open);
        }

        arrowDown.src = "assets/icones/arrowDown.svg";
        arrowDown.alt = "Ouvrir";
    }

    function setOpen() {
        if (!dropDownFilterContainer.classList.contains(styles.open)) {
            dropDownFilterContainer.classList.add(styles.open);
        }

        arrowDown.src = "assets/icones/arrowUp.svg";
        arrowDown.alt = "Fermer";
    }

    function updateProps(updatedProps: Partial<DropDownSearchHeaderProps>) {
        if (updatedProps.isOpened === true) {
            setOpen();
        } else if (updatedProps.isOpened === false) {
            setClose();
        }
    }
}

export interface DropDownSearchHeaderProps {
    title: string;
    isOpened: boolean;
    onToggleOpenClose: () => void;
}
