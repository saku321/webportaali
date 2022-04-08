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

                    <li><a href="./RegisterPage.jsx" >Etusivu</a></li>
                    
                    <li id="palvelut">
                        <a href="#">Palvelut</a>
                            <div className="dropDown" id="palvelutDropDown">
                                <ul>
                                <li>sivu#1</li>
                                <li>sivu#2</li>
                                <li>sivu#3</li>
                                <li>sivu#4</li>
                                <li>sivu#5</li>
                                </ul>
                            </div>
                    </li>

                    <li id="yritykset">
                        <a href="#">Yritykset</a>
                        <div className="dropDown" id="yrityksetDropDown">
                            <ul>
                                <li>sivu#1</li>
                                <li>sivu#2</li>
                                <li>sivu#3</li>
                                <li>sivu#4</li>
                                <li>sivu#5</li>
                            </ul>
                        </div>
                    </li>
                    <li id="mainokset">
                        <a href="#">Mainokset</a>
                        <div className="dropDown" id="mainoksetDropDown">
                            <ul>
                                <li>sivu#1</li>
                                <li>sivu#2</li>
                                <li>sivu#3</li>
                                <li>sivu#4</li>
                                <li>sivu#5</li>
                            </ul>
                        </div>
                    </li>
                   
                </ul>
            </div>
         
        </div>
        );
}
export default Menu;