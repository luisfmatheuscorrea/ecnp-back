import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export default class UpdateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
