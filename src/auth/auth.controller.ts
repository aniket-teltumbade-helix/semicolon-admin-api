import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';
import { CreateAuthDTO } from './dto/create-auth.dto';
import { SingleAuthDto } from './dto/get-auth-dto';
import { VerifyAuthDTO } from './dto/verify-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly usersService: AuthService) { }

  @Get('/users')
  getUsers(): Promise<Auth[]> {
    return this.usersService.findAll();
  }
  @Post('/signup')
  registerUser(@Body() user: CreateAuthDTO) {
    return this.usersService
      .createUser(user)
  }
  @Post('/login')
  loginUser(@Body() user: VerifyAuthDTO) {
    return this.usersService
      .findUser({
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res) return { msg: { user_id: res.user_id } };
        else return { err: 'Something went wrong, try again!' };
      })
      .catch((err) => {
        return { err };
      });
  }
}
