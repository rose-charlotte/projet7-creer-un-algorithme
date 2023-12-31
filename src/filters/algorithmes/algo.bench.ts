import { bench } from "vitest";
import { filterWithArrayMethods } from "./arrayMethods";
import { getAllRecipes } from "../../utils/recipeRepository";

import { filterWithNativeLoop } from "./native";

const recipes = getAllRecipes();
const ingredients = new Set(["beurre"]);

bench(
    "array methods",
    () => {
        filterWithArrayMethods(recipes, ingredients, undefined, new Set(), undefined);
    },
    { time: 5_000 }
);

bench(
    "native loops",
    () => {
        filterWithNativeLoop(recipes, ingredients, undefined, new Set(), undefined);
    },
    { time: 5_000 }
);
