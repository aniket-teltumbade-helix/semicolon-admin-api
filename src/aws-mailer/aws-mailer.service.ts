import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk"

@Injectable()
export class AwsMailerService {
    sendMail(email: string, pin) {
        AWS.config.update({ region: 'ap-south-1' })
        var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail({
            Destination: {
                CcAddresses: [
                    email,
                ],
                ToAddresses: [
                    email,
                ]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: `Your pin is: <strong>${pin}</strong>`
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: "TEXT_FORMAT_BODY"
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'Login Pin'
                }
            },
            Source: '',
        }).promise()
        return sendPromise.then(res => res).catch(err => err)
    }
}
