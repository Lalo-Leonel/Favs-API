const { Schema, model, models } = require('mongoose');
const bcrypt = require('bcrypt');

const passwordRegexp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
const usersSchema = new Schema({
    email: {
        type: String,
        validate:[
            {
                async validator(email){
                    try {
                        const user = await models.User.findOne({ email });
                        return !user
                    } catch (error) {
                        return false
                    }
                },
                message: 'El correo ya esta en uso'
            }
        ]
    },
    password: {
        type: String,
        match: passwordRegexp
    }
},{
    timestamps: true
})

usersSchema.pre('save', async function(){
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
})

const User = model('User', usersSchema);

module.exports = User;