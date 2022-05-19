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

    const [kuvanUrl, setKuvanUrl] = useState("");
    const [tapahtumaKuvanUrl, setTapahtumanKuvanUrl] = useState("");

    const [yhtTiedot, setYhteystiedot] = useState("");

    const [lisaaMainosShow, setLisaaMainosShow] = useState(false);
    const [mainoksesiShow, setMainoksesiShow] = useState(false);
    const [lisaaTapahtumaShow, setLisääTapahtumaShow] = useState(false);
    const [tapahtumasiShow, setTapahtumasiShow] = useState(false);

    const [resData, setData] = useState([]);

    const [TapahtumaData, setTapahtumaData] = useState([]);

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
    //mainoksen kuvan tallennus
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
                yhteystiedot: yhtTiedot,
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
    
    const julkaiseMainos = (mainoksetOtsikko,mainoksenKuvaus,mainoksenLinkki,mainoskuvanLinkki,mainoksenYhtTiedot,mainoksenId) => {
        axios.post('http://localhost:3001/julkaiseMainos', {
            id:mainoksenId,
            otsikko: mainoksetOtsikko,
            kuvaus: mainoksenKuvaus,
            linkki: mainoksenLinkki,
            kuva: mainoskuvanLinkki,
            
            yhteystiedot:yhtTiedot,
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

   //Tapahtuman luonti
    const luoTapahtuma = () => {
        axios.post('http://localhost:3001/luoTapahtuma', {
            otsikko: otsikko,
            kuvaus: kuvaus,
            
            kuva: tapahtumaKuvanUrl,
            haltija: Userfront.user.username,
           
        }).then(function (res) {
            HaeTapahtuma();
            setOtsikko("");
            setKuvaus("");
            setTapahtumanKuvanUrl("");
            setTapahtumanKuvanUrl("");
           

           setTapahtumasiShow(show => !show);
            setLisääTapahtumaShow(false);

            setAlertMsg(res.data.message);
            setAlertStatus(true);

        }).catch(function (err) {
            setAlertMsg(err);
            setAlertStatus(true);

        });
    }

    const julkaiseTapahtuma = (tapahtumanOtsikko, tapahtumanKuvaus,  tapahtumanKuvanLinkki, tapahtumanId) => {
        axios.post('http://localhost:3001/julkaiseTapahtuma', {
            id: tapahtumanId,
            otsikko: tapahtumanOtsikko,
            kuvaus: tapahtumanKuvaus,
            
            kuva: tapahtumanKuvanLinkki,

            
        }).then(function (res) {



            setAlertMsg(res.data.message);
            setAlertStatus(true);

        }).catch(function (err) {
            setAlertMsg(err);
            setAlertStatus(true);

        });
    }

    const uploadTapahtumaImg = (kuvaFile) => {
        const data = new FormData()
        data.append("file", kuvaFile)
        data.append("upload_preset", "tapahtumaKuvat")
        data.append("cloud_name", "dyu1m9mi")

        fetch("https://api.cloudinary.com/v1_1/dyvu1m9mi/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setTapahtumanKuvanUrl(data.url);
            })
            .catch(err => console.log(err))
    }

    const HaeTapahtuma = () => {


        axios.post('http://localhost:3001/haeTapahtumat', {
            haltija: Userfront.user.username,
        }).then((res) => {

            setTapahtumaData(res.data);
        }).catch((err) => {
            setAlertMsg(err);
        });


    }
    const poistaTapahtuma = (tapahtumaId) => {
        axios.post('http://localhost:3001/poistaTapahtuma', {
            id: tapahtumaId,

            haltija: Userfront.user.username,
        }).then((res) => {
            setAlertMsg(res.data.message);
            setAlertStatus(true);

            HaeTapahtuma();

        }).catch((err) => {
            setAlertMsg(err.message);
            setAlertStatus(true);
        });

        axios.post('http://localhost:3001/poistaEtusivunTapahtuma', {
            id: tapahtumaId,

        }).then((res) => {
            setAlertMsg(res.data.message);
            setAlertStatus(true);

            HaeTapahtuma();

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
                <div>
                    <Button variant="contained" color="success" onClick={() => { setAlertStatus(false); setLisaaMainosShow(show => !show); setMainoksesiShow(false); setTapahtumasiShow(false); setLisääTapahtumaShow(false); }}>Luo mainos</Button>
                    <Button variant="contained" color="info" onClick={() => { setAlertStatus(false); HaeMainokset(); setMainoksesiShow(show => !show); setLisaaMainosShow(false); setTapahtumasiShow(false); setLisääTapahtumaShow(false); }}>Mainoksesi</Button>
                    </div>
                {Userfront.user.hasRole("admin") && (
                    <div>
                        <Button variant="contained" color="success" onClick={() => { setAlertStatus(false); setLisääTapahtumaShow(show => !show); setTapahtumasiShow(false); setMainoksesiShow(false); setLisaaMainosShow(false); }}>Luo tapahtuma</Button>

                        <Button variant="contained" color="info" onClick={() => { setAlertStatus(false);HaeTapahtuma(); setTapahtumasiShow(show => !show); setLisääTapahtumaShow(false); setMainoksesiShow(false); setLisaaMainosShow(false); }}>Tapahtumasi</Button>
                    </div>
                    )}



            </div>
            {/*mainoksen luonti*/}
            {lisaaMainosShow && (

                <div className="lisääMainosDiv">
                    <h1>Luo mainos</h1>
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

                                <Button onClick={() => { if (kuvanUrl === "") { setAlertMsg("Mainoksessa täytyy olla kuva!"); setAlertStatus(true); } else luoMainos(); }} color="success" variant="contained">Tallenna</Button>
                                <input id="uploadInput" onChange={(e) => {  uploadImg(e.target.files[0]); document.getElementById("mainosKuva").style.display = "block";}} type="file" accept="image/*" />

                            </div>
                        </li>
                    </ul>
                </div>
            )}
           
            {/*omat mainokset*/}
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

                                    <Button id="editMainosBtn" color="info" variant="contained">Muokkaa mainosta</Button>

                                    <Button onClick={() => julkaiseMainos(resData.Otsikko, resData.Kuvaus, resData.SivunUrl, resData.KuvaUrl, resData.yhteystiedot, resData.id)} id="julkaiseMainosBtn" color="success" variant="contained">Julkaise Mainos</Button>


                                   
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

            {/*luo tapahtuma*/}
            {lisaaTapahtumaShow && (
                <div id="lisääTapahtumaDiv">
                    <h1>Luo Tapahtuma</h1>
                    <div className="bottomLine1"></div>
                    {showAlert && (
                        <Alert id="mainosAlert" variant="filled" variant="filled" severity="error" onClose={() => { setAlertStatus(false); }}>{alertMsg}</Alert>
                    )}
                    <ul>

                        <li>

                            <img id="tapahtumaKuva" src={tapahtumaKuvanUrl} alt="TapahtumaKuva" />
                            <br></br>
                            <br></br>
                            <TextField onChange={inputOtsikko} id="tapahumtaOtsikko" label="Tapahtuman otsikko" autoComplete="off" fullwidth="true"  />
                            <br></br>
                            <br></br>
                            <br></br>
                            <TextField multiline={true} onChange={inputKuvaus} id="tapahumtakuvaus" label="Tapahtuman kuvaus" autoComplete="off" fullwidth="true" />
                            <br></br>
                            <br></br>
                            <input onChange={(e) => { uploadTapahtumaImg(e.target.files[0]); document.getElementById("tapahtumaKuva").style.display = "block"; }} type="file" accept="image/*" />

                            <br></br>
                            <br></br>
                            <Button onClick={() => { if (tapahtumaKuvanUrl === "") { setAlertMsg("Tapahtumassa täytyy olla kuva!"); setAlertStatus(true); } else luoTapahtuma(); }} color="success" variant="contained">Tallenna</Button>

                            <br></br>
                            <br></br>

                            
                        </li>
                    </ul>
                </div>
            )}
            {/*omat tapahtumat*/}
            {tapahtumasiShow && (
                <div id="tapahtumat">
                    <h1>Omat tapahtumat</h1>
                    <div className="bottomLine1"></div>
                    {showAlert && (
                        <Alert id="mainosAlert" variant="filled" variant="filled" severity="success" onClose={() => { setAlertStatus(false); }}>{alertMsg}</Alert>
                    )}
                    <ul>
                        {TapahtumaData == "" && (
                            <p>Ei Tapahtumia!</p>
                        )}
                        {TapahtumaData.map(tapahtumanData =>
                            <li key={tapahtumanData.id}>

                                <img id="tapahtumaKuva" src={tapahtumanData.KuvaUrl} alt="TapahtumaKuva" />
                                <br></br>
                                <br></br>
                                <h1>{tapahtumanData.Otsikko}</h1>
                                <br></br>
                                <p>{tapahtumanData.Kuvaus}</p>
                                <br></br>
                                <Button onClick={() => julkaiseTapahtuma(tapahtumanData.Otsikko, tapahtumanData.Kuvaus, tapahtumanData.KuvaUrl, tapahtumanData.id)} id="julkaiseTapahtumaBtn" color="success" variant="contained">Julkaise Tapahtuma</Button>
                                <Button id="editTapahtumaBtn" color="info" variant="contained">Muokkaa tapahtumaa</Button>

                                <Button onClick={() => poistaTapahtuma(tapahtumanData.id)} id="deleteTapahtumaBtn" color="error" variant="contained">Poista Tapahtuma</Button>

                            </li>
                        )}
                    </ul>

                </div>
            )}


        </div>
    );
}
export default DashBoard;