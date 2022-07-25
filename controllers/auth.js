const { response } = require('express');

const createUser = (req, res = response) => {  
    const { name, email, password } = req.body;
    res.status(201).json({
        ok: true,
        name,
        email,
        password,
        message: 'Register succesfully'
})}

const loginUser = (req, res = response) => {
    const { name, email } = req.body;
    res.status(201).json({
        ok: true,
        name,
        email,
        message: 'Login successfuly',
    })
}

const renewtoken = (req, res = response) => {
    res.json({
        ok: true,
        message: 'Token renew successfuly',
    })
}

module.exports = {
    createUser,
    loginUser,
    renewtoken,
};