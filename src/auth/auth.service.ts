import { Injectable, Inject } from '@nestjs/common';
import { Auth } from './auth.entity';
import * as uuid from 'uuid'

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private usersRepository: typeof Auth,
  ) { }

  async findAll(): Promise<Auth[]> {
    return this.usersRepository.findAll<Auth>();
  }
  createUser(user) {
    user = { user_id: uuid.v4(), ...user };
    return this.usersRepository.create(user).then((response) => {
      return response
    }).catch((error) => {
      console.log(error);
      return error;
    })
  }
  async findUser(user): Promise<Auth> {
    return this.usersRepository.findOne({ where: user });
  }
}
