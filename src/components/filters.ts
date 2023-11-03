export function buildFilters(): HTMLElement {
    const body = document.querySelector("body");
    const filtersContainer = document.createElement("div");
    filtersContainer.className = "filters-container";
    const filter1 = document.createElement("div");
    filter1.className = "filter";
    filter1.textContent = "Ingrédeients";
    const filter2 = document.createElement("div");
    filter2.className = "filter";
    filter2.textContent = "Appareils";
    const filter3 = document.createElement("div");
    filter3.className = "filter";
    filter3.textContent = "Ustensiles";

    body?.appendChild(filtersContainer);
    filtersContainer.appendChild(filter1);
    filtersContainer.appendChild(filter2);
    filtersContainer.appendChild(filter3);

    return filtersContainer;
}
