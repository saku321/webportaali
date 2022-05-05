import React, { useState } from "react";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './kirjautuminen.css';

const Kirjautuminen=()=>{
    const [kayttaja, setKayttaja] = useState("");
    const [salis, setSalis] = useState("");


    const inputKayttaja = (e) => {
        setKayttaja(e.target.value);
    }
    const inputSalis = (e) => {
        setSalis(e.target.value);
    }
    const submitLoginData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', {
            username: kayttaja,
            password: salis,
        })
            .then((response) => {
                console.log(response.data.message);

            })
            .catch(error => {
                console.log(error.response)
            });
    }

    return (
        <div>
            <div id="loginDiv">
                <form>
                    <TextField onChange={inputKayttaja} type="text" label="Käyttäjänimi" autoComplete="off" id="userName" name="userName" fullWidth />
                    <TextField onChange={inputSalis} fullWidth label="Salasana" type="password" id="passWrd" name="passWrd" autoComplete="off" />
                    <Button
                        type="submit"
                        id="loginButton"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={submitLoginData}
                    >
                        Kirjaudu
                    </Button>
                </form>
            </div>
        </div>
        );
}
export default Kirjautuminen;