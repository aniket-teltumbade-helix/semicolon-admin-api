import { MailerModule } from "@nestjs-modules/mailer";
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export const mailerConfig = MailerModule.forRoot({
    transport: {
        host: process.env.MAIL_SMTP,
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    },
    defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
    },
    template: {
        dir: process.cwd() + '/templates',
        adapter: new EjsAdapter(),
        options: {
            strict: true,
        },
    },
})