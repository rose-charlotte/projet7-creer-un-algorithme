export function buildFilters(): HTMLElement {
    const body = document.querySelector("body");
    const filtersContainer = document.createElement("div");
    const filter1 = document.createElement("select");
    const filter2 = document.createElement("select");
    const filter3 = document.createElement("select");

    body?.appendChild(filtersContainer);
    filtersContainer.appendChild(filter1);
    filtersContainer.appendChild(filter2);
    filtersContainer.appendChild(filter3);

    return filtersContainer;
}
