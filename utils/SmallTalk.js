const JokeController = require('../controllers/JokeController')
const HashMap = require('hashmap');


class SmallTalk {

    //This function is being used to create a simple conversation between the user and the bot
    static async sampleTalk() {

        //creating a conversation
        var map = new HashMap();
        map.set("bonjour", "Bonjour, Comment allez-vous?");
        map.set("ca va bien", "Parfait! Comment puis-je vous aider?");
        map.set("bien", "Parfait! Comment puis-je vous aider?");
        map.set("bonsoir", "Bonsoir");
        map.set("au revoir", "Au revoir, Merci!");
        map.set("merci", "Pas de probleme.");
        map.set("bye", "Bye bye! A bientont!");
        map.set("bye bye", "Bye! A bientont!");
        map.set("merci bea", "Parfait. Pas de probleme.");
        map.set("salut", "Salut, comment ca va?");
        map.set("bonne jour", "Merci beacoup, et vous aussi!");
        map.set("bonne soir", "Merci beacoup, et vous aussi!");
        map.set("bonne apr", "Bonne apres midi. Comment allez vous?");
        map.set("bonne nuit", "Merci beacoup, et vous aussi!");
        map.set("comment ca va", "Ca va bein merci! Et vous?");
        map.set("ca va", "Ca va bein merci! Et vous?");
        map.set("comment allez-vous", "Ca va bein merci! Et vous?");
        map.set("comment allez vous", "Ca va bein merci! Et vous?");


        return map;
    }

    static async match(str) {
        //converting the user input to lowercase to compare it with information in our created conversation
        var text = str.toLowerCase();

        //Getting the conversation
        var map = await SmallTalk.sampleTalk();

        //Searching a conversation that includes the user input

        var promise = new Promise((resolve, reject) => {

            map.forEach((value, key) => {
                //if we find a matching conversation, the bot will respond with an appropiate response from the dictionary.
                if (text.includes(key)) {
                    //console.log("Sucess! There is match");
                    resolve(value);

                }
            })
            //console.log("There is no match, pick a random response")
            resolve(JokeController.getJoke());
        });

        console.log("This is the response from the hashmap:");

        return promise

    }

}
module.exports = SmallTalk;
