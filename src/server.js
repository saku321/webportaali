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

                //lisätään tiedot tietokantaan

        const insertData = "INSERT INTO Mainokset (Otsikko,Kuvaus,KuvaUrl,SivunUrl,Haltija,Yhteystiedot) VALUES (?,?,?,?,?,?)";
        database.query(insertData, [otsikko, kuvaus, kuvaUrl, sivunLinkki, haltija, yhteystiedot], (err, result) => {
                    console.log(err);
                    res.send({ message: "Mainos on luotu, Muista julkaista mainoksesi" });
                });

    });
         
 });

app.post("/julkaiseMainos", (req, res) => {

    const id = req.body.id;
    const otsikko = req.body.otsikko;
    const kuvaus = req.body.kuvaus;
    const kuvaUrl = req.body.kuva;
    const sivunLinkki = req.body.linkki;
    const yhteystiedot = req.body.yhteystiedot;


    const julkaiseMainos = "CREATE TABLE IF NOT EXISTS EtuSivunMainokset ( id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, Otsikko VARCHAR(255) NOT NULL, Kuvaus VARCHAR(255) NOT NULL,  KuvaUrl VARCHAR(255) , SivunUrl VARCHAR(255), Yhteystiedot VARCHAR(255) NOT NULL, MainoksenId VARCHAR(255) NOT NULL, reg_date TIMESTAMP )";
    database.query(julkaiseMainos, (err, result) => {
        console.log(err);

    });

    //tarkistetaan onko tapahtuma jo julkaistu
    const checkMainos = "SELECT * FROM EtuSivunMainokset WHERE Otsikko='" + otsikko + "' AND Kuvaus='" + kuvaus + "' AND KuvaUrl='" + kuvaUrl + "' AND MainoksenId='" + id + "'";
    database.query(checkMainos, (err, result) => {
        if (result.length > 0) {
            res.send({ message: "Mainos on jo julkaistu!" });
        }
        //jos tapahtumaa ei ole julkaistu julkaissaan
        else {

            const insertData = "INSERT INTO EtuSivunMainokset (Otsikko,Kuvaus,KuvaUrl,SivunUrl,Yhteystiedot,MainoksenId) VALUES (?,?,?,?,?,?)";

            database.query(insertData, [otsikko, kuvaus, kuvaUrl, sivunLinkki, yhteystiedot, id], (err, result) => {
                if (result) {
                    res.send({ message: "Mainos Julkaistu!" });
                } else {
                    res.send({ message: "Jotain meni pieleen!" });
                }
            });

        }

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


//tapahtumien luonti

app.post("/luoTapahtuma", (req, res) => {

    const otsikko = req.body.otsikko;
    const kuvaus = req.body.kuvaus;
    const kuvaUrl = req.body.kuva;


    const haltija = req.body.haltija;




    const createTable = "CREATE TABLE IF NOT EXISTS Tapahtumat ( id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, Otsikko VARCHAR(255) NOT NULL, Kuvaus VARCHAR(255) NOT NULL,  KuvaUrl VARCHAR(255), Haltija VARCHAR(255) NOT NULL, reg_date TIMESTAMP )";
    database.query(createTable, (err, result) => {
        console.log(err);

        //lisätään tiedot tietokantaan

        const insertData = "INSERT INTO Tapahtumat (Otsikko,Kuvaus,KuvaUrl,Haltija) VALUES (?,?,?,?)";
        database.query(insertData, [otsikko, kuvaus, kuvaUrl, haltija], (err, result) => {
            console.log(err);
            res.send({ message: "Tapahtuma luotu!" });
        });

    });


});

app.post("/julkaiseTapahtuma", (req, res) => {

    const id = req.body.id;
    const otsikko = req.body.otsikko;
    const kuvaus = req.body.kuvaus;
    const kuvaUrl = req.body.kuva;

    //jos taulua ei löydy luodaan se
    const createTable = "CREATE TABLE IF NOT EXISTS EtuSivunTapahtumat ( id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, Otsikko VARCHAR(255) NOT NULL, Kuvaus VARCHAR(255) NOT NULL,  KuvaUrl VARCHAR(255), MainoksenId VARCHAR(255) NOT NULL, reg_date TIMESTAMP )";
    database.query(createTable, (err, result) => {
        console.log(err);

    });
    //tarkistetaan onko tapahtuma jo julkaistu
    const checkTapahtuma = "SELECT * FROM EtuSivunTapahtumat WHERE Otsikko='" + otsikko + "' AND Kuvaus='" + kuvaus + "' AND KuvaUrl='" + kuvaUrl + "' AND MainoksenId='" + id + "'";
    database.query(checkTapahtuma, (err, result) => {
        if (result.length > 0) {
            res.send({ message: "Tapahtuma on jo julkaistu!" });
        }
        //jos tapahtumaa ei ole julkaistu julkaissaan
        else {

            const insertData = "INSERT INTO EtuSivunTapahtumat (Otsikko,Kuvaus,KuvaUrl,MainoksenId) VALUES (?,?,?,?) ";
            database.query(insertData, [otsikko, kuvaus, kuvaUrl, id], (err, result) => {
                if (result) {
                    res.send({ message: "Tapahtuma Julkaistu!" });
                } else {
                    res.send({ message: "Jotain meni pieleen!" });
                }
            });

        }

    });

});

app.post("/haeTapahtumat", (req, res) => {

    const haltija = req.body.haltija;

    database.query("SELECT * FROM Tapahtumat WHERE Haltija='" + haltija + "' ORDER BY reg_date DESC", (err, result) => {

        if (result) {
            res.send(result);
        } else {
            res.send({ message: err });
        }
    });


});

app.post("/poistaTapahtuma", (req, res) => {

    const id = req.body.id;
    const haltija = req.body.haltija;
    database.query("DELETE FROM Tapahtumat WHERE Haltija='" + haltija + "' AND id=" + id, (err, result) => {

        if (result) {
            res.send({ message: "Mainos poistettu!" });
        } else {
            res.send({ message: err });
        }
    });


});
app.post("/poistaEtusivunTapahtuma", (req, res) => {
    const id = req.body.id;
    database.query("DELETE FROM EtuSivunTapahtumat WHERE MainoksenId='" + id + "'", (err, result) => {

        if (result) {
            res.send({ message: "Tapahtuma poistettu!" });
        } else {
            res.send({ message: err });
        }
    });



});


app.post("/haeKaikkiTapahtumat", (req, res) => {

    database.query("SELECT * FROM EtuSivunTapahtumat", (err, result) => {

        if (result) {
            res.send(result);
        } else {
            res.send({ message: err });
        }
    });


});

app.post("/muokkaaTapahtumaa", (req, res) => {

    const id = req.body.id;
    const otsikko = req.body.otsikko;
    const kuvaus = req.body.kuvaus;
    const kuvaUrl = req.body.kuva;
    
    //Päivitä tiedot tapahtumat tableen
    const edit = "UPDATE Tapahtumat SET Otsikko='"+otsikko+"', Kuvaus='"+kuvaus+"', KuvaUrl='"+kuvaUrl+"' WHERE id="+id;
    database.query(edit, (err, result) => {
        const editEtuSivunTapahtuma = "UPDATE EtuSivunTapahtumat SET Otsikko='" + otsikko + "', Kuvaus='" + kuvaus + "', KuvaUrl='" + kuvaUrl + "' WHERE MainoksenId=" + id;
        database.query(editEtuSivunTapahtuma, (err, result) => {
            if (err) {
                res.send({ message: "Jotain meni pieleen!" });
            }
        });

        if (result) {
            res.send({ message: "Tapahtuman muokkaus onnistui!" });
        }
        else {
            res.send({ message: "Jotain meni pieleen!" });
        }
    });

   

});
app.post("/muokkaaMainosta", (req, res) => {

    const id = req.body.id;
    const otsikko = req.body.otsikko;
    const kuvaus = req.body.kuvaus;
    const kuvaUrl = req.body.kuva;
    const sivunUrl = req.body.sivuUrl;
    const yhteysTiedot = req.body.yhteystiedot;


    

    const edit = "UPDATE Mainokset SET Otsikko='" + otsikko + "', Kuvaus='" + kuvaus + "', KuvaUrl='" + kuvaUrl + "',SivunUrl='" + sivunUrl + "',Yhteystiedot='" + yhteysTiedot + "' WHERE id=" + id;
    database.query(edit, (err, result) => {

        const editEtuSivunMainos = "UPDATE EtuSivunMainokset SET Otsikko = '" + otsikko + "', Kuvaus = '" + kuvaus + "', KuvaUrl = '" + kuvaUrl + "', SivunUrl = '" + sivunUrl + "', Yhteystiedot = '" + yhteysTiedot + "' WHERE MainoksenId = " + id;
        database.query(editEtuSivunMainos, (err, result) => {
            if (err) {
                res.send({ message: "Jotain meni pieleen!" });
            }
        });

        if (result) {
            res.send({ message: "Mainoksen muokkaus onnistui!" });
        }
        else {
            res.send({ message: "Jotain meni pieleen!" });
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