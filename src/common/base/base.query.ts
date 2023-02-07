import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { SortOrder } from 'mongoose';

export class SortQuery {
  @ApiProperty({
    description: `Field to sort`,
    type: String,
    required: false,
  })
  @IsString()
  field: string;

  @ApiProperty({
    description: `Sort Ascending (ASC) or Descending (DESC)`,
    type: String,
    required: false,
  })
  @IsString()
  @IsIn([-1, 1, 'asc', 'ascending', 'desc', 'descending'])
  type: SortOrder;
}

export class BaseQuery {
  @ApiProperty({
    description: `Page number`,
    type: Number,
    required: false,
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  pageNumber: number;

  @ApiProperty({
    description: `Number of records per page`,
    type: Number,
    required: false,
    minimum: 0,
    maximum: 100,
    default: 20,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  pageSize: number;

  @ApiProperty({
    description: `Sort by field`,
    required: false,
    isArray: true,
    example: 'name:ASC,age:DESC',
  })
  @IsOptional()
  sort: SortQuery[];
}
