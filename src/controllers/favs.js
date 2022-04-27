const Fav = require('../models/favs');
const User = require('../models/users');

exports.create = async(req, res) =>{
    try {
        const { body: { userId, ...rest} } = req;
        const user = await User.findById(userId);
        if(!user){
            throw new Error('Usuario invalido');
        }
        const fav = await Fav.create({ ...rest, user: userId });
        res.status(201).json({ message: 'Elemento creado', fav});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.list = async(req, res) =>{
    try {
        const { userId } = req.query;
        const favs = await Fav.find({ user: userId });
        res.status(200).json({ message: `${favs.length} elementos encontrados`, favs})
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal'});
    }
}

exports.show = async(req, res) => {
    const {favId} = req.params;
    try {
        const fav = await Fav.findById(favId).populate('user', 'email password');
        if(!fav){
            throw new Error('Elemento no encontrado')
        }
        res.status(200).json({ message: 'Elemento encontrado', fav });
    } catch (error) {
        res.status(400).json({ message: `El elemento con id: ${favId} no fue encontrado`});
    }
}

exports.update = async (req, res) => {
    const {body, params: {favId}} = req;
    try {
        const fav = await Fav.findByIdAndUpdate(favId, body, { new: true});
        res.status(200).json({ message: 'Elemento actualizado', fav});
    } catch (error) {
        res.status(400).json({ message: 'El elemento no pudo ser actualizado'});
    }
}

exports.destroy = async (req, res) => {
    const { favId } = req.params;
    try {
        const fav = await Fav.findByIdAndDelete(favId);
        res.status(200).json({ message: 'El elemento fue borrado', fav});
    } catch (error) {
        res.status(400).json({ message: 'El elemento no pudo ser borrado'});
    }
}