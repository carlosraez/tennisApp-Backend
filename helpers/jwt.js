const jwt = require('jsonwebtoken');

const generateToken = (uid, name) => {
   return new Promise( (resolve, reject) => {
    const payload =  {uid, name }
    jwt.sign( payload , process.env.SECRET_JWT_SEED, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            console.log('Error in generateToken');
            reject(err);
        } else {
            resolve(token);
        }
    })
       })
    }

module.exports = generateToken;
