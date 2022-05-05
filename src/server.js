const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(cors());

const database = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"multianDatabase",
});

app.post("/register", (req, res) => {

    const username = req.body.username;
    //hashataan salasana
    const password = bcrypt.hashSync(req.body.password, 10);

   

    const checkUserName = "SELECT Kayttaja FROM " + username;
    database.query(checkUserName, (err, result) => {
        //jos k�ytt�j�nime� ei l�ydy niin luodaan k�ytt�j�
  
        if (err) {
           
            const createTable = "CREATE TABLE IF NOT EXISTS "+username+"( id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, Kayttaja VARCHAR(255) NOT NULL, Salasana VARCHAR(255) NOT NULL, Admin BOOLEAN, reg_date TIMESTAMP )";
            database.query(createTable, (err, result) => {
                console.log(err);

                //lis�t��n tiedot tietokantaan

                const insertLause = "INSERT INTO " + username + "(Kayttaja,salasana) VALUES (?,?)";
                database.query(insertLause, [username, password], (err, result) => {
                    console.log(err);
                    res.send({ message: "Meni l�pi" });
                });
            });
        } if (result) {
            //jos k�ytt�j� on jo varattu
            res.send({message:"Kayttaja nimi on jo kaytossa!"});
        }
    });
    
});

app.post("/login", (req, res) => {
    const user = req.body.username;
    const passu = req.body.password;

    database.query("SELECT * FROM Test WHERE Salasana=" + passu,  (err, result) => {
        
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