import React, { useState } from "react";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import logo from '../img/multiaLogo.png';

import Userfront from "@userfront/core";
Userfront.init("5nxg7gvb");


/*Lisää nappeihin oikean värin*/
const theme = createTheme({

    palette: {

        neutral: {
            main: '#36918E',
            contrastText: '#fff',
        },
    },
});

const Navbar = () => {
    const [kirjautunut, setKirjautunut] = useState(false);
    const checkLogin = () => {
        
        if (Userfront.user.username == undefined) {
            if (kirjautunut == true) {
                setKirjautunut(false);
            }

           
        } else {
            if (kirjautunut == false) {
                setKirjautunut(true);
            }
        }
        
    }
   
    checkLogin();
    return (
        <div id='headerDiv'>
            <img alt="logo" src={logo} />

           
    
           
            <ThemeProvider theme={theme}>
                {!kirjautunut && (
                <ul>
                    
                        <li><Link to="/kirjaudu"><Button color="neutral" variant="outlined">Kirjaudu</Button></Link></li>
                         <li> <Link to="/register"><Button color="neutral" variant="outlined"> Rekisteröidy </Button></Link></li>
                      

                    
                    </ul>
                )}
                {kirjautunut && (
                    <ul>

                        <li><Link to="/dashboard"><Button color="neutral" variant="outlined">Hallintapaneeli</Button></Link></li>
                        <li><Button color="neutral" variant="outlined" onClick={() => { Userfront.logout() }}>Kirjaudu ulos</Button></li>
                        
                        

                        </ul>
                )}
                

            </ThemeProvider>

        </div>
    );
}
export default Navbar;