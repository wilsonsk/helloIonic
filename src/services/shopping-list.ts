import { Ingredient } from '../pages/recipes/models/ingredient.interface';

export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  addIngredient(name:string, quantity: number) {
    this.ingredients.push(new Ingredient(name, quantity));
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  remove(index: number) {
    this.ingredients.splice(index, 1);
  }

  getIngredients() {
    return this.ingredients.slice();
  }

}
