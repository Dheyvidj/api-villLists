import { Category } from 'src/category/entities/category.entity';

export class Product {
  id: number;

  name: string;

  description?: string;

  value: number;

  measurement: string;

  createdAt: Date;

  updatedAt: Date;

  active: boolean;

  category: Category;

  categoryId: number;

  // shoppingLists: []
}
