import { searchBarComponent } from "./searchBar";

export function buildHeader(): HTMLElement {
    const body = document.querySelector("body");
    const headerContainer = document.createElement("header");
    headerContainer.setAttribute("class", "header-container");

    const mainHeader = document.createElement("div");
    mainHeader.setAttribute("class", "main-header");

    const headerTitleContainer = document.createElement("div");
    headerTitleContainer.ariaLabel = "Enseigne les petits plats";
    headerTitleContainer.setAttribute("class", "header-title-container");

    const mainTitle = document.createElement("img");
    mainTitle.setAttribute("src", "assets/icones/Les petits plats.svg");
    mainTitle.ariaLabel = "Les petits plats";

    const logo = document.createElement("img");
    logo.setAttribute("src", "assets/icones/Group 3.svg");
    logo.ariaLabel = "logo de les petits plats";

    const descriptionTextContainer = document.createElement("div");
    descriptionTextContainer.setAttribute("class", "description-text-container");
    descriptionTextContainer.ariaLabel = "container de la description";

    const descriptiontext = document.createElement("p");
    descriptiontext.setAttribute("class", "description-text");
    descriptiontext.textContent = "Cherchez parmi plus de 1500 recettes du quotidien, simples et délicieuses";

    const searchBarContainer = searchBarComponent();

    body?.appendChild(headerContainer);
    headerContainer.appendChild(mainHeader);
    mainHeader.appendChild(headerTitleContainer);
    headerTitleContainer.appendChild(mainTitle);
    headerTitleContainer.appendChild(logo);
    mainHeader.appendChild(descriptionTextContainer);
    descriptionTextContainer.appendChild(descriptiontext);
    mainHeader.appendChild(searchBarContainer);

    return headerContainer;
}
