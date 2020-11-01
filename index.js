// Run this command to install modules -> npm install

// In your Gmail->Security Turn On Less Secure Apps Support

const csv = require("csv-parser");
const fs = require("fs");
const nodemailer = require('nodemailer');

const username = "rathodb021@gmail.com";
const password = "www.ncst.com";

let errorEmails = [];

function addErrorEmails(email) {
    errorEmails.push(email);
}

const sendEmail = async(toEmail) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: username,
            pass: password
        }
    });

    const mailOptions = {
        from: "rathodb021@gmail.com",
        to: toEmail,
        subject: "Test Mail",
        text: "This is a test mail from Nirav using NodeJS",
        html: `<html>
        <body>
            Please find below the Link for Virtual Lab Usage Session in Microsoft Teams
            <br>
            <a href="https://teams.microsoft.com/l/team/19%3aeaee1a4350e143138a5400e4c0971ba5%40thread.tacv2/conversations?groupId=6d22649c-d110-4810-961c-91dfed4cb5a8&tenantId=3e832ec5-419f-4005-bac6-fddaab0c737a">Join conversation</a><br><br> You are requested
            to join the session from a laptop/desktop to effectively utilize the virtual lab session <br> Please feel free to contact your concerned subject faculty or on the mail provided with this mail in case of any queries <br><br><br>-- Regards,<br>Regional
            Nodal Centre, Vlabs- IIT Mumbai<br>Gujarat University
        </body>
        </html>`
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log("Error at ", toEmail);
            addErrorEmails(toEmail);
        } else {
            console.log("Mail Sent to " + toEmail);
            console.log("Info", info.response);
        }
    });
}

const sendEmailFromCSV = async(csvFileName, emailColumnName) => {
    fs.createReadStream(csvFileName)
        .pipe(csv())
        .on('data', async(row) => {
            const email = row[emailColumnName];
            console.log(email);
            setTimeout(async() => {
                await sendEmail(email);
            }, 1000);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
};

sendEmailFromCSV("updated_data.csv", "Enter your email");

const timer = setTimeout(() => {
    for (let i = 0; i < errorEmails.length; i++)
        console.log(errorEmails[i]);
}, 10000);