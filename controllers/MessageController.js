/* This is the code that allows sending messages to  Victor or any other user of the bot */
const request = require('request')
const TOKEN = require('../configs/tokens')
const token = TOKEN.tokens.userToken;

const ALERT = require('../utils/constantMessage')
const chek_in = ALERT.MESSAGE.weeklyCheckout;

const UserModel = require('../models/UserModel')


class MessageController {

    static async sendTextMessage(sender, text) {
        var messageData = {
            text: text
        };
        request({
            url: 'https://graph.facebook.com/v7.0/me/messages',
            qs: {
                access_token: token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: sender
                },
                message: messageData,
                tag: "NON_PROMOTIONAL_SUBSCRIPTION" // this tag will help us sending weekly check-in to victor
            }
        }, function (error, response, body) {
            if (error) {
                console.log('Error:', error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }

    static async weeklyCheckout() {

        var checkMessage = chek_in;

        UserModel.find().exec((err, users) => {
            if (err)
                console.log("There was an error while loading users " + err);

            users.forEach(user => {
                MessageController.sendTextMessage(user.userID, checkMessage);
            });

        });

    }

}


module.exports = MessageController;