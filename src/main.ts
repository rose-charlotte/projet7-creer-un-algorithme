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
        selectedAppliances: new Set(),
        selectedIngredients: new Set(),
        selectedUstensils: new Set(),

        globalSearchSelectedIngredients: new Set(),
    };

    const allRecipes: Recipe[] = getAllRecipes();

    const header = Header({ onChange: onGlobalFilterChange });
    document.body.appendChild(header);

    function onGlobalFilterChange(value: string) {
        console.log(value);
        // 1. set uiState.globalSearch
        uiState.globalSearch = value;

        uiState.globalSearchSelectedIngredients.clear();

        if (value) {
            // 2. find related ustensils, ingredients and applianances and update the selected ones
            const foundIngredients = getAllIngredients().filter(ingredient => ingredient.includes(value));
            if (foundIngredients.length > 0) {
                foundIngredients.forEach(ingredient => uiState.globalSearchSelectedIngredients.add(ingredient));
            }
        }

        // 3. call filterElements
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
        uiState.selectedAppliances.add(appliance);
        filterElements();
    }

    function onApplianceRemoved(appliance: string) {
        uiState.selectedAppliances.delete(appliance);
        filterElements();
    }

    function onIngredientAdded(ingredient: string) {
        uiState.selectedIngredients.add(ingredient);
        filterElements();
    }

    function onIngredientRemoved(ingredient: string) {
        uiState.selectedIngredients.delete(ingredient);
        uiState.globalSearchSelectedIngredients.delete(ingredient);
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
        const filteredRecipes: Recipe[] = filterWithArrayMethods(
            allRecipes,
            new Set([...uiState.selectedIngredients, ...uiState.globalSearchSelectedIngredients]),
            uiState.selectedAppliances,
            uiState.selectedUstensils,
            uiState.globalSearch
        );

        renderRecipeList(filteredRecipes);
        const { ingredients, appliances, ustensils } = getAllFilters(filteredRecipes);

        filters.updateProps({
            ingredients,
            appliances,
            ustensils,
            selectedIngredients: [...uiState.selectedIngredients, ...uiState.globalSearchSelectedIngredients],
            selectedAppliances: [...uiState.selectedAppliances],
            selectedUstensils: [...uiState.selectedUstensils],
            numberOfRecipes: filteredRecipes.length,
        });
    }
}

interface UIState {
    recipeList?: HTMLElement;
    selectedAppliances: Set<string>;
    selectedIngredients: Set<string>;
    selectedUstensils: Set<string>;
    debounceTimer?: number;

    globalSearch?: string;
    globalSearchSelectedIngredients: Set<string>;
}

buildPage();
