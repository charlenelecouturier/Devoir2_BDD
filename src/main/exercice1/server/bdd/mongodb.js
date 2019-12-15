var mongo = require("mongoose");

function start() {
    mongo.set('useCreateIndex', true);
    var db = mongo.connect("mongodb://localhost:27017/DB", { useNewUrlParser: true, useUnifiedTopology: true }, function (err, response) {
        if (err) { console.log(err); }
        else { console.log('connected to DB'); }
    });

    var Schema = mongo.Schema;
    var MonstersSchema = new Schema({
        spells: { type: String },
        monsters: { type: Array }
    }, { versionKey: false });

    var SpellsSchema = new Schema({
        name: { type: String },
        class: { type: Array },
        level: { type: Number },
        components: { type: Array },
        spellres: { type: String },
        description: { type: String, index: 'text' }
    }, { versionKey: false })/* .index({description:'text'}) */;

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
    var query = new Object;
    if (mots != null) {
        query.$text = { $search: mots }
    }
    if (level != null) {
        query.level = { $lte: level }
    }
    if (component[0] != undefined) {
        query.components = { $all: component }
    }
    if (classe[0] != undefined) {
        query.class = { $all: classe }
    }
    console.log(query)
    model.spell.find(query,
        function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
            //console.log(data)
        });
}

function getSpellDef(req, res, model) {
    var result = new Object;
    var spellName;
    console.log(req.body)
    if (req.body.spellName.match(/,/g)) {
        var spellName = req.body.spellName.split(",")[0]
        /* var particle = req.body.spellName.split(",")[1]
        if(particle.match(/Mythic/g)) particle = Mythic
        switch (particle) {
            case Greater:
                break;
            case Lesser:    
                break;
            case Mass:
                break;
            case Mythic:
                break;
        } */
        console.log(spellName)
    } else {
        spellName = req.body.spellName;
    }

    model.spell.find({ name: req.body.spellName },
        (err, data) => {
            if (err) {
                /* res.send(err); */
                console.log(err)
            } else {
                result.spell = data[0]

                model.monster.find({ spells: { '$regex': '^' + spellName + '$', $options: 'i' } },
                    (err, data2) => {
                        if (err) {
                            /* res.send(err); */
                            console.log(err)
                        } else {

                            if (data2[0] != undefined) result.monsters = data2[0].monsters;

                            console.log(result)

                            res.send(result);
                        }
                    });
                //res.send(data);
            }
        });
}

module.exports = {
    start,
    getMonster,
    getSpells,
    getSpellDef
}