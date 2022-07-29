const express = require('express');
const { createTransport } = require('nodemailer');
const {email_view,sendmail} = require('../controller/email');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../helper/config');

router.get('/',email_view);
router.post('/send', sendmail);

module.exports = router;
