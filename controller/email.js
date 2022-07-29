const { json } = require('body-parser');
const nodemailer = require('nodemailer');
const { isReadable } = require('nodemailer/lib/xoauth2');
const config = require('../helper/config');

let transporter = nodemailer.createTransport
({
    
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, 
    auth: 
    {
      user: config.email_server, // generated ethereal user
      pass: config.password, // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
      }
  });

const email_view = async (req, res, next) =>
{
   res.render("email");
}

const sendmail = async (req, res, next) =>
{

    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
    //console.log(req.body);
    try
    {
        const emailobject = req.body;
        if(emailobject)
        {
            console.log(emailobject);
            //const email = JSON.parse(emailobject);
            //console.log(email);
            const mailoption = {
                from:config.email_server,
                to:emailobject.email,
                subject:"nodemailer",
                text:"hello",
                html:output
            }
            transporter.sendMail(mailoption,(error,info) =>
            {
                if(error)
                {
                    console.log(error);
                }
                //console.log('Message sent: %s', info.messageId);   
               // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          
                //res.send('email', 'Email has been sent');
                res.send('Email has been sent')
            })
        }
    }
    catch(error)
    {
        res.status(404).send(error.message);
    }

}

module.exports = {email_view, sendmail};