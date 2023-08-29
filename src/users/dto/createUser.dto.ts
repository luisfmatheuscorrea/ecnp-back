import { IsString, IsNotEmpty } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
