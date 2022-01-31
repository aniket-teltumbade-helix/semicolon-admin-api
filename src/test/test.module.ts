import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { authProviders } from 'src/auth/auth.provider';

@Module({
  controllers: [TestController],
  providers: [TestService, ...authProviders]
})
export class TestModule { }
