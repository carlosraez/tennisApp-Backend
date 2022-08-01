const { response } = require('express');
const Player  = require('../models/Player');

const getPlayers = async (req, res = response) => {  
    return res.status(201).json({
       ok: true,
      
    })      
}

const createPlayer = async (req, res = response) => {  
    try {
        let userData = await Player.findOne({ name: req.body.name });
        if (userData) {
            return res.status(400).json({
                ok: false,
                message: 'User already exists',
            })
        }
   
        const user = new Player(req.body);
        
        console.log(playerId);

        await user.save()
        
         return res.status(201).json({
            ok: true,
            player: user,
         })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado',
        })
    }   
}

const UpdatePlayer = async (req, res = response) => {  
    return res.status(201).json({
       ok: true,
       player: user,
    })      
}

const DeletePlayer = async (req, res = response) => {  
         return res.status(201).json({
            ok: true,
            player: user,
         })      
}

module.exports = {
    UpdatePlayer,
    createPlayer,
    DeletePlayer,
    getPlayers,
};