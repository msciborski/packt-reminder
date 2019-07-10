const sgMail = require('@sendgrid/mail');

exports.sendEmail = (to, title) => {
    const msg = {
        to,
        from: process.env.EMAIL,
        subject: 'We have found book which can intrest you!',
        text: `We found book: ${title}. Visit pack: https://packtpub.com/packt/offers/free-learning`,
    };

    sgMail.send(msg);
}