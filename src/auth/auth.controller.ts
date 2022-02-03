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
    console.log(user);

    return this.usersService
      .findUser({
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        console.log(res);
        return { admin_id: res[0].admin_id };
      })
      .catch((err) => {
        return { err };
      });
  }
}
