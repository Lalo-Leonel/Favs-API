const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { body } = req;
        //hash
        // const hash = await bcrypt.hash(body.password, 10);
        const user = await User.create(body);
        const token = await jwt.sign(
            { id: user._id},
            process.env.SECRET,
            { expiresIn: 60*60*24*365 }
        )
        res.status(201).json({ token});
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.signin = async (req, res) => {
    try {
        const { body: { email, password } } = req;
        const user = await User.findOne({email});
        if(!user || !password){
            throw new Error('Email o contraseña invalida');
        }
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            throw new Error('Email o contraseña invalida');
        }
        const token = await jwt.sign(
            { id: user._id},
            process.env.SECRET,
            { expiresIn: 60*60*24*365 }
        )
        res.status(201).json({ token })
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}