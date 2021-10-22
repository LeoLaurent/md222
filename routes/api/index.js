let express = require('express');

const numerologie = require('../../back/numerologie')
const db = require("../../db")

let router = express.Router();

router.get('/prenoms/read', (req, res) => {
    db.model.Prenoms.findAll()
        .then((data) => {
            var liste = []
            for (element of data) {
                liste.push({
                    prenom: element.prenom,
                    chiffre: numerologie.chiffre(element.prenom)
                })
            }
            res.json(liste)
        })
})


module.exports = router
