import React from "react";
import './yritykset.css';
const Yritykset = () => {
    return (
        <div id="yritysDiv">
            <h1 id="yritysHeader">Yritykset</h1>
            <div id="yrityksetBottomLine"></div>
            {/*Yritykset*/}
            <ul >
                <li className="yritysLi" >
                    <div id="kahvilaBackground"></div>
                    <h1>Kahvila Korsu</h1>
                    <p>Kahvila Multian keskustassa</p>
                    <iframe title="yrityksenSijainti" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1847.9559732673672!2d24.793488216254005!3d62.40828076746782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4685ec09bd54b625%3A0x7ac3563fc8544c09!2sKeskustie%2020%2C%2042600%20Multia!5e0!3m2!1sen!2sfi!4v1649831251488!5m2!1sen!2sfi" ></iframe>
                    <ul>
                        <li><a href="https://www.facebook.com/Kahvila-Korsu-414984005178787/" target="_blank" rel="noopener noreferrer"> Facebook</a></li>
                        
                      
                    </ul>
                </li>
                <li className="yritysLi">
                    <div id="sahaBackground"></div>

                    <h1>Multian Saha Oy</h1>
                    <p>Tarvitsetko rakennustavaraa? Ota yhteyttä meihin!</p>
                    <iframe title="yrityksenSijainti" src=" https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1847.746117586779!2d24.79922871625416!3d62.41168106718707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4685ebf671b2014d%3A0xd50de8e121f5b906!2sErimuksentie%208%2C%2042600%20Multia!5e0!3m2!1sen!2sfi!4v1650433121115!5m2!1sen!2sfi" ></iframe>
                    <ul>
                        <li>Facebook</li>
                        <li>Puh. 020747</li>

                    </ul>
                </li>
                <li className="yritysLi">
                    <div id="metsaBackground"></div>
                    <h1>Metsä-Multia Oy</h1>
                    <p>...</p>
                    <iframe title="yrityksenSijainti" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1847.7841726569889!2d24.81012641625415!3d62.41106446723801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4685ebf4dcc1afdf%3A0xa0e39293cee58747!2sKeskustie%2060%2C%2042600%20Multia!5e0!3m2!1sen!2sfi!4v1650433308603!5m2!1sen!2sfi" ></iframe>
                    <ul>
                        <li><a  href="www.metsa-multia.fi">www.metsa-multia.fi</a></li>
                        <li>Puh. 014 752 232</li>

                    </ul>
                </li>
                </ul>
            </div>
        );
}
export default Yritykset;