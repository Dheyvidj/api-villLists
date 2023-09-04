import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities/product.entity';

export class Category {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  products?: Product[];
}
