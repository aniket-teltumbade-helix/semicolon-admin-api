import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Auth } from './auth.entity';
import * as uuid from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { errorMessage } from 'src/error';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private usersRepository: Repository<Auth>,
  ) {}

  findAll(): Promise<Auth[]> {
    return this.usersRepository
      .find()
      .then((res) => res)
      .catch((err) => err);
  }

  createUser(user) {
    if (user.email && user.password) {
      user = { admin_id: uuid.v4(), ...user };
      return this.usersRepository.save(user);
    } else {
      return errorMessage('BAD_REQUEST', 'Email and password are required.');
    }
  }
  findUser(user): Promise<Auth> {
    if (!user.email && !user.password) {
      return errorMessage('BAD_REQUEST', 'Email and password are required.');
    }
    return this.usersRepository
      .find({ where: { email: user.email, password: user.password } })
      .then((res) => res)
      .catch((err) => err);
  }
}
