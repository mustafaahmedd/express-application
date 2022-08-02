// USER DATA BASE MODEL.....

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    fName: {
        type: String
    },
    lName:{
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    age :{
    type: Number
}
},
{
    collection: 'users'
});

module.exports = mongoose.model('User', User);