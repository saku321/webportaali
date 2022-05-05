import './Main.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
/*menut*/
import Menu from './Menu/Menu.jsx';
import Navbar from './Menu/navbar.jsx'

/*sivut*/
import Etusivu from './Pages/Etusivu.jsx';
import Registerpage from './Pages/Register/register.jsx';
import Yritykset from './Pages/Yritykset.jsx';
import Tontit from './Pages/Tontit.jsx';
import Kirjautuminen from './Pages/Kirjautuminen.jsx';
function Main() {
    
    return (
      
 
    
      
        <div id='mainDiv'>
            <Router>
            <Navbar />
            <Menu />
          
            
                
                <Routes>
                    <Route path='/' exact element={<Etusivu />} />
                    <Route path="/kirjaudu" element={<Kirjautuminen />} />
                        <Route path="/register" element={<Registerpage />} />
                        <Route path="/yritykset" element={<Yritykset />} />
                        <Route path="/tontit" element={<Tontit />} />
                    </Routes>
                </Router>
       
            
            </div>
     
    );
}






export default Main;