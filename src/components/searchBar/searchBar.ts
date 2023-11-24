import styles from "./searchBar.module.css";

export function searchBarComponent(): HTMLElement {
    const searchBarContainer = document.createElement("form");
    searchBarContainer.className = styles.searchbarContainer;

    const searchBarInput = document.createElement("input");
    searchBarInput.className = styles.searchbarInput;
    searchBarInput.setAttribute("placeholder", "Rechercher une recette, un ingrédient...");

    const searchBarIcone = document.createElement("img");
    searchBarIcone.className = styles.searchbarIcone;
    searchBarIcone.setAttribute("src", "assets/icones/Group 4.svg");

    searchBarContainer.appendChild(searchBarInput);
    searchBarContainer.appendChild(searchBarIcone);

    return searchBarContainer;
}
