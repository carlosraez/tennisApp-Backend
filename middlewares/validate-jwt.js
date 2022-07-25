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
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        // Add user to request object
        req.uid = uid;
        req.name = name;
      
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