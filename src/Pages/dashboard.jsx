import React, { useState } from "react";
import './dashboard.css';
import TextField from '@mui/material/TextField';
import Userfront from "@userfront/react";
import Button from '@mui/material/Button';
import axios from 'axios';
import lapset from '../img/kuvia_Multia/lapset.jpg';
function DashBoard() {
    const [otsikko, setOtsikko] = useState("");
    const [kuvaus, setKuvaus] = useState("");
    const [linkki, setLinkki] = useState("");
    const [kuvanLinkki, setKuvanlinkki] = useState("");

    const [lisaaMainosShow, setLisaaMainosShow] = useState(false);
    const [mainoksesiShow, setMainoksesiShow] = useState(false);

    const [resData, setData] = useState([]);
   



    const inputOtsikko = (e) => {
        setOtsikko(e.target.value);
    }
    const inputKuvaus = (e) => {
        setKuvaus(e.target.value);
    }
    const inputLinkki = (e) => {
        setLinkki(e.target.value);
    }


    const uploadImg = (e) => {
        if (e.target.files[0] !== undefined) {
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            document.getElementById("mainosKuva").style.display = "block";
            document.getElementById("mainosKuva").src = imgUrl;
            setKuvanlinkki(imgUrl);
        }


    }
    const luoMainos = () => {
        axios.post('http://localhost:3001/luoMainos', {
            otsikko: otsikko,
            kuvaus: kuvaus,
            linkki: linkki,
            kuva: kuvanLinkki,
            haltija: Userfront.user.username,
        }).then(function (res) {
            clearData();
        }).catch(function (err) {
            console.log(err);
        });
    };

    const HaeMainokset = () => {
        
        
        axios.post('http://localhost:3001/haeMainos', {
            haltija: Userfront.user.username,
        }).then(function (res) {
            
            setData(res.data);
        });
       
      
    }
    const clearData = () => {
        window.location.reload(false);
    }
  
 
    return (

        <div id="dashBoardDiv">
            <h1>Omat mainokset</h1>
            <div id="bottomLine1"></div>
            
            <div id="toolDiv">
                <Button variant="contained" color="success" onClick={() => { setLisaaMainosShow(show => !show); setMainoksesiShow(false); }}>Lisää mainos</Button>
                <Button variant="contained" color="info" onClick={() => {  setMainoksesiShow(show => !show); setLisaaMainosShow(false);  }}>Mainoksesi</Button>
                <Button variant="contained" color="info" onClick={() =>  HaeMainokset()  }>Hae Mainokset</Button>
            </div>
            {lisaaMainosShow && (
                <div id="lisääMainosDiv">

                    <ul>
                        <li>
                            <div className="rightImg">

                                <img id="mainosKuva" src="#" alt="MainosKuva" />






                            </div>
                            <div className="leftText">
                                <TextField onChange={inputOtsikko} id="mainoksenOtsikko" label="Mainoksen otsikko" autoComplete="off" fullWidth size="medium" />
                                <br></br>
                                <br></br>
                                <br></br>

                                <TextField onChange={inputKuvaus} multiline={true} id="mainoksenKuvaus" label="Mainoksen kuvaus" autoComplete="off" fullWidth size="medium" />
                                <br></br>
                                <br></br>
                                <br></br>
                                <TextField onChange={inputLinkki} id="mainoksenLinkki" label="Mainoksen linkki (https://www.sivunnimi.com). Jos et halua linkkiä jätä tyhjäksi!" autoComplete="off" fullWidth size="medium" />
                                <Button onClick={luoMainos} color="success" variant="contained">&#x2713;</Button>
                                <Button onClick={clearData} color="error" variant="contained">&#x2716;</Button>
                                <input id="uploadInput" onChange={uploadImg} type="file" accept="image/*" />

                            </div>
                        </li>
                    </ul>
                </div>
            )}
           

            {mainoksesiShow && resData !== undefined ?(
                <div id="mainoksesi">
                    <ul>
                        {resData.map(resData =>
                            <li key={resData.id}>

                                <div className="rightImg">
                                    <img src={lapset} alt="mainosKuva" />
                                </div>
                                <div className="leftText">
                                    <h1>{resData.Otsikko}</h1>
                                    <p>{resData.Kuvaus}</p>
                                    <a href="#">{resData.SivunUrl}</a>
                                </div>
                            </li>
                            )}
                       </ul>
                   
                </div>
            ):null}
        </div>
    );
}
export default DashBoard;