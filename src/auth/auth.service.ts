import { Injectable, Inject } from '@nestjs/common';
import { Auth } from './auth.entity';
import * as uuid from 'uuid'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private usersRepository: Repository<Auth>,
  ) { }

  findAll(): Promise<Auth[]> {
    return this.usersRepository.find().then(res => res).catch(err => err)
  }

  createUser(user) {
    user = { user_id: uuid.v4(), ...user };
    return this.usersRepository.create(user)
  }
  async findUser(user): Promise<Auth> {
    return this.usersRepository.findOne({ where: user });
  }
}
