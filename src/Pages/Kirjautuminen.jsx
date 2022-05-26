import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import './kirjautuminen.css';
import Userfront from "@userfront/react";
Userfront.init("5nxg7gvb");

const Kirjautuminen=()=>{
    
    const [kayttaja, setKayttaja] = useState("");
    const [salis, setSalis] = useState("");

    const inputKayttaja = (e) => {
        setKayttaja(e.target.value);
    }
    const inputSalis = (e) => {
        setSalis(e.target.value);
    }
   
    const kirjaudu = (event) => {
        Userfront.login({
            method: "password",
            emailOrUsername: kayttaja,
            password: salis,
            redirect:"/webportaali"
        })
            .catch((error) => {
            document.getElementById("alert").style.display = "flex";
            console.log(error);
        });
    }
    return (
        <div>
            <div id="loginDiv">
                <form>
                    <h1>Kirjaudu sis&#228;&#228;n</h1>
                    <br></br>
                    <TextField onChange={inputKayttaja} label="K&#228;ytt&#228;j&#228;nimi" variant="outlined" fullWidth autoComplete="off" />
                    <br></br>
                    <br></br> 
                    <br></br>
                    <TextField onChange={inputSalis} label="Salasana" variant="outlined" fullWidth type="password" autoComplete="off" />
                    <br></br>
                    <br></br>
                    <Alert id="alert" severity="error">K&#228;ytt&#228;j&#228;nimi tai salasana ei ole oikein</Alert>
                    <br></br>
                    <Button variant="contained" onClick={kirjaudu}>Kirjaudu</Button>
           
                </form>

            </div>
        </div>
        );
}
export default Kirjautuminen;