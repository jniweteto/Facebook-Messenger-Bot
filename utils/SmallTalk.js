const JokeController = require('../controllers/JokeController')
const HashMap = require('hashmap');


class SmallTalk {

    static async sampleTalk() {

        var map = new HashMap();
        map.set("bonjour", "Bonjour");
        map.set("bonsoir", "Bonsoir");
        map.set("au revoir", "Au revoir, Merci!");
        map.set("merci", "Pas de probleme.");
        map.set("bye", "Bye bye! A bientont!");
        map.set("bye bye", "Bye! A bientont!");
        map.set("merci bea", "Parfait. Pas de probleme.");
        map.set("salut", "Salut!");
        map.set("bonne jour", "Merci beacoup, et vous aussi!");
        map.set("bonne soir", "Merci beacoup, et vous aussi!");
        map.set("bonne apr", "Bonne apres midi. Comment allez vous?");
        map.set("bonne nuit", "Merci beacoup, et vous aussi!");
        map.set("comment ca va", "Ca va bein merci! Et vous?");
        map.set("ca va", "Ca va bein merci! Et vous?");
        map.set("comment allez-vous", "Ca va bein merci! Et vous?");
        map.set("comment allez vous", "Ca va bein merci! Et vous?");
    


        //console.log(map);

        return map;
    }

    static async match(str) {
        var text = str.toLowerCase();
        var map = await SmallTalk.sampleTalk();

        var promise = new Promise((resolve, reject) => {

            map.forEach((value, key) => {
                if (text.includes(key)) {
                    console.log("Sucess! There is match");
                    resolve(value);

                } 
            })
            console.log("There is no match, pick a random response")
            resolve(JokeController.getJoke());
        });

        console.log("This is the response from the hashmap:");

        return promise

    }

}
module.exports = SmallTalk;
