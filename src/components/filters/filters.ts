//regroupe l'ensemble des 3 filtres

import { ComponentRender } from "../../ComponentRender.ts";
import { DropDownSearch } from "../dropDownSearch/DropDownSearch.ts";

import styles from "./filters.module.css";

//Get all  recipes ingredients, put them all in lowercase, put them in a set and tyransform it into  an array:

//const t0 = performance.now();

//const t1 = performance.now();
//console.log(`call to make it took ${t1 - t0} miliseconds`);

// function that handle the dropDown display

export function Filters(props: FiltersProps): ComponentRender<FiltersProps> {
    const filtersContainer = document.createElement("div");
    filtersContainer.className = styles.filtersContainer;

    const filterContainer = document.createElement("div");
    filterContainer.className = styles.filterContainer;

    const dropDownIngredientFilter = DropDownSearch({
        title: "Ingredient",
        items: props.ingredients,
        selectedItems: props.selectedIngredients,
        onItemSelected: props.onIngredientAdded,
        onItemRemoved: props.onIngredientRemoved,
    });

    const dropDownApplianceFilter = DropDownSearch({
        title: "Appareils",
        items: props.appliances,
        selectedItems: props.selectedAppliances,
        onItemSelected: props.onApplianceAdded,
        onItemRemoved: props.onApplianceRemoved,
    });

    const dropDownUstensilFilter = DropDownSearch({
        title: "Ustensiles",
        items: props.ustensils,
        selectedItems: props.selectedUstensils,
        onItemSelected: props.onUstensilAdded,
        onItemRemoved: props.onUstensilRemoved,
    });

    filtersContainer.appendChild(filterContainer);

    filterContainer.appendChild(dropDownIngredientFilter.element);
    filterContainer.appendChild(dropDownApplianceFilter.element);
    filterContainer.appendChild(dropDownUstensilFilter.element);

    function updateProps(updatedProps: Partial<FiltersProps>) {
        if (updatedProps.selectedAppliances) {
            dropDownApplianceFilter.updateProps({ selectedItems: updatedProps.selectedAppliances });
        }

        if (updatedProps.selectedIngredients) {
            dropDownIngredientFilter.updateProps({ selectedItems: updatedProps.selectedIngredients });
        }

        if (updatedProps.selectedUstensils) {
            dropDownUstensilFilter.updateProps({ selectedItems: updatedProps.selectedUstensils });
        }
    }

    return {
        element: filtersContainer,
        updateProps,
    };
}

export interface FiltersProps {
    appliances: string[];
    ingredients: string[];
    ustensils: string[];

    selectedAppliances: string[];
    selectedIngredients: string[];
    selectedUstensils: string[];

    onIngredientAdded: (ingredient: string) => void;
    onIngredientRemoved: (ingredient: string) => void;

    onApplianceAdded: (appliance: string) => void;
    onApplianceRemoved: (appliance: string) => void;

    onUstensilAdded: (ustensil: string) => void;
    onUstensilRemoved: (ustensil: string) => void;
}
