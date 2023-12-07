//regroupe l'ensemble des 3 filtres

import { ComponentRender } from "../../ComponentRender.ts";
import { DropDownSearch } from "../dropDownSearch/DropDownSearch.ts";

import styles from "./filters.module.css";

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

    const numberOfRecipes = document.createElement("div");
    numberOfRecipes.className = styles.numberOfRecipes;

    numberOfRecipes.textContent = `${props.numberOfRecipes} recettes`;

    filtersContainer.appendChild(filterContainer);

    filterContainer.appendChild(dropDownIngredientFilter.element);
    filterContainer.appendChild(dropDownApplianceFilter.element);
    filterContainer.appendChild(dropDownUstensilFilter.element);

    filtersContainer.appendChild(numberOfRecipes);

    function updateProps(updatedProps: Partial<FiltersProps>) {
        if (updatedProps.ingredients || updatedProps.ustensils || updatedProps.appliances) {
            dropDownIngredientFilter.updateProps({
                items: updatedProps.ingredients,
                selectedItems: updatedProps.selectedIngredients,
            });

            dropDownApplianceFilter.updateProps({
                items: updatedProps.appliances,
                selectedItems: updatedProps.selectedAppliances,
            });

            dropDownUstensilFilter.updateProps({
                items: updatedProps.ustensils,
                selectedItems: updatedProps.selectedUstensils,
            });
        }

        if (updatedProps.numberOfRecipes) {
            numberOfRecipes.textContent = `${updatedProps.numberOfRecipes} recettes`;
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

    numberOfRecipes: number;
}
