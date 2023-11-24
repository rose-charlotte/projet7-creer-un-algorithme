//import { mapRecipes } from "./Mapping/mapRecipes";
import { buildFilters } from "./components/filters/filters";
import { buildHeader } from "./components/header/header";
import { buildRecipeList } from "./components/recipes/recipeList";

function buildPage(): void {
    buildHeader();
    buildFilters();
    buildRecipeList();
}

buildPage();
