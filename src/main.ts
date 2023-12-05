import { Filters } from "./components/filters/filters";
import { Header } from "./components/header/header";
import { RecipeList } from "./components/recipes/recipeList";
import { filterWithArrayMethods } from "./filters/algorithmes/arrayMethods";
import { Recipe } from "./types/Recipe";
import { getAllRecipes, getAllAppliances, getAllIngredients, getAllUstensils } from "./utils/recipeRepository";

function buildPage(): void {
    const uiState: UIState = {
        selectedAppliances: new Set(),
        selectedIngredients: new Set(),
        selectedUstensils: new Set(),
    };

    const allRecipes: Recipe[] = getAllRecipes();

    const header = Header({ onChange });
    document.body.appendChild(header);

    function onChange(value: string) {
        if (uiState.debounceTimer) {
            clearTimeout(uiState.debounceTimer);
            uiState.debounceTimer = undefined;
        }

        uiState.debounceTimer = setTimeout(() => {
            filterGlobalSearch(value);
            uiState.debounceTimer = undefined;
        }, 500);
    }

    function filterGlobalSearch(value: string) {
        // console.log(value);
        // const ingredients: string[] = getAllIngredients();
        // console.log(ingredients);
        // const foundedIngredient = ingredients.filter(ingredient => ingredient.includes(value));
        // console.log(foundedIngredient);
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
        filters.updateProps({
            selectedAppliances: Array.from(uiState.selectedAppliances),
        });
        filterElements();
    }

    function onApplianceRemoved(appliance: string) {
        uiState.selectedAppliances.delete(appliance);
        filters.updateProps({
            selectedAppliances: Array.from(uiState.selectedAppliances),
        });
        filterElements();
    }

    function onIngredientAdded(ingredient: string) {
        uiState.selectedIngredients.add(ingredient);
        filters.updateProps({
            selectedIngredients: Array.from(uiState.selectedIngredients),
        });
        filterElements();
    }

    function onIngredientRemoved(ingredient: string) {
        uiState.selectedIngredients.delete(ingredient);
        filters.updateProps({
            selectedIngredients: Array.from(uiState.selectedIngredients),
        });
        filterElements();
    }

    function onUstensilAdded(ustensil: string) {
        uiState.selectedUstensils.add(ustensil);
        filters.updateProps({
            selectedUstensils: Array.from(uiState.selectedUstensils),
        });
        filterElements();
    }

    function onUstensilRemoved(ustensil: string) {
        uiState.selectedUstensils.delete(ustensil);
        filters.updateProps({
            selectedUstensils: Array.from(uiState.selectedUstensils),
        });
        filterElements();
    }

    function filterElements() {
        const filteredRecipes: Recipe[] = filterWithArrayMethods(
            allRecipes,
            uiState.selectedIngredients,
            uiState.selectedAppliances,
            uiState.selectedUstensils,
            uiState.globalSearch
        );
        console.log(filteredRecipes);
        renderRecipeList(filteredRecipes);
    }
}

interface UIState {
    recipeList?: HTMLElement;
    selectedAppliances: Set<string>;
    selectedIngredients: Set<string>;
    selectedUstensils: Set<string>;
    debounceTimer?: number;
    globalSearch?: string;
}

buildPage();
