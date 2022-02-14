import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { authProviders } from 'src/auth/auth.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/auth.entity';
import { Test } from './entities/test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, Test])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
