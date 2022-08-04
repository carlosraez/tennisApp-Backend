const { response } = require('express');
const Player  = require('../models/Player');

const getPlayers = async (req, res = response) => {  
    
    const players = await Player.find()
    .populate('user')
    return res.status(201).json({
       ok: true,
       players,      
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

const deletePlayer = async (req, res = response) => {
    try {
        await Player.findByIdAndDelete(req.body.id)
        return res.status(201).json({
            ok: true,
            message: 'Player deleted',
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado',
        })
    }     
}  
    
const updatePlayer = async (req, res = response) => {
    try {
        await Player.findByIdAndUpdate(req.body.id, req.body, { new: true })
     
        return res.status(201).json({
            ok: true,
            message: 'Player updated',
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado',
        })
    }     
}
 


module.exports = {
    updatePlayer,
    createPlayer,
    deletePlayer,
    getPlayers,
};