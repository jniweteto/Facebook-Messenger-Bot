//importing the database
const db = require('./configs/database')

const TOKEN = require('./configs/tokens')
const token = TOKEN.tokens.userToken;

const MessegeController = require('./controllers/MessageController')
const JokeController = require('./controllers/JokeController')
const UserController = require('./controllers/UserController')

//importing other middleware libraries and modules that will help to use express and handle different operations in the app
var cors = require('cors');
var bodyParser = require('body-parser')
var express = require('express')
var path = require('path')
var request = require("request")

//creating the server app with express by creating express instance
var app = express();

//this is the port on the local server for the app.
var port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
Creating an endpoint for the homepage using express
*/
app.use(express.static(__dirname + '/public/'));

//======================================================================
// Creating a Facebook Webhook that will used used for token verificaton
app.get("/victorbot", function (req, res) {
    if (req.query["hub.verify_token"] === token) {
        console.log("Sucess! Token Verified!");
        res.status(200).send(req.query["hub.challenge"]);
    }
    else {
        console.error("Verification error, wrong token!");
        console.log(req.query["hub.verify_token"],'\n',token);
        res.sendStatus(403);
    }
});

//creating an endpoint that enable the bot to receive messages from Victor
app.post('/victorbot', async function (req, res) {

    console.log('The post method is being called!');
    console.log(req.body);
    console.log(JSON.stringify(req.body));

    var messaging_events = req.body.entry[0].messaging;
    
    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;
        if (event.message && event.message.text) {

            //his is the response message to the user. it will be a message from the database that stores jokes.

            var text = event.message.text;

            //MessegeController.sendTextMessage(sender, text + ". I'm for you,Victor!");
            var responseMessage= await JokeController.getJoke();
            MessegeController.sendTextMessage(sender, responseMessage);


            /* We also need to check if the user has been contating us before or not. This is to keep track of user
            to that we don't miss a new user. We should also avoid additing an existing user. To avoid this,
            We ask all usert to type "start" or "Start" or "START". We can also check whichever case the user
            writes start(if we have time).*/

            if (text === "START" || text === "start" || text === "Start")
                UserController.findUser(sender);

        }
    }
    res.sendStatus(200);
});

//Setting up weekaly checkins
setInterval(MessegeController.weeklyCheckout, 604800000);

// async function print(){
//     var responseMessage= await JokeController.getJoke();
//     console.log(responseMessage);

// }
// JokeController.getJoke().then(response=> {
//     console.log(response)
// });

// print();
//=====================================================================
//seting up the listening port of the app with:
db(() => {
    app.listen(port, (err, res) => {
        if (err) throw err;

        console.log('The app is listening on port ' + port);
    });
});
