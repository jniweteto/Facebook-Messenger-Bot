
/*
 his file contains codes to create a collectionin the database. 
The collection will contain jokes that the bot will sent to Victor.
This collection was named "JokeModel".

Jokes will have numbers or IDs and textmessage.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    jokeID: {
        type: Number,
        required: true,
        unique: true
    },
    jokeMessage: {
        type: String,
        required: true,
        unique: true
    }
});

const JokeModel = mongoose.model('JokeModel', schema);

module.exports = JokeModel;