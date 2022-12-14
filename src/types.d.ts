export interface Meal {
    mealType: string;
    food: string;
    calorie: number;
}

export interface ApiMeal extends Meal{
    id: string;
}
export interface ApiMealsList {
    [id: string]: Meal;
}