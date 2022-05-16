import React, { useState } from "react";
import './Etusivu.css';
/*kuvat*/
import maisema from '../img/kuvia_Multia/maisema.jpg';
import kalevantuli from '../img/kuvia_Multia/kalevantuli.jpg';
import markkinat from '../img/kuvia_Multia/markkinat.jpg';
import melojat from '../img/kuvia_Multia/melojat.jpg';
import korjuu from '../img/kuvia_Multia/herkukankorjuu.jpg';
import rakentaja from '../img/kuvia_Multia/rakentaja.jpg';
import hitsari from '../img/kuvia_Multia/hitsari.jpg';
import lapset from '../img/kuvia_Multia/lapset.jpg';
import lapset_vesi from '../img/kuvia_Multia/lapset_vesi.jpg';
import axios from 'axios';
import Userfront from "@userfront/react";

import SimpleImageSlider from "react-simple-image-slider";
const images = [
    { url: kalevantuli },
    { url: markkinat },
    { url: melojat },
    { url: korjuu },
    { url: maisema },
 
 
];


const Etusivu = () => {

    const [resData, setData] = useState([]);
    const [mainoksetHaettu, setMainoksetHaettu] = useState(false);
    const HaeMainokset = () => {
        axios.post('http://localhost:3001/haeKaikkiMainokset', {
            
        }).then((res) => {

            setData(res.data);
            setMainoksetHaettu(true);
        }).catch((err) => {
            console.log(err);
        });


    }
    if (!mainoksetHaettu) {
        HaeMainokset();
    }
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
                        style={{ margin: "auto" }}
                        autoPlayDelay={5}
                    />

                </div>
                <div id="tapahtumaKortit">
                    <h1 id="tapahtumatH1">Tapahtumat</h1>
                    <div id="bottomLine1"></div>
                <ul>
                        {/*Tapahtumien laatikot*/}
                        <li>
                            <img src={markkinat} alt="tapahtumankuva" />
                        <h1>Esimerkki markkinat</h1>
                        <p>Esimerkki tapahtumasta</p>

                        </li>

                        <li>
                            <img src={melojat} alt="tapahtumankuva" />
                        <h1>Esimerkki tapahtuma 2</h1>
                        <p>Esimerkki tapahtumasta</p>

                        </li>

                        <li>
                            <img src={lapset} alt="tapahtumankuva" />
                        <h1>Esimerkki tapahtuma 3</h1>
                        <p>Esimerkki tapahtumasta 3</p>

                        </li>
                        <li>
                            <img src={lapset_vesi} alt="tapahtumankuva" />
                        <h1>Esimerkki tapahtuma 4</h1>
                        <p>Esimerkki tapahtumasta 4</p>

                    </li> 
                    </ul>
                </div>
            </section>
            <section>
                <div id="mainosDiv">
                    <h1 id="">Mainokset</h1>
                    <div id="bottomLine2"></div>
                    {/*Mainoksien laatikot*/}
                    <ul>
                        {resData.map(resData =>
                            <li key={resData.id}>

                                <div className="rightImg">

                                    <img src={resData.KuvaUrl} alt="mainosKuva" />

                                </div>
                                <div className="leftText">
                                    <h1>{resData.Otsikko}</h1>
                                    <p>{resData.Kuvaus}</p>
                                    <a href={"https://" + resData.SivunUrl} target="_blank">{resData.SivunUrl}</a>
                                    <p className="yhteystiedot">{resData.Yhteystiedot}</p>
                                </div>

                            </li>
                        )}
                    </ul>
               
                    
                </div>
            </section>
            
        </div>
        )
}
export default Etusivu;