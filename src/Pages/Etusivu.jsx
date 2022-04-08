import React from "react";
import './Etusivu.css';
import  maisema  from '../img/kuvia_Multia/maisema.jpg';
const Etusivu = () => {
    return (
        <div id="etusivuDiv">

            <h1>Tervetuloa Multian web-portaaliin</h1>
            <img src={maisema} alt="Maisemakuva"/>
        </div>
        )
}
export default Etusivu;