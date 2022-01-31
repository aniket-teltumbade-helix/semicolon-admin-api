import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProgModule } from './prog/prog.module';
import { routesConfig } from './config/routes';
import { envConfig } from './config/environment';
import { mailerConfig } from './config/mailer';
import { HelixMailerService } from './helix-mailer/helix-mailer.service';
import { HelixMailerController } from './helix-mailer/helix-mailer.controller';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    routesConfig,
    envConfig,
    mailerConfig,
    ProgModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [AppController, HelixMailerController],
  providers: [AppService, HelixMailerService],
})
export class AppModule { }
