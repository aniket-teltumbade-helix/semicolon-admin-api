import { Sequelize } from 'sequelize-typescript';
import { Auth } from 'src/auth/auth.entity';
import { Candidate } from 'src/category/candidate/entities/candidate.entity';
import { Mcq } from 'src/category/mcq/entities/mcq.entity';
import { Prog } from 'src/prog/prog.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      });
      sequelize.addModels([Auth, Prog, Mcq, Candidate]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
