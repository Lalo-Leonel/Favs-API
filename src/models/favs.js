const { Schema, model } = require('mongoose');

const favsSchema = new Schema({
    title: String,
    description: String,
    link: String,
},{
    timestamps: true,
})

const Fav = model('Fav', favsSchema);

module.exports = Fav;