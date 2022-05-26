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
    const [isAdmin, setAdmin] = useState(false);
    const [isEditor, setEditor] = useState(false);
    const [kirjautunut, setKirjautunut] = useState(false);
    const checkLogin = () => {
        const hasRoleAdmin = Userfront.user.hasRole("admin");
        const hasRoleEditor = Userfront.user.hasRole("editor");
        //onko kirjautunut

        if (Userfront.user.username === undefined) {
            if (kirjautunut) {
                setKirjautunut(false);
            }

        } else {
            if (!kirjautunut) {
                setKirjautunut(true);
            }
        }
        //onko admin rooli
        if (!hasRoleAdmin) {

            if (isAdmin === true) {
                setAdmin(false);
                
            }

           
        } else {
            if (isAdmin === false) {
                setAdmin(true);
            }
        }
        if (!hasRoleEditor) {

            if (isEditor === true) {
                setEditor(false);

            }

        } else {
            if (isEditor === false) {
                setEditor(true);

            }
        }
        
        
    }
   
    checkLogin();

    const logout = () => {

      
        Userfront.logout();
        checkLogin();
        
    }
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
                        <li><p>Tervetuloa: {Userfront.user.username}</p></li>
                      
                        {isAdmin || isEditor ? (
                          

                                <li><Link to="/dashboard"><Button color="neutral" variant="outlined">Hallintapaneeli</Button></Link></li>



                            
                        ) : null}
                        <li><Button color="neutral" variant="outlined" onClick={logout}>Kirjaudu ulos</Button></li>

                    </ul>
                )}

                
               
            </ThemeProvider>

        </div>
    );
}
export default Navbar;