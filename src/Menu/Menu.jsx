import './Menu.css';
import React from "react";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";

/*Lisää nappeihin oikean värin*/ 
const theme = createTheme({
   
    palette: {
       
        neutral: {
            main: '#36918E',
            contrastText: '#fff',
        },
    },
});





function Menu() {
    

    return (
        <div>
       

        <div id='menuDiv'>
                <ul id='menuUl'>

                    <li><Link to="/">Etusivu</Link></li>
                    
                    <li id="palvelut">
                        <a href="#">Palvelut</a>
                            <div className="dropDown" id="palvelutDropDown">
                                <ul>
                                <li><Link to="/yritykset">Yritykset</Link></li>
                                <li><Link to="/">Työsuoritukset</Link></li>
                                <li><Link to="/">Suoramyynti</Link></li>
                                <li><Link to="/">Muut</Link></li>
                                </ul>
                            </div>
                    </li>

                    <li id="asuminen">
                        <a href="#">Asuminen</a>
                        <div className="dropDown" id="asuminenDropDown">
                            <ul>
                                <li><Link to="/tontit">Tontit</Link></li>

                                <li><Link to="/">Myytävät asunnot</Link></li>
                                <li><Link to="/">Vuokrattavat asunnot</Link></li>
                                <li><Link to="/">Vapaa-ajan asunnot</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li id="harrastukset">
                        <a href="#">Harrastukset</a>
                        <div className="dropDown" id="harrastuksetDropDown">
                            <ul>
                                <li><Link to="/">Yhdistykset</Link></li>
                               
                                <li><Link to="/">Vapaa-aika</Link></li>
                                <li><Link to="/">Ladut</Link></li>
                                <li><Link to="/">Kalastus</Link></li>
                                <li><Link to="/">Tapahtumat</Link></li>
                            </ul>
                        </div>
                    </li>
                   
                </ul>
            </div>
         
        </div>
        );
}
export default Menu;