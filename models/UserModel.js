/*This will help us keep track of users such as Victor using the book. The main goal of 
keeping track of users is to check last time user has contacted the bot. if Victor has been quiet 
of ra week, we will send him a message to know if he's still safe or COVID-19 might have affected him in a way.
*/
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    //Not that the user ID in our schema will be gotten form Facebook Grapgh API
    userID: {
        type: String,
        required: true
    },
});

const UserModel = mongoose.model('UserModel', schema);

module.exports = UserModel;