import { Injectable } from '@nestjs/common';
import { CreateShoppingListInput } from './dto/create-shopping-list.input';
import { UpdateShoppingListInput } from './dto/update-shopping-list.input';

@Injectable()
export class ShoppingListService {
  create(createShoppingListInput: CreateShoppingListInput) {
    return 'This action adds a new shoppingList';
  }

  findAll() {
    return `This action returns all shoppingList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingList`;
  }

  update(id: number, updateShoppingListInput: UpdateShoppingListInput) {
    return `This action updates a #${id} shoppingList`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingList`;
  }
}
