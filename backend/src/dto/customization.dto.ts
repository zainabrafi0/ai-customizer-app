import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateCustomizationDto {
  @IsString()
  baseModel!: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  features!: string[];
}