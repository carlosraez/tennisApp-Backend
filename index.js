const express = require('express');

//create express app
const app = express();


//define port
app.listen(4000, () => {
    console.log('Server running on port 4000');
});