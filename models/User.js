const {Schema} = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'is required']
    },
    email: {
        type: String,
        required: [true, 'is required'],
        unique: true,
        index: true,
        validate: {
            validator: function(str){
                 return 
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: [true, 'is required'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Object,
        default: {
            total: 0,
            count: 0
        }
    },
    notifications: {
        type: Array,
        default: []
    },
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
}, {minimize: false});

UserSchema.statics.findByCredentials = async function(email, password) {
    const user = await User.findOne({email});
    if(!user) throw new Error('invalid credentials');
    const isSamePassword = bcrypt.compareSync(password, user.password);
    if(isSamePassword) return user;
    throw new Error('Invalid credentials');
}

const User = mongoose.model('User', UserSchema);

module.exports = User;