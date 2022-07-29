const express = require('express');
const config = require('./helper/config');
const path = require('path');
const corns = require('cors');
const bodyparser = require('body-parser');

const app = express();
app.use(corns());

app.set('views', path.join(__dirname, 'views'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));    

app.set('view engine','ejs');

const email_r = require('./routes/email');
app.use('/', email_r);

app.listen(config.port, () => {console.log(`Server Running At Port : ${config.port}`);})