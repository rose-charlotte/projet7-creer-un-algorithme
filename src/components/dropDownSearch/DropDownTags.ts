import styles from "./DropDownSearch.module.css";

export function DropDownTags(props: DropDownTagProps): HTMLElement {
    const tagsContainer = document.createElement("div");

    props.items.forEach(item => {
        const elementContainer = document.createElement("div");
        elementContainer.className = styles.selectedItemContainer;
        const element = document.createElement("p");
        element.className = styles.selectedItem;
        element.textContent = item;
        element.dataset.item = item;

        const closeBtn = document.createElement("img");
        closeBtn.src = "assets/icones/closeBtn.svg";
        closeBtn.alt = "close button";
        closeBtn.className = styles.closeBtn;
        closeBtn.dataset.item = item;
        closeBtn.addEventListener("click", () => {
            elementContainer.classList.add(styles.hide);
            props.onItemRemoved(item);
        });
        elementContainer.appendChild(element);
        elementContainer.appendChild(closeBtn);

        tagsContainer.appendChild(elementContainer);
    });

    return tagsContainer;
}
export interface DropDownTagProps {
    items: string[];
    onItemRemoved: (item: string) => void;
}
