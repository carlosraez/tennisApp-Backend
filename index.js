const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
var cors = require('cors')
const { dbConnection } = require('./database/config');
const { validateJWT } = require('./middlewares/validate-jwt');

//create express app
const app = express();

//cors
app.use(cors())

//database connection
dbConnection();

//public directory
app.use(express.static('public'));

//parser for post data
app.use(express.json());

//routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/players', require('./routes/players'));

//define port
app.listen(process.env.PORT, () => {
    console.log('Server running on port 4000');
});