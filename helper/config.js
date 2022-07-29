require('dotenv').config();
const assert = require('assert');

const {PORT, HOST, HOST_URL, EMAIL_SERVER, PASSWORD} = process.env;
assert(PORT,'Port is required');
assert(HOST,'host is required');

module.exports = {
    port : PORT,
    host : HOST,
    email_server : EMAIL_SERVER,
    password : PASSWORD
}
