import { buildHeader } from "./components/header";
//import { buildRecipes } from "./components/recipes";

function buildPage(): HTMLElement {
    const header = buildHeader();
    //  const recipes = buildRecipes("Limonade Coco", "Mettre eau dans sucre");

    return header;
}

buildPage();
