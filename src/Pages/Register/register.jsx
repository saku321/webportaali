import React ,{ useState }from "react";
import './register.css';
import Button from '@mui/material/Button';
import icon from '../../img/add-user.png';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Userfront from "@userfront/core";
Userfront.init("demo1234");
const Registerpage = () => {
    const [kayttaja, setKayttaja] = useState("");
    const [passu, setPassu] = useState("");
    const [kirjautunutStatus, setKirjautunutStatus] = useState("");

    const changeKayttaja = (e) => {
        setKayttaja(e.target.value);
    }
    const changePassu = (e) => {
        setPassu(e.target.value);
    }

    const submitData = (e) => {
        e.preventDefault();
        Userfront.signup({
            method: "password",
            email:"email@gmail.com",
            password: passu,
            data: {
                accountName: kayttaja,
            },
        });
    }
    const inputComponents = {
        pattern: "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-öA-Ö0-9!@#$%^&*]{8,}$",
        title: "Salasanan täytyy olla vähintään 8merkkiä pitkä, sekä salasanassa täytyy olla vähintään yksi isokirjain, vähintään yksi numero ja yksi erikoismerkki!",

    };
    return (
        <div id="registerDiv">
            <form >
                <img src={icon} alt="icon"/>

                <TextField onChange={changeKayttaja} type="text" label="Käyttäjänimi" autoComplete="off" id="userName" name="userName" fullWidth />
                <TextField inputProps={inputComponents} onChange={changePassu} fullWidth label="Salasana" type="password" id="passWrd" name="passWrd" autoComplete="off" />

                <div id="kirjautumisAlert"><h1 >{kirjautunutStatus}</h1></div>

                <p><b>Huom!</b> <br />Salasanan täytyy olla vähintään 8 merkkiä pitkä, sekä siinä täytyy olla vähintään yksi isokirjain, vähintään yksi numero ja yksi erikoismerkki!</p>
                <Button
                    type="submit"
                    id="registerButton"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={submitData}
                >
                    Rekisteröidy
                </Button>
                <a href="#">Onko sinulla jo käyttäjä?</a>

                </form>
            </div>
        )
}
export default Registerpage;