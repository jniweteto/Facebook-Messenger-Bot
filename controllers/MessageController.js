/* This is the code that allows sending messages to  Victor or any other user of the bot */
const request = require('request')
const TOKEN = require('../configs/tokens')
const token = TOKEN.tokens.userToken;
const pageToken = TOKEN.tokens.pageToken;

const ALERT = require('../utils/constantMessage')
const chek_in = ALERT.MESSAGE.checkin;

const UserModel = require('../models/UserModel')


class MessageController {

    static async sendTextMessage(sender, text) {
        var messageData = {
            text: text
        };
        request({
            url: 'https://graph.facebook.com/v7.0/me/messages',
            qs: {
                access_token: pageToken
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

        UserModel.find().exec((err, users) => {
            if (err)
                console.log("There was an error while loading users " + err);

            users.forEach(user => {
                // Get user's first name from the User Profile API
                // and include it in the weekly check message. This may also be hardcoded as "Victor" for this bot.
                request({
                    url: "https://graph.facebook.com/v7.0/" + user.userID,
                    qs: {
                        access_token: pageToken,
                        fields: "first_name"
                    },
                    method: "GET"
                }, function (error, response, body) {
                    var checkMessage = "";
                    if (error) {
                        console.log("Error getting user's name: " + error);
                    } else {
                        var bodyObj = JSON.parse(body);
                       var name = bodyObj.first_name;
                        checkMessage = "Hi " + name + ", " + chek_in;
                    }

                    MessageController.sendTextMessage(user.userID, checkMessage);
                });

            });

        });

    }

}


module.exports = MessageController;