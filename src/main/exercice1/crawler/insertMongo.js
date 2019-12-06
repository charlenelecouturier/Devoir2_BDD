var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

//fonction d'insertion des JSON dans la base de donnees MongoDB


function insertMongo(doc) {
    const urlM = 'mongodb://localhost:27017/DB/connectTimeoutMS=100000';

    MongoClient.connect(urlM, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {

        if (err) throw err;

        const db = client.db("DB");

        //on clear la table avant d'inserer
        db.collection("monsters").deleteMany();

        db.collection('monsters').insertMany(doc).then((doc) => {

            console.log('inserted Mongo')

        }).catch((err) => {

            console.log(err);
        }).finally(() => {

            client.close();
        });
    });
}




var monJson = JSON.parse(fs.readFileSync('part-00000-4823a1dc-2cd2-4da1-a386-80e9af1b0079-c000.json', 'utf8'));

insertMongo(monJson)
