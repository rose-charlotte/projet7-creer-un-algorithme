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
    // searchIcon.addEventListener("click", onHandleChange);

    // const closeBtn = document.createElement("img");
    // closeBtn.src = "assets/icones/closeBtn.svg";
    // closeBtn.classList.add(styles.closeBtn);
    // closeBtn.classList.add(styles.hide);
    // closeBtn.addEventListener("click", () => {
    //     dropDownInput.value = "";
    //     closeBtn.classList.toggle(styles.hide);
    //     onChange();
    // });

    // function onInputChange() {
    //     if (dropDownInput.value.length >= 3) {
    //         closeBtn.classList.toggle(styles.hide);
    //     }
    // }
    // function onHandleChange() {
    //     if (dropDownInput.value.length >= 3) {
    //         onChange();
    //     } else alert("pas assez de charactère");
    // }
    searchIcon.src = "assets/icones/loupe.svg";

    dropDownSearchBar.appendChild(dropDownInput);
    // dropDownSearchBar.appendChild(closeBtn);
    dropDownSearchBar.appendChild(searchIcon);

    function onChange() {
        props.onChange(dropDownInput.value);
    }

    return dropDownSearchBar;
}

export interface DropDownSearchBarProps {
    onChange: (newValue: string) => void;
}
