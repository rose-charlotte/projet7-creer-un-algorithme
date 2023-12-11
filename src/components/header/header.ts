import { searchBarComponent } from "../searchBar/searchBar";
import styles from "./header.module.css";

export function Header(props: headerProps): HTMLElement {
    const headerContainer = document.createElement("header");
    headerContainer.className = styles.headerContainer;

    const mainHeader = document.createElement("div");
    mainHeader.className = styles.mainHeader;

    const headerTitleContainer = document.createElement("div");
    headerTitleContainer.className = styles.headerTitleContainer;

    const mainTitle = document.createElement("img");
    mainTitle.setAttribute("src", "assets/icones/Les%20petits%20plats.svg");
    mainTitle.alt = "Les petits plats";

    const logo = document.createElement("img");
    logo.setAttribute("src", "assets/icones/Group%203.svg");
    logo.alt = "logo de les petits plats";

    const descriptionTextContainer = document.createElement("div");
    descriptionTextContainer.className = styles.descriptionTextContainer;

    const descriptiontext = document.createElement("p");
    descriptiontext.className = styles.descriptionText;
    descriptiontext.textContent = "Cherchez parmi plus de 1500 recettes du quotidien, simples et délicieuses";

    const searchBarContainer = searchBarComponent({ onChange });

    function onChange(value: string) {
        props.onChange(value);
    }

    headerContainer.appendChild(mainHeader);
    mainHeader.appendChild(headerTitleContainer);
    headerTitleContainer.appendChild(mainTitle);
    headerTitleContainer.appendChild(logo);
    mainHeader.appendChild(descriptionTextContainer);
    descriptionTextContainer.appendChild(descriptiontext);
    mainHeader.appendChild(searchBarContainer);

    return headerContainer;
}

export interface headerProps {
    onChange: (newValue: string) => void;
}
