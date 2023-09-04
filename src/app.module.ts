import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

import { ProductModule } from './product/product.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    /* CategoryModule, ProductModule, ShoppingListModule */
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
