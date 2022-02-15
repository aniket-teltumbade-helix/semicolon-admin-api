import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProgModule } from './prog/program.module';
import { routesConfig } from './config/routes';
import { envConfig } from './config/environment';
import { mailerConfig } from './config/mailer';
import { CategoryModule } from './category/category.module';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth/auth.entity';
import { Candidate } from './category/candidate/entities/candidate.entity';
import { Mcq } from './category/mcq/entities/mcq.entity';
import { Program } from './prog/program.entity';
import { Invite } from './category/candidate/entities/invite.entity';
import { databaseProviders } from './database/database.provider';
import { TestCasesModule } from './test-cases/test-cases.module';
import { CompilerModule } from './compiler/compiler.module';

@Module({
  imports: [
    routesConfig,
    envConfig,
    mailerConfig,
    ProgModule,
    AuthModule,
    CategoryModule,
    TestModule,
    TypeOrmModule.forFeature([Auth, Candidate, Mcq, Program, Invite]),
    databaseProviders,
    TestCasesModule,
    CompilerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
