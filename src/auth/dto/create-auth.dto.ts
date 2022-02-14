import { IsEmail } from 'class-validator';

export class CreateAuthDTO {
  name: string;
  last_name: string;

  @IsEmail()
  email: string;

  password: string;
}
