export function DropDownSearchBar(): HTMLElement {
    const dropDownSearchBar = document.createElement("div");
    // dropDownSearchBar.setAttribute("type", "text");
    dropDownSearchBar.className = "filter-modal__searchBar";

    const dropDownInput = document.createElement("input");
    dropDownInput.setAttribute("type", "text");
    dropDownInput.className = "searchbar-input";

    const searchIcon = document.createElement("img");
    searchIcon.setAttribute("aria-hidden", "true");
    searchIcon.className = "searchIcon";
    searchIcon.src = "assets/icones/loupe.svg";

    dropDownSearchBar.appendChild(dropDownInput);
    dropDownSearchBar.appendChild(searchIcon);
    return dropDownSearchBar;
}
