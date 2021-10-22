const path = require('path')

const express = require('express')
const app = express()

const numerologie = require('./back/numerologie');
const db = require("./db")

const hostname = '127.0.0.1';
const port = 3000;

app.use(function (req, res, next) {
    date = new Date(Date.now())
    console.log('Time:', date.toLocaleDateString(), date.toLocaleTimeString(), "; url :", req.url);
    next(); // sans cette ligne on ne pourra pas poursuivre.
})

app.use("/static", express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
    res.redirect(301, '/static/index.html')
})

app.get(encodeURI('/prénom'), (req, res) => {
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

app.get('/api/prenoms/read', (req, res) => {
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

app.use(function (req, res) {
    console.log("et c'est le 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("<html><head><title>la quatre cent quatre</title></head><body><h1>Et c'est la 404.</h1><img  src=\"https://www.leblogauto.com/wp-content/uploads/2020/04/Peugeot-404-1.jpg\" /></body></html>");

})

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);