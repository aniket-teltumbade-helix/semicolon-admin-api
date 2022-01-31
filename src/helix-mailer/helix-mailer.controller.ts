import { Body, Controller, Post, Req } from '@nestjs/common';
import { SendMail } from './dto/send-invite.dto';
import { HelixMailerService } from './helix-mailer.service';

@Controller('helix-mailer')
export class HelixMailerController {
    constructor(private readonly helixMailerService: HelixMailerService) { }
    @Post()
    mailSender(@Body() mailInfo: SendMail, @Req() request: any) {
        return this.helixMailerService.sendmail({ ...mailInfo, link: request.headers.referer })
    }
}
