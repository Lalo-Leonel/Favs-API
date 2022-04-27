const { Schema, model } = require('mongoose');

const favsSchema = new Schema({
    title: String,
    description: String,
    link: String,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true,
})

const Fav = model('Fav', favsSchema);

module.exports = Fav;