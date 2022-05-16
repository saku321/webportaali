const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
var multer = require('multer');
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

app.use(express.json());
app.use(cors());

const {
    CLOUD_NAME,
    API_KEY,
    API_SECRET
} = require('./config');


cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});


/*Mainoskuvien tallennus*/
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'mainoskuvat',
        allowedFormats: ['jpg', 'png']
    }
});

const parser = multer({ storage: storage });

app.post('/tallennaKuva', parser.single("file"), (req, res) => {
    const imageUUID = req.file.KuvaId;

    //Code to store imageUUID in your database

    res.json(imageUUID); // Return the UUID to the front end like this if necessary
});
/*Mainosten luonti databaseen ja poistamiset*/

const database = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "multianDatabase",
});
app.post("/luoMainos", (req, res) => {

    const otsikko = req.body.otsikko;
    const kuvaus = req.body.kuvaus;
    const kuvaUrl = req.body.kuva;
    const sivunLinkki = req.body.linkki;

    const haltija = req.body.haltija;
    const yhteystiedot = req.body.yhteystiedot;
  
  

    const createTable = "CREATE TABLE IF NOT EXISTS Mainokset ( id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, Otsikko VARCHAR(255) NOT NULL, Kuvaus VARCHAR(255) NOT NULL,  KuvaUrl VARCHAR(255) , SivunUrl VARCHAR(255), Haltija VARCHAR(255) NOT NULL,Yhteystiedot VARCHAR(255) NOT NULL, reg_date TIMESTAMP )";
    database.query(createTable, (err, result) => {
                console.log(err);

                //lis�t��n tiedot tietokantaan

        const insertData = "INSERT INTO Mainokset (Otsikko,Kuvaus,KuvaUrl,SivunUrl,Haltija,Yhteystiedot) VALUES (?,?,?,?,?,?)";
        database.query(insertData, [otsikko, kuvaus, kuvaUrl, sivunLinkki, haltija, yhteystiedot], (err, result) => {
                    console.log(err);
                    res.send({ message: "Mainos luotu!" });
                });

    });
         
 });

app.post("/julkaiseMainos", (req, res) => {

    const otsikko = req.body.otsikko;
    const kuvaus = req.body.kuvaus;
    const kuvaUrl = req.body.kuva;
    const sivunLinkki = req.body.linkki;
    const id = req.body.id;
    const yhteystiedot = req.body.yhteystiedot;


  

        const insertData = "INSERT INTO EtuSivunMainokset (Otsikko,Kuvaus,KuvaUrl,SivunUrl,Yhteystiedot,MainoksenId) VALUES (?,?,?,?,?,?)";
        database.query(insertData, [otsikko, kuvaus, kuvaUrl, sivunLinkki, yhteystiedot,id], (err, result) => {
            console.log(err);
            res.send({ message: "Mainos Julkaistu!" });

    });

});



app.post("/haeMainos", (req, res) => {

    const haltija = req.body.haltija;

    database.query("SELECT * FROM Mainokset WHERE Haltija='" + haltija +"' ORDER BY reg_date DESC", (err, result) => {

        if (result) {
            res.send(result);
        } else {
            res.send({ message: err });
        }
    });


});

app.post("/haeKaikkiMainokset", (req, res) => {

    database.query("SELECT * FROM EtuSivunMainokset", (err, result) => {

        if (result) {
            res.send(result);
        } else {
            res.send({ message: err });
        }
    });


});

app.post("/poistaMainos", (req, res) => {

    const id = req.body.id;
    const haltija = req.body.haltija;
    database.query("DELETE FROM Mainokset WHERE Haltija='" + haltija+"' AND id="+id, (err, result) => {

        if (result) {
            res.send({ message:"Mainos poistettu!" });
        } else {
            res.send({ message: err });
        }
    });
   

});
app.post("/poistaEtusivunMainos", (req, res) => {
    const id = req.body.id;
    const haltija = req.body.haltija;
    database.query("DELETE FROM EtuSivunMainokset WHERE MainoksenId='" + id + "'", (err, result) => {

        if (result) {
            res.send({ message: "Mainos poistettu!" });
        } else {
            res.send({ message: err });
        }
    });

   

});


app.listen(3001, () => {
    console.log("serverrunning");
})
/*const lause = "INSERT INTO " + username + "(Kayttaja,salasana) VALUES (?,?)";
            database.query(lause, [username, password], (err, result) => {
                console.log(err);
            });*/