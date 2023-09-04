import { ShoppingListProduct } from './shopping-list-product.entity';

export class ShoppingList {
  id: number;

  status: string;

  observation: string;

  createdAt: Date;

  updatedAt: Date;

  products: ShoppingListProduct[];
}
