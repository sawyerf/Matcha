import nodemailer from 'nodemailer';

export const sendmail = async (email, title, content) => {
    const account = await nodemailer.createTestAccount()

    const transporter = await nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });
    console.log(account.email)
    transporter.sendMail({
        from: 'Matcha <matcha@matcha.com>',
        to: email,
        subject: title,
        text: content,
        html: content
    }, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(response));
        }
        smtpTransport.close();
    });
}