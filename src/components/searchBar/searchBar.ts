import styles from "./searchBar.module.css";

export function searchBarComponent(props: searchBarComponentProps): HTMLElement {
    const searchBarContainer = document.createElement("div");
    searchBarContainer.className = styles.searchbarContainer;

    const searchBarInput = document.createElement("input");
    searchBarInput.className = styles.searchbarInput;
    searchBarInput.setAttribute("placeholder", "Rechercher une recette, un ingrédient...");

    const searchBarIconeButton = document.createElement("button");
    searchBarIconeButton.className = styles.searchbarIconeButton;
    const searchBarIcone = document.createElement("img");
    searchBarIcone.className = styles.searchbarIcone;
    searchBarIcone.setAttribute("src", "assets/icones/Group 4.svg");

    //searchBarInput.addEventListener("input", onChange);
    searchBarIconeButton.addEventListener("click", onHandleChange);

    function onHandleChange() {
        if (searchBarInput.value.length >= 3) {
            onChange();
        } else alert("pas assez de charactère");
    }
    function onChange() {
        props.onChange(searchBarInput.value);
    }

    searchBarContainer.appendChild(searchBarInput);
    searchBarContainer.appendChild(searchBarIconeButton);
    searchBarIconeButton.appendChild(searchBarIcone);

    return searchBarContainer;
}

export interface searchBarComponentProps {
    onChange: (newValue: string) => void;
}
