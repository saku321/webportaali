import './Main.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
/*menut*/
import Menu from './Menu/Menu.jsx';
import Navbar from './Menu/navbar.jsx'

/*sivut*/
import Etusivu from './Pages/Etusivu.jsx';
import Registerpage from './Pages/Register/register.jsx';

function Main() {
    return (
      
 
    
      
        <div id='mainDiv'>
            <Router>
            <Navbar />
            <Menu />
          
            
                
                <Routes>
                    <Route path='/' exact element={<Etusivu />} />
                        <Route path="/kirjaudu" element={<Registerpage />} />
                        <Route path="/register" element={<Registerpage />} />
                    </Routes>
                </Router>
       
            
            </div>
     
    );
}






export default Main;