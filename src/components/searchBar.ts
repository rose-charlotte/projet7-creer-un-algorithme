export function searchBarComponent(): HTMLElement {
    const searchBarContainer = document.createElement("form");
    searchBarContainer.setAttribute("class", "searchbar-container");

    const searchBarInput = document.createElement("input");
    searchBarInput.setAttribute("class", "searchbar-input");
    searchBarInput.setAttribute("placeholder", "Rechercher une recette, un ingrédient...");

    const searchBarIcone = document.createElement("img");
    searchBarIcone.setAttribute("class", "searchbar-icone");
    searchBarIcone.setAttribute("src", "assets/icones/Group 4.svg");

    searchBarContainer.appendChild(searchBarInput);
    searchBarContainer.appendChild(searchBarIcone);

    return searchBarContainer;
}
