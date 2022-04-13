import React from "react";
import './Etusivu.css';
/*kuvat*/
import maisema from '../img/kuvia_Multia/maisema.jpg';
import kalevantuli from '../img/kuvia_Multia/kalevantuli.jpg';
import markkinat from '../img/kuvia_Multia/markkinat.jpg';
import melojat from '../img/kuvia_Multia/melojat.jpg';
import korjuu from '../img/kuvia_Multia/herkukankorjuu.jpg';

import SimpleImageSlider from "react-simple-image-slider";
const images = [
    { url: kalevantuli },
    { url: markkinat },
    { url: melojat },
    { url: korjuu },
    { url: maisema },
 
 
];


const Etusivu = () => {
    return (
        <div id="etusivuDiv">

            <section>
                <div id="mainosShow">

                    <SimpleImageSlider
                        
                        width={1050}
                        height={504}
                        images={images}
                        showBullets={false}
                        showNavs={true}
                        autoPlay={true}
                        style={{ margin:"auto"}}
                       
                    />

                </div>
                <div id="tapahtumaKortit">
                    <h1 id="tapahtumatH1">Tapahtumat</h1>
                    <div id="bottomLine1"></div>
                <ul>
                    
                        <li>
                            <img src={markkinat} alt="tapahtumankuva" />
                        <h1>Markkinat 3.7.2022</h1>
                        <p>Tule käymään Multian markkinoilla heinäkuussa</p>

                    </li> 
                    </ul>
                </div>
            </section>
            <section>
                <div id="textDiv">
                    <h1 id=""></h1>
                    <div id="rightDiv">
                        <ul>
                            <li>yritys#1</li>

                        </ul>
                        </div>

                </div>
            </section>
        </div>
        )
}
export default Etusivu;