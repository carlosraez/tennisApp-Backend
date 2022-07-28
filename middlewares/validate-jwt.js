const { response } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = (req, res = response, next) => {
    
    // Get token from header
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token provided'
        });
    }

    try {
        // Verify token
        jwt.verify(token, process.env.SECRET_JWT_SEED, (err, decoded) => {
            if(err) {
                return res.status(400).send('Session expired')
            }
            req.uid = decoded.uid;
            req.name = decoded.name;
        })
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
      }
     
    // Continue with request
    next();
}

module.exports = {
    validateJWT
}