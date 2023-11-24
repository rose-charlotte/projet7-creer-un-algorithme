import { searchBarComponent } from "../searchBar/searchBar";
import styles from "./header.module.css";

export function buildHeader(): HTMLElement {
    const body = document.querySelector("body");
    const headerContainer = document.createElement("header");
    headerContainer.className = styles.headerContainer;

    const mainHeader = document.createElement("div");
    mainHeader.className = styles.mainHeader;

    const headerTitleContainer = document.createElement("div");
    headerTitleContainer.ariaLabel = "Enseigne les petits plats";
    headerTitleContainer.className = styles.headerTitleContainer;

    const mainTitle = document.createElement("img");
    mainTitle.setAttribute("src", "assets/icones/Les petits plats.svg");
    mainTitle.ariaLabel = "Les petits plats";

    const logo = document.createElement("img");
    logo.setAttribute("src", "assets/icones/Group 3.svg");
    logo.ariaLabel = "logo de les petits plats";

    const descriptionTextContainer = document.createElement("div");
    descriptionTextContainer.className = styles.descriptionTextContainer;
    descriptionTextContainer.ariaLabel = "container de la description";

    const descriptiontext = document.createElement("p");
    descriptiontext.className = styles.descriptionText;
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
