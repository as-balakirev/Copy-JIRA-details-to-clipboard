'use strict';
const fs = require('fs');
const nodemailer = require('nodemailer');
//const smtpTransport = require('nodemailer-smtp-transport');
let source = process.argv[2];



function readFiles(filepath) {
    return fs.readdirSync(filepath).map(item => ({
        filename: item,
        path: filepath + '/' + item,
    }));
}


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    logger: true,
    auth: {
        user: 'asbalakirev@gmail.com',
        pass: 'Overoverw@tch'
    }
});


let mailDetails = {
    from: 'Nodemailer <example>',
    to: "asbalakirev@outlook.com",
    subject: "ololo test email",
    text: "ololo text",
    attachments: readFiles('testFiles'),
};



mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs ' + err);
    } else {
        console.log('Email sent successfully');
    }
});