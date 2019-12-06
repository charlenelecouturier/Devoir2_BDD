var mongo = require("mongoose");

function start() {
    var db = mongo.connect("mongodb://localhost:27017/DB", { useNewUrlParser: true, useUnifiedTopology: true }, function (err, response) {
        if (err) { console.log(err); }
        else { console.log('connected to DB'); }
    });
    var Schema = mongo.Schema;
    var MonstersSchema = new Schema({
        spells: { type: String },
        name: { type: Array }
    }, { versionKey: false });

    var SpellsSchema = new Schema({
        name: { type: String },
        class: { type: Array },
        level: { type: Number },
        components: { type: Array },
        spellres: { type: String },
        description: { type: String }
    }, { versionKey: false });

    var model = {
        monster: mongo.model('monsters', MonstersSchema, 'monsters'),
        spell: mongo.model('spells', SpellsSchema, 'spells')
    };

    return model
}

function getMonster(req, res, model) {
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
        console.log(data)
    })
}

function getSpells(req, res, model) {
    mots = req.body.mots;
    level = req.body.level;
    component = req.body.component;
    classe = req.body.class;    
    
    var query= new Object;
    if(mots!=null){
        
    }
    if(level!=null){    
        query.level = {$lte:level}
    }
    if(component[0]!=undefined){
        query.components = {$all:component}
    }
    if(classe[0]!=undefined){
        query.class = {$all:classe}
    }
    model.spell.find(query, 
            function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
        console.log(data)
    });
}


module.exports = {
    start,
    getMonster,
    getSpells
}