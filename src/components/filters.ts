//regroupe l'ensemble des 3 filtres

import { DropDownSearchComponent } from "./dropDownSearchComponent";
import { DropDownFilter } from "./filter";
//import { toggleFilterModal } from "./toggleFilterModal";

export function buildFilters(): HTMLElement {
    const body = document.querySelector("body");
    const filtersContainer = document.createElement("div");
    filtersContainer.className = "filters-container";

    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";

    function consoleLog() {
        console.log("c'est cliqué");
    }
    const ingredientFilter = DropDownFilter({
        title: "Ingrédient",
        onClick: consoleLog,
    });

    const dropDownSearchComponent = DropDownSearchComponent();
    body?.appendChild(filtersContainer);
    filtersContainer.appendChild(filterContainer);
    filterContainer.appendChild(ingredientFilter);
    filterContainer.appendChild(dropDownSearchComponent);

    return filtersContainer;
}
