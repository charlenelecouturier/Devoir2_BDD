const mongodb = require('../bdd/mongodb')

module.exports = function (express, model) {
    router = express.Router();

    /**
     * Search monster 
     */
    router.get("/api/getMonster", (req, res) => {
        mongodb.getMonster(req, res, model.monster)
    })

    router.post("/api/Search", (req, res) => {
        mongodb.getSpells(req, res, model)
    })

    return router
}