const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
console.log('DB:', process.env.DATABASE);
console.log('USER:', process.env.USER);
console.log('PASS:', process.env.PASSWORD);
console.log('FUSEKI:', process.env.FUSEKI_URL);
