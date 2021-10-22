let express = require('express');

const numerologie = require('../back/numerologie');
const db = require("../db");

const apiRoutes = require('./api');

let router = express.Router();

router.get(encodeURI('/prénom'), (req, res) => {
    console.log(req.query)
    prenom = req.query["valeur"]
    chiffre = numerologie.chiffre(prenom)
    db.model.Prenoms.findOne({
        where: {
            prenom: prenom
        }
    }).then((data) => {
        if (data === null) {
            db.model.Prenoms.create({
                prenom: prenom
            })
        }
        console.log(data)
    })
    db.model.Signification.findOne({
        where: {
            nombre: chiffre
        }
    }).then((data) => {
        res.json({
            prénom: prenom,
            chiffre: chiffre,
            message: data.message
        })
    })
})

router.use('/api', apiRoutes)


module.exports = router