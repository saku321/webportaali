const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(cors());

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
  
  

    const createTable = "CREATE TABLE IF NOT EXISTS Mainokset ( id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, Otsikko VARCHAR(255) NOT NULL, Kuvaus VARCHAR(255) NOT NULL,  KuvaUrl VARCHAR(255) , SivunUrl VARCHAR(255), Haltija VARCHAR(255) NOT NULL, reg_date TIMESTAMP )";
    database.query(createTable, (err, result) => {
                console.log(err);

                //lisätään tiedot tietokantaan

                const insertData = "INSERT INTO Mainokset (Otsikko,Kuvaus,KuvaUrl,SivunUrl,Haltija) VALUES (?,?,?,?,?)";
                database.query(insertData, [otsikko, kuvaus,kuvaUrl,sivunLinkki,haltija], (err, result) => {
                    console.log(err);
                    res.send({ message: "Meni läpi" });
                });

    });
         
 });



app.post("/haeMainos", (req, res) => {

    const haltija = req.body.haltija;

    database.query("SELECT * FROM Mainokset WHERE Haltija='" + haltija+"'", (err, result) => {

        if (result) {
            res.send(result);
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