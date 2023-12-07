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

        //globalSearchSelectedAppliances: new Set(),
        globalSearchSelectedIngredients: new Set(),
        //globalSearchSelectedUstensils: new Set(),
    };

    const allRecipes: Recipe[] = getAllRecipes();

    const header = Header({ onChange: onGlobalFilterChange });
    document.body.appendChild(header);

    function onGlobalFilterChange(value: string) {
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
        console.log(value);
        // 1. set uiState.globalSearch
        uiState.globalSearch = value;

        // uiState.globalSearchSelectedAppliances.clear();
        uiState.globalSearchSelectedIngredients.clear();
        //  uiState.globalSearchSelectedUstensils.clear();

        if (value) {
            // 2. find related ustensils, ingredients and applianances and update the selected ones
            const foundIngredients = getAllIngredients().filter(ingredient => ingredient.includes(value));
            if (foundIngredients.length > 0) {
                foundIngredients.forEach(ingredient => uiState.globalSearchSelectedIngredients.add(ingredient));
            }

            // const foundUstensils = getAllUstensils().filter(ustensil => ustensil.includes(value));
            // if (foundUstensils.length > 0) {
            //     foundUstensils.forEach(ustensil => uiState.globalSearchSelectedUstensils.add(ustensil));
            // }

            // const foundAppliance = getAllAppliances().filter(appliance => appliance.includes(value));
            // if (foundAppliance.length > 0) {
            //     foundAppliance.forEach(appliance => uiState.globalSearchSelectedAppliances.add(appliance));
            // }
        }

        // 3. call filterElements
        filterElements();

        // 4. use filters.updateProps
        // filters.updateProps({
        //     selectedIngredients: [...uiState.selectedIngredients, ...uiState.globalSearchSelectedIngredients],
        //     selectedUstensils: [...uiState.selectedUstensils, ...uiState.globalSearchSelectedUstensils],
        //     selectedAppliances: [...uiState.selectedAppliances, ...uiState.globalSearchSelectedAppliances],
        // });
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
        // filters.updateProps({
        //     selectedAppliances: [...uiState.selectedAppliances, ...uiState.globalSearchSelectedAppliances],
        // });
        filterElements();
    }

    function onApplianceRemoved(appliance: string) {
        uiState.selectedAppliances.delete(appliance);
        //  uiState.globalSearchSelectedAppliances.delete(appliance);
        // filters.updateProps({
        //     selectedAppliances: [...uiState.selectedAppliances, ...uiState.globalSearchSelectedAppliances],
        // });
        filterElements();
    }

    function onIngredientAdded(ingredient: string) {
        uiState.selectedIngredients.add(ingredient);
        // filters.updateProps({
        //     selectedIngredients: [...uiState.selectedIngredients, ...uiState.globalSearchSelectedIngredients],
        // });
        filterElements();
    }

    function onIngredientRemoved(ingredient: string) {
        uiState.selectedIngredients.delete(ingredient);
        uiState.globalSearchSelectedIngredients.delete(ingredient);
        // filters.updateProps({
        //     selectedIngredients: [...uiState.selectedIngredients, ...uiState.globalSearchSelectedIngredients],
        // });
        filterElements();
    }

    function onUstensilAdded(ustensil: string) {
        uiState.selectedUstensils.add(ustensil);
        // filters.updateProps({
        //     selectedUstensils: [...uiState.selectedUstensils, ...uiState.globalSearchSelectedUstensils],
        // });
        filterElements();
    }

    function onUstensilRemoved(ustensil: string) {
        uiState.selectedUstensils.delete(ustensil);
        //uiState.globalSearchSelectedUstensils.delete(ustensil);
        // filters.updateProps({
        //     selectedUstensils: [...uiState.selectedUstensils, ...uiState.globalSearchSelectedUstensils],
        // });
        filterElements();
    }

    function filterElements() {
        const filteredRecipes: Recipe[] = filterWithArrayMethods(
            allRecipes,
            new Set([...uiState.selectedIngredients, ...uiState.globalSearchSelectedIngredients]),
            uiState.selectedAppliances,
            uiState.selectedUstensils,
            // new Set([...uiState.selectedAppliances, ...uiState.globalSearchSelectedAppliances]),
            // new Set([...uiState.selectedUstensils, ...uiState.globalSearchSelectedUstensils]),
            uiState.globalSearch
        );
        console.log(filteredRecipes);
        renderRecipeList(filteredRecipes);

        filters.updateProps({
            selectedIngredients: [...uiState.selectedIngredients, ...uiState.globalSearchSelectedIngredients],
            // selectedUstensils: [...uiState.selectedUstensils, ...uiState.globalSearchSelectedUstensils],
            // selectedAppliances: [...uiState.selectedAppliances, ...uiState.globalSearchSelectedAppliances],
            selectedAppliances: [...uiState.selectedAppliances],
            selectedUstensils: [...uiState.selectedUstensils],
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
    //globalSearchSelectedAppliances: Set<string>;
    globalSearchSelectedIngredients: Set<string>;
    //globalSearchSelectedUstensils: Set<string>;
}

buildPage();
