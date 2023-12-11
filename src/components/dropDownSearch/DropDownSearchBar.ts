import styles from "./DropDownSearch.module.css";

export function DropDownSearchBar(props: DropDownSearchBarProps): HTMLElement {
    const dropDownSearchBar = document.createElement("div");

    dropDownSearchBar.className = styles.filterModalSearchBar;

    const dropDownInput = document.createElement("input");
    dropDownInput.className = styles.searchbarInput;

    dropDownInput.setAttribute("type", "text");

    dropDownInput.addEventListener("input", onChange);

    const searchIcon = document.createElement("img");
    searchIcon.className = styles.searchIcon;

    const closeBtn = document.createElement("img");
    closeBtn.src = "assets/icones/closeBtn.svg";
    closeBtn.alt = "close button";
    closeBtn.className = styles.closeBtn;
    closeBtn.classList.add(styles.hide);

    closeBtn.addEventListener("click", () => {
        dropDownInput.value = "";
        closeBtn.classList.toggle(styles.hide);
        onChange();
    });

    searchIcon.src = "assets/icones/loupe.svg";
    searchIcon.alt = "Chercher";

    dropDownSearchBar.appendChild(dropDownInput);
    dropDownSearchBar.appendChild(closeBtn);
    dropDownSearchBar.appendChild(searchIcon);

    function onChange() {
        if (dropDownInput.value.length === 1) {
            closeBtn.classList.toggle(styles.hide);
        }
        props.onChange(dropDownInput.value);
    }

    return dropDownSearchBar;
}

export interface DropDownSearchBarProps {
    onChange: (newValue: string) => void;
}
