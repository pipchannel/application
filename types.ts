
export type FoodType = 'main_course' | 'dessert' | null;

export interface Ingredient {
  id: string;
  name: string;
  category: string;
}

export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  cookingTime: number;
  difficulty: 'آسان' | 'متوسط' | 'سخت';
}

export interface IngredientCategory {
  title: string;
  items: Ingredient[];
}
