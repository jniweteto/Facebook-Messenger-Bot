/* In the model, we defined jokes schema wiht id numbers. There will be 10 dummy jokes in the database
A rondom number will be generated and the joke with the same generated number will be the response to the
user who sends a message to the bot. Exept for the greeting/welcome message */
const JokeModel = require('../models/JokeModel')

class JokeController {

    //Here is going to be code for get the number of jokes in our database. Then we use in generating a rondom number between
    //zero and that number [0,numberofJokes[

    static async countJokes() {

        var promise = new Promise((resolve, reject) => {

            JokeModel.countDocuments((err, count) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }

                else {
                    resolve(count);

                }

            })
        });

        return promise;
    }

    static async getJoke() {


        var range = await JokeController.countJokes();
        var randomJoke = Math.floor(Math.random() * range);

        console.log(randomJoke);

        //find a joke wit the same number in the data base
        return JokeModel.findOne({ jokeID: randomJoke }).then(
            joke => {
                console.log(joke);
                return joke.jokeMessage;
            }
        );

    }


}
module.exports = JokeController;
