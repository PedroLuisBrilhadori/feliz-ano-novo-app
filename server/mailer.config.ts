import * as mailer from 'nodemailer';

export function createMailer() {
    return mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });
}
