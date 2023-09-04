import { Product } from 'src/product/entities/product.entity';
import { ShoppingList } from './shopping-list.entity';

export class ShoppingListProduct {
  id: number;
  quantity: number;
  checked: boolean;
  productId: number;
  shoppingListId: number;
  product: Product;
  shoppingList: ShoppingList[];
}
