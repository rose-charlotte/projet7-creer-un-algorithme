import { buildFilters } from "./components/filters";
import { buildHeader } from "./components/header";
import { buildRecipeList } from "./components/recipeList";

function buildPage(): void {
    buildHeader();
    buildFilters();
    buildRecipeList();
}

buildPage();
