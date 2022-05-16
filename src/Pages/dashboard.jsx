import React, { useState } from "react";
import './dashboard.css';
import TextField from '@mui/material/TextField';
import Userfront from "@userfront/react";
import Button from '@mui/material/Button';
import axios from 'axios';
import lapset from '../img/kuvia_Multia/lapset.jpg';
import Alert from '@mui/material/Alert';

function DashBoard() {
    const [otsikko, setOtsikko] = useState("");
    const [kuvaus, setKuvaus] = useState("");
    const [linkki, setLinkki] = useState("");

    const [kuvanFile, setKuvanFile] = useState("");
    const [kuvanUrl, setKuvanUrl] = useState("");

    const [yhteystiedot, setYhteystiedot] = useState("");

    const [lisaaMainosShow, setLisaaMainosShow] = useState(false);
    const [mainoksesiShow, setMainoksesiShow] = useState(true);

    const [resData, setData] = useState([]);
    const [alertMsg, setAlertMsg] = useState("");
    const [showAlert, setAlertStatus] = useState(false);
   


    
    const inputOtsikko = (e) => {
        setOtsikko(e.target.value);
    }
    const inputKuvaus = (e) => {
        setKuvaus(e.target.value);
    }
    const inputLinkki = (e) => {
        setLinkki(e.target.value);
    }
     const inputYhteystiedot = (e) => {
        setYhteystiedot(e.target.value);
    }

    const uploadImg = (kuvaFile) => {
        const data = new FormData()
        data.append("file", kuvaFile)
        data.append("upload_preset", "mainoskuvat")
        data.append("cloud_name", "dyu1m9mi")

        fetch("https://api.cloudinary.com/v1_1/dyvu1m9mi/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setKuvanUrl(data.url);
            })
            .catch(err => console.log(err))
    }
   
   


    //Mainosten tallentaminen databaseen 
    
    const luoMainos = () => {
         
            axios.post('http://localhost:3001/luoMainos', {
                otsikko: otsikko,
                kuvaus: kuvaus,
                linkki: linkki,
                kuva: kuvanUrl,
                haltija: Userfront.user.username,
                yhteystiedot: yhteystiedot,
            }).then(function (res) {
                HaeMainokset();


                setMainoksesiShow(show => !show);
                setLisaaMainosShow(false);

                setAlertMsg(res.data.message);
                setAlertStatus(true);

            }).catch(function (err) {
                setAlertMsg(err);
                setAlertStatus(true);

            });
        }
    
    const julkaiseMainos = (mainoksetOtsikko,mainoksenKuvaus,mainoksenLinkki,mainoskuvanLinkki,mainoksenId) => {
        axios.post('http://localhost:3001/julkaiseMainos', {
            id:mainoksenId,
            otsikko: mainoksetOtsikko,
            kuvaus: mainoksenKuvaus,
            linkki: mainoksenLinkki,
            kuva: mainoskuvanLinkki,
            
            yhteystiedot:yhteystiedot,
        }).then(function (res) {
            
           

            setAlertMsg(res.data.message);
            setAlertStatus(true);

        }).catch(function (err) {
            setAlertMsg(err);
            setAlertStatus(true);

        });
    }

    const HaeMainokset = () => {
        
        
        axios.post('http://localhost:3001/haeMainos', {
            haltija: Userfront.user.username,
        }).then((res) => {
            
            setData(res.data);
        }).catch((err)=> {
            setAlertMsg(err);
        });
      
      
    }

    const poistaMainos = (mainosId) => {
        axios.post('http://localhost:3001/poistaMainos', {
            id: mainosId,

            haltija:Userfront.user.username,
        }).then((res) => {
            setAlertMsg(res.data.message);
            setAlertStatus(true);

            HaeMainokset();

        }).catch((err) => {
            setAlertMsg(err.message);
            setAlertStatus(true);

        });
        axios.post('http://localhost:3001/poistaEtusivunMainos', {
            id: mainosId,

            haltija:Userfront.user.username,
        }).then((res) => {
            setAlertMsg(res.data.message);
            setAlertStatus(true);

            HaeMainokset();

        }).catch((err) => {
            setAlertMsg(err.message);
            setAlertStatus(true);

        });

    }

   
   
 
    return (

        <div id="dashBoardDiv">
            <h1>Hallintapaneeli</h1>
            <div className="bottomLine1"></div>
            
            <div id="toolDiv">
                <Button variant="contained" color="success" onClick={() => { setLisaaMainosShow(show => !show); setMainoksesiShow(false); }}>Lisää mainos</Button>
                <Button variant="contained" color="info" onClick={() => { HaeMainokset(); setMainoksesiShow(show => !show); setLisaaMainosShow(false);  }}>Mainoksesi</Button>
            </div>

            {lisaaMainosShow && (

                <div id="lisääMainosDiv">
                    <h1>Lisää mainos</h1>
                    <div className="bottomLine1"></div>
                    {showAlert && (
                        <Alert id="mainosAlert" variant="filled" variant="filled" severity="error" onClose={() => { setAlertStatus(false); }}>{alertMsg}</Alert>
                    )}
                    <ul>
                        <li>
                            <div className="rightImg">

                                <img id="mainosKuva" src={ kuvanUrl} alt="MainosKuva" />






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
                                <br></br>
                                <br></br>
                                <br></br>
                                <TextField onChange={inputYhteystiedot} id="mainoksenYhteystiedot" label="Yhteystiedot mainokseen" autoComplete="off" fullWidth size="medium" />
                                <br></br>

                                <Button onClick={() => { console.log(kuvanUrl); if (kuvanUrl === "") { setAlertMsg("Mainoksessa täytyy olla kuva!"); setAlertStatus(true); } else luoMainos(); }} color="success" variant="contained">Tallenna</Button>
                                <input id="uploadInput" onChange={(e) => {  uploadImg(e.target.files[0]); document.getElementById("mainosKuva").style.display = "block";}} type="file" accept="image/*" />

                            </div>
                        </li>
                    </ul>
                </div>
            )}
           
        
            {mainoksesiShow && (
                <div id="mainoksesi">
                    <h1>Omat mainoksesi</h1>
                    <div className="bottomLine1"></div>
                    {showAlert && (
                        <Alert id="mainosAlert" variant="filled" variant="filled" severity="success" onClose={() => { setAlertStatus(false); }}>{alertMsg}</Alert>
                    )}
                    <ul>
                        {resData == "" && (
                            <p>Ei mainoksia!</p>
                            )}
                        {resData.map(resData =>
                            <li key={resData.id}>

                                <div className="rightImg">

                                    <img src={resData.KuvaUrl} alt="mainosKuva" />
                                    
                                    <Button onClick={() => poistaMainos(resData.id)} id="deleteMainosBtn" color="error" variant="contained">Poista mainos</Button>
                                    <Button onClick={() => julkaiseMainos(resData.Otsikko, resData.Kuvaus, resData.SivunUrl, resData.KuvaUrl,resData.id)} id="julkaiseMainosBtn" color="success" variant="contained">Julkaise Mainos</Button>

                                   
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
            )}
        </div>
    );
}
export default DashBoard;