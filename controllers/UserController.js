/* This controller will help us keep tract of users and save them to the database */
const UserModel = require('../models/UserModel')

class UserController {
    //We are refering to the senderID we get form facebook API
    static async findUser(senderID) {

        UserModel.findOne({ userID: senderID }).then(
            user => {
                if (user === null) {
                    //Creating the user if not found
                    var user = new UserModel({
                        userID: senderID
                    });

                    //saving the new created user
                    user.save((err) => {
                        if (err)
                            console.log(err);
                    });

                }

            }
        );

    }
}
module.exports = UserController;