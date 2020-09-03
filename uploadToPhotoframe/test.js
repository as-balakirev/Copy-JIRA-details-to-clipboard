'use strict';
const fs = require('fs');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
let source = process.argv[2];



function readFiles(filepath) {
    return new Promise (function (resolve, reject) {
        let attachments = fs.readdir(filepath).map(item => ({
            filename: item,
            path: filepath + '/' + item,
        }));
        resolve(attachments);
    });
}


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    logger: true,
    auth: {
        user: 'asbalakirev@gmail.com',
        pass: 'Overoverw@tch'
    }
});
//

readFiles('testFiles')
    .then(function (attachments) {
        let mailDetails = {
            from: 'Nodemailer <example>',
            to: "asbalakirev@outlook.com",
            subject: "ololo test email",
            text: "ololo text",
            attachments: attachments,
        }
        return mailDetails;
    })
    .then (function (mailDetails) {
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs ' + err);
            } else {
                console.log('Email sent successfully');
            }
        });
    });



// mailTransporter.sendMail(mailDetails, function(err, data) {
//     if(err) {
//         console.log('Error Occurs ' + err);
//     } else {
//         console.log('Email sent successfully');
//     }
// });