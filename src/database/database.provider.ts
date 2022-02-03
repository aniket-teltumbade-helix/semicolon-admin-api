import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/auth.entity';
import { Candidate } from 'src/category/candidate/entities/candidate.entity';
import { Invite } from 'src/category/candidate/entities/invite.entity';
import { Mcq } from 'src/category/mcq/entities/mcq.entity';
import { Program } from 'src/prog/program.entity';
import { Test } from 'src/test/entities/test.entity';

export const databaseProviders = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Auth, Program, Mcq, Candidate, Invite, Test],
  synchronize: true,
  logging: true,
  cache: true,
  logger: "advanced-console"
})