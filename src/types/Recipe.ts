import { Ingredient } from "./Ingredient";

export interface Recipe {
    id: number;
    image: string;
    name: string;
    servings: number;
    ingredients: Ingredient[];
    time: number;
    description: string;
    appliance: string;
    ustensils: string[];
}
