const { response } = require('express');
const bycryptPassword = require('bcrypt');
const User  = require('../models/User');
const generateToken  = require('../helpers/jwt');

const createUser = async (req, res = response) => {  
    try {
        let userData = await User.findOne({ email: req.body.email });
        if (userData) {
            return res.status(400).json({
                ok: false,
                message: 'User already exists',
            })
        }
        const user = new User(req.body);
        const salt = bycryptPassword.genSaltSync(10);
        user.password = bycryptPassword.hashSync(user.password, salt);

         await user.save()
         
        // Create token
        const token = await generateToken(user._id, user.name);
        
         return res.status(201).json({
            ok: true,
            uid: user._id,
            user: user.name,
            token
         })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado',
        })
    }
        
}
    
const loginUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        let user = await User.findOne({ email});
        if (!user) { 
            return res.status(400).json({
                ok: false,
                message: 'User not found',
            })
        }

        // Compare password 
        const validPassword = bycryptPassword.compareSync(req.body.password, user.password);
        if (!validPassword) { 
            return res.status(400).json({
                ok: false,
                message: 'Password incorrect',
            })
        }

        // Create token
        const token = await generateToken(user._id, user.name);
       
        res.status(201).json({
            ok: true,
            email,
            uid: user._id,
            user: user.name,
            token,
        }) 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado',
        })
    }
        
    }
   
const renewtoken = async (req, res = response) => {
    const { uid, name } = req;
    const token = await generateToken(uid, name);
    res.json({
        ok: true,
        uid: uid,
        name: name,
        message: 'Token renew successfuly',
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    renewtoken,
};
