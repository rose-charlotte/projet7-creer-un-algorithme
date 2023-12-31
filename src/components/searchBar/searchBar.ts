import styles from "./searchBar.module.css";

export function searchBarComponent(props: searchBarComponentProps): HTMLElement {
    const searchBarContainer = document.createElement("div");
    searchBarContainer.className = styles.searchbarContainer;

    const searchBarInput = document.createElement("input");
    searchBarInput.className = styles.searchbarInput;
    searchBarInput.setAttribute("placeholder", "Rechercher une recette, un ingrédient...");

    const closeBtn = document.createElement("img");
    closeBtn.src = "assets/icones/closeBtn.svg";
    closeBtn.alt = "close button";
    closeBtn.className = styles.closeBtn;
    closeBtn.classList.add(styles.hide);

    searchBarInput.addEventListener("input", onInputChange);

    function onInputChange() {
        if (searchBarInput.value.length === 0) {
            closeBtn.classList.add(styles.hide);
        } else {
            closeBtn.classList.remove(styles.hide);
        }

        props.onChange(searchBarInput.value);
    }

    closeBtn.addEventListener("click", () => {
        searchBarInput.value = "";
        closeBtn.classList.add(styles.hide);
        onChange();
    });

    const searchBarIconeButton = document.createElement("button");
    searchBarIconeButton.className = styles.searchbarIconeButton;
    const searchBarIcone = document.createElement("img");
    searchBarIcone.className = styles.searchbarIcone;
    searchBarIcone.setAttribute("src", "assets/icones/Group%204.svg");
    searchBarIcone.alt = "Chercher";

    // searchBarIconeButton.addEventListener("click", onHandleChange);
    // searchBarInput.addEventListener("keydown", onKeyPressed);

    // function onKeyPressed(e: KeyboardEvent) {
    //     if (e.code === "Enter" || e.code === "NumpadEnter") {
    //         onHandleChange();
    //     }
    // }

    // function onHandleChange() {
    //     if (searchBarInput.value.length === 0) {
    //         onChange();
    //     }

    //     if (searchBarInput.value.length >= 3) {
    //         onChange();
    //     }
    // }

    function onChange() {
        props.onChange(searchBarInput.value);
    }

    searchBarContainer.appendChild(searchBarInput);

    searchBarContainer.appendChild(closeBtn);

    searchBarContainer.appendChild(searchBarIconeButton);
    searchBarIconeButton.appendChild(searchBarIcone);

    return searchBarContainer;
}

export interface searchBarComponentProps {
    onChange: (newValue: string) => void;
}
