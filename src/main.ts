import { Filters } from "./components/filters/filters";
import { Header } from "./components/header/header";
import { RecipeList } from "./components/recipes/recipeList";
import { filterWithArrayMethods } from "./filters/algorithmes/arrayMethods";
import { Recipe } from "./types/Recipe";
import {
    getAllRecipes,
    getAllAppliances,
    getAllIngredients,
    getAllUstensils,
    getAllFilters,
} from "./utils/recipeRepository";

function buildPage(): void {
    const uiState: UIState = {
        selectedIngredients: new Set(),
        selectedUstensils: new Set(),
    };

    const allRecipes: Recipe[] = getAllRecipes();

    const header = Header({ onChange: onGlobalFilterChange });
    document.body.appendChild(header);

    function onGlobalFilterChange(value: string) {
        uiState.globalSearch = value;

        filterElements();
    }

    const filters = Filters({
        appliances: getAllAppliances(),
        ingredients: getAllIngredients(),
        ustensils: getAllUstensils(),
        selectedAppliances: [],
        selectedIngredients: [],
        selectedUstensils: [],
        onApplianceAdded,
        onApplianceRemoved,
        onIngredientAdded,
        onIngredientRemoved,
        onUstensilAdded,
        onUstensilRemoved,
        numberOfRecipes: getAllRecipes().length,
    });

    document.body.appendChild(filters.element);

    renderRecipeList(allRecipes);

    function renderRecipeList(recipes: Recipe[]) {
        const recipeList = RecipeList({ recipes });

        if (uiState.recipeList) {
            uiState.recipeList.replaceWith(recipeList);
        } else {
            document.body.appendChild(recipeList);
        }

        uiState.recipeList = recipeList;
    }

    function onApplianceAdded(appliance: string) {
        uiState.selectedAppliance = appliance;
        filterElements();
    }

    function onApplianceRemoved() {
        uiState.selectedAppliance = undefined;
        filterElements();
    }

    function onIngredientAdded(ingredient: string) {
        uiState.selectedIngredients.add(ingredient);
        filterElements();
    }

    function onIngredientRemoved(ingredient: string) {
        uiState.selectedIngredients.delete(ingredient);
        filterElements();
    }

    function onUstensilAdded(ustensil: string) {
        uiState.selectedUstensils.add(ustensil);
        filterElements();
    }

    function onUstensilRemoved(ustensil: string) {
        uiState.selectedUstensils.delete(ustensil);
        filterElements();
    }

    function filterElements() {
        console.log(uiState.globalSearch);
        const filteredRecipes: Recipe[] = filterWithArrayMethods(
            allRecipes,
            uiState.selectedIngredients,
            uiState.selectedAppliance,
            uiState.selectedUstensils,
            uiState.globalSearch
        );

        console.log(filteredRecipes);
        renderRecipeList(filteredRecipes);
        const { ingredients, appliances, ustensils } = getAllFilters(filteredRecipes);

        filters.updateProps({
            ingredients,
            appliances,
            ustensils,
            selectedIngredients: [...uiState.selectedIngredients],
            selectedAppliances: uiState.selectedAppliance ? [uiState.selectedAppliance] : [],
            selectedUstensils: [...uiState.selectedUstensils],
            numberOfRecipes: filteredRecipes.length,
        });
    }
}

interface UIState {
    recipeList?: HTMLElement;
    selectedAppliance?: string;
    selectedIngredients: Set<string>;
    selectedUstensils: Set<string>;
    debounceTimer?: number;

    globalSearch?: string;
}

buildPage();
