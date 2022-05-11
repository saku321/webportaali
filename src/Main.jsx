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

import {
    Navigate,
    useLocation
} from "react-router-dom";
import Userfront from "@userfront/react";
Userfront.init("5nxg7gvb");

function Dashboard() {
    return (
        <div>
          <p>dashboard</p>
          
        </div>
    );
}
function RequireAuth({ children }) {
    let location = useLocation();
    if (!Userfront.tokens.accessToken) {
        // Redirect to the /login page
        return <Navigate to="/kirjaudu" state={{ from: location }} replace />;
    }

    return children;
}
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
                    <Route path="/dashboard" element={
                        <RequireAuth>
                            <Dashboard />
                        </RequireAuth>
                    } />
                    </Routes>
                </Router>
       
            
            </div>
     
    );
}






export default Main;