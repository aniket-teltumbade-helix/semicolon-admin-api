import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelixMailerService {
    constructor(private readonly mailerService: MailerService) { }
    public sendmail(mailData): Promise<any> {
        let { name, email, template, link } = mailData;
        console.log(name, link);

        return this.mailerService
            .sendMail({
                to: email,
                from: 'noreply@helixstack.in',
                subject: template === 'invite' ? 'Helix Contest Invitation' : 'Welcome to Helix',
                template: 'invite',
                context: {
                    name: name,
                    link: link,
                },
            })
            .then((res) => {
                console.log(res);

                return res;
            })
            .catch((err) => {
                console.log(err);

                return err;
            });
    }
}
