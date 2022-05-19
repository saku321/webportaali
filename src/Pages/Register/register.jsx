import React ,{ useState }from "react";
import './register.css';
import Button from '@mui/material/Button';
import icon from '../../img/add-user.png';

import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Userfront from "@userfront/react";


Userfront.init("5nxg7gvb");

const Registerpage = () => {
    const [kayttaja, setKayttaja] = useState("");
    const [salis, setSalis] = useState("");
    const [sahkoposti, setEmail] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const inputKayttaja = (e) => {
        setKayttaja(e.target.value);
    }
    const inputSalis = (e) => {
        setSalis(e.target.value);
    }
    const inputEmail = (e) => {
        setEmail(e.target.value);
    }

    
    const kirjaudu = (e) => {
        e.preventDefault();
        Userfront.signup({
            method: "password",
            email: sahkoposti,
            password: salis,
            username: kayttaja,
            redirect: "/webportaali"
           
        }).catch((error)=>{
            document.getElementById("regAlert").style.display = "flex";
            console.log(error.message);
            if (error.message === "Email format is invalid") {
                setAlertMsg("Sähköpostisi on väärin!");
            } else if (error.message === "Password must be at least 16 characters OR at least 8 characters including a number and a letter") {
                setAlertMsg("Tarkista salasana!");
            } else if (error.message === "Username must consist of letters, numbers, hyphens, or underscores") {
                setAlertMsg("Käyttäjä nimessä ei saa olla ääkkösiä!");
            }
            else if (error.message === "Username must be between 3-100 characters, Validation is on username failed") {
                setAlertMsg("Käyttäjä nimi pitää olla vähintään 3 merkkiä pitkä");
            }
            else if (error.message === "Username must be between 3-100 characters") {
                setAlertMsg("Käyttäjä nimi pitää olla vähintään 3 merkkiä pitkä");
            }
            else if (error.message === '"email" is not allowed to be empty') {
                setAlertMsg("Email kenttä ei voi olla tyhjä!");
            }
            else if (error.message === '"password" is not allowed to be empty') {
                setAlertMsg("Salasana kenttä ei voi olla tyhjä!");
            }
              
        });
    }
    return (
        <div id="registerDiv">
            <form>
                <img src={icon} alt="icon" />

                <TextField onChange={inputKayttaja} label="Käyttäjänimi" variant="outlined" fullWidth autoComplete="off"/>
                <TextField onChange={inputSalis} label="Salasana" variant="outlined" fullWidth type="password" autoComplete="off"/>
                <TextField onChange={inputEmail} label="Email" variant="outlined" fullWidth type="email" autoComplete="off" />
                <p><b>Huom!</b><br></br>
                    Salasanan täytyy olla vähintään 8 merkkiä pitkä ja sisältää vähintään yhden numeron!</p>
                <Alert id="regAlert" severity="error">{alertMsg}</Alert>
                <Button variant="contained" onClick={kirjaudu}>Rekisteröidy</Button>
                </form>
            </div>
        )
}
export default Registerpage;