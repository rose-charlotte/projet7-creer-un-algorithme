import styles from "./DropDownSearch.module.css";

export function DropDownSearchBar(props: DropDownSearchBarProps): HTMLElement {
    const dropDownSearchBar = document.createElement("div");

    dropDownSearchBar.className = styles.filterModalSearchBar;

    const dropDownInput = document.createElement("input");
    dropDownInput.className = styles.searchbarInput;

    dropDownInput.setAttribute("type", "text");
    dropDownInput.addEventListener("input", onChange);

    const searchIcon = document.createElement("img");
    searchIcon.setAttribute("aria-hidden", "true");
    searchIcon.className = styles.searchIcon;

    searchIcon.src = "assets/icones/loupe.svg";

    dropDownSearchBar.appendChild(dropDownInput);
    dropDownSearchBar.appendChild(searchIcon);

    function onChange() {
        props.onChange(dropDownInput.value);
    }

    return dropDownSearchBar;
}

export interface DropDownSearchBarProps {
    onChange: (newValue: string) => void;
}
