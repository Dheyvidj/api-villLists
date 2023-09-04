import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryInput } from './create-category.input';

export class UpdateCategoryInput extends CreateCategoryInput {
  @ApiProperty()
  id: number;
}
