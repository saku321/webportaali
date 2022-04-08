import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import logo from '../img/multiaLogo.png';

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
    return (
         <div id='headerDiv'>
                <img alt="logo" src={logo} />

              
       
            <ThemeProvider theme={theme}>
                <ul>
                    <Link to="/"></Link>
                    <li><Button color="neutral" variant="outlined"><Link to="/kirjaudu">Kirjaudu</Link></Button></li>
                    <li> <Button color="neutral" variant="outlined"> <Link to="/register">Rekisteröidy</Link> </Button></li>


                </ul>
            </ThemeProvider>
        </div>
    );
}
export default Navbar;