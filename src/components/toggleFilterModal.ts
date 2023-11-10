import { buildFilterModal } from "./dropDownSearchComponent";

export function toggleFilterModal() {
    console.log("je suis cliqué");
    const filterModal = document.querySelector(".filter-modal");

    if (filterModal) {
        filterModal.parentNode?.removeChild(filterModal);
    } else {
        buildFilterModal();
    }
}
