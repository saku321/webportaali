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
    const [tapahtumaData, setTapahtumaData] = useState([]);
    const [mainoksetHaettu, setMainoksetHaettu] = useState(false);
    const [tapahtumatHaettu, setTapahtumatHaettu] = useState(false);

    const HaeMainokset = () => {
        axios.post('http://localhost:3001/haeKaikkiMainokset', {
            
        }).then((res) => {

            setData(res.data);
            setMainoksetHaettu(true);
        }).catch((err) => {
            console.log(err);
        });


    }

    const HaeTapahtuma = () => {


        axios.post('http://localhost:3001/haeKaikkiTapahtumat', {
        }).then((res) => {

            setTapahtumaData(res.data);
            setTapahtumatHaettu(true);
        }).catch((err) => {
            console.log(err);
        });


    }

    if (!mainoksetHaettu) {
        HaeMainokset();
    }
    if (!tapahtumatHaettu) {
        HaeTapahtuma();
    }
    return (
        <div id="etusivuDiv">

            <section>
                <div id="mainosShow">
                    <div id="pcImgSlider">
                    <SimpleImageSlider
                        
                            width={1150}
                            height={604}
                        images={images}
                        showBullets={false}
                        showNavs={true}
                            autoPlay={true}
                            style={{margin:"auto"}}
                        autoPlayDelay={8}
                    />
                    </div>
                    <div id="phoneImgSlider">
                        <SimpleImageSlider

                            width={"100%"}
                            height={"600px"}
                            images={images}
                            showBullets={false}
                            showNavs={true}
                            autoPlay={true}
                            autoPlayDelay={8}
                        />
                        </div>
                </div>
                <div id="tapahtumaKortit">
                    <h1 id="tapahtumatH1">Tapahtumat</h1>
                    <div id="bottomLine1"></div>
                <ul>
                        {/*Tapahtumien laatikot*/}
                        {tapahtumaData.map(tapahtumat =>
                            <li key={tapahtumat.id}>

                                    <img src={tapahtumat.KuvaUrl} alt="mainosKuva" />

                                    <h1>{tapahtumat.Otsikko}</h1>
                                    <p>{tapahtumat.Kuvaus}</p>
      
                            </li>
                        )}



                    
                    </ul>
                </div>
            </section>
            <section>
                <div id="mainosDiv">
                    <h1 id="">Mainokset</h1>
                    <div id="bottomLine2"></div>
                    {/*Mainoksien laatikot*/}
                    <ul>
                        {resData === "" && (
                            <p>Ei mainoksia!</p>
                        )}
                        {resData.map(resData =>
                            <li key={resData.id}>

                                <div className="rightImg">

                                    <img src={resData.KuvaUrl} alt="mainosKuva" />

                                </div>
                                <div className="leftText">
                                    <h1>{resData.Otsikko}</h1>
                                    <p>{resData.Kuvaus}</p>
                                    <a href={"https://" + resData.SivunUrl} target="_blank" rel="noopener noreferrer">{resData.SivunUrl}</a>
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