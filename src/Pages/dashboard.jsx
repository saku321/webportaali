import React, { useState } from "react";
import './dashboard.css';
import TextField from '@mui/material/TextField';
import Userfront from "@userfront/react";
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';

function DashBoard() {
    //Inputtejen statet
    const [otsikko, setOtsikko] = useState("");
    const [kuvaus, setKuvaus] = useState("");
    const [linkki, setLinkki] = useState("");
    const [yhtTiedot, setYhteystiedot] = useState("");

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

    //Mainoksen kuva
    const [kuvanUrl, setKuvanUrl] = useState("");
    //Tapahtuman kuva
    const [tapahtumaKuvanUrl, setTapahtumanKuvanUrl] = useState("");

    //Lisää mainos sivu näkyviin 
    const [lisaaMainosShow, setLisaaMainosShow] = useState(false);
    //Omat mainokset sivu näkyviin
    const [mainoksesiShow, setMainoksesiShow] = useState(false);
    //Lisää tapahtuma sivu näkyviin
    const [lisaaTapahtumaShow, setLisääTapahtumaShow] = useState(false);
    //Omat tapahtumat sivu näkyviin
    const [tapahtumasiShow, setTapahtumasiShow] = useState(false);
    //Responsedata, Kun mainokset haetaan tallennetaan objecti tähän
    const [resData, setData] = useState([]);

    //Kun tapahtumat haetaan, tallennetaan tapahtuman objecti tähän
    const [TapahtumaData, setTapahtumaData] = useState([]);

    //Alertin teksti ja näkyvyys
    const [alertMsg, setAlertMsg] = useState("");
    const [showAlert, setAlertStatus] = useState(false);

    //tapahtuman ja mainoksen muokkaus näkyviin
    const [editTapahtuma, setEditTapahtuma] = useState(false);
    const [editMainos, setEditMainos] = useState(false);
   


//Mainosten käsittelyt

    const HaeMainokset = () => {


        axios.post('http://localhost:3001/haeMainos', {
            haltija: Userfront.user.username,
        }).then((res) => {
            console.log(res);
            setData(res.data);
        }).catch((err) => {
            setAlertMsg(err);
        });


    }
    //luo mainos
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

            console.log(res);
            setMainoksesiShow(show => !show);
            setLisaaMainosShow(false);

            setAlertMsg(res.data.message);
            setAlertStatus(true);

        }).catch(function (err) {
            setAlertMsg(err);
            setAlertStatus(true);

        });
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

    //päivitä mainoksen kuva
    const updateMainosImg = (kuvaFile, id) => {
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
                document.getElementById("mainoksenKuva " + id).src = data.url;
                setTapahtumanKuvanUrl(data.url);

                HaeMainokset();

            })
            .catch(err => console.log(err))
    }

    //julkaise mainos
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

   //poista mainos
    const poistaMainos = (mainosId) => {
        axios.post('http://localhost:3001/poistaMainos', {
            id: mainosId,

            haltija: Userfront.user.username,
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

            haltija: Userfront.user.username,
        }).then((res) => {
            setAlertMsg(res.data.message);
            setAlertStatus(true);

            HaeMainokset();

        }).catch((err) => {
            setAlertMsg(err.message);
            setAlertStatus(true);

        });

    }

    //muokkaa mainosta
    const mainoksenMuokkaus = (mainosId) => {
        axios.post('http://localhost:3001/muokkaaMainosta', {
            id: mainosId,
            otsikko: otsikko,
            kuvaus: kuvaus,

            kuva: tapahtumaKuvanUrl,
            sivuUrl: linkki,
            yhteystiedot: yhtTiedot,
        }).then((res) => {
            setAlertMsg(res.data.message);
            setAlertStatus(true);
            setEditMainos(false);
            HaeMainokset();
        }).catch((err) => {
            setAlertMsg(err.data.message);
            setAlertStatus(true);
        });

    }



//Tapahtumien käsittelyt

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

    //Lataa tapahtuman kuva
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
                document.getElementById("tapahtumaKuva").src = data.url;

                setTapahtumanKuvanUrl(data.url);

            })
            .catch(err => console.log(err))
    }
   //Päivitä tapahtuman kuva
    const updateTapahtumaImg = (kuvaFile,id) => {
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
                document.getElementById("tapahtumaKuva "+id).src = data.url;
                setTapahtumanKuvanUrl(data.url);

            })
            .catch(err => console.log(err))
    }
    //Hae kaikki tapahtumat
    const HaeTapahtuma = () => {


        axios.post('http://localhost:3001/haeTapahtumat', {
            haltija: Userfront.user.username,
        }).then((res) => {

            setTapahtumaData(res.data);
        }).catch((err) => {
            setAlertMsg(err);
        });


    }
    //poistatapahtuma
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
    //Muokkaa tapahtumaa
    const tapahtumanMuokkaus = (tapahtumaId) => {
      

        axios.post('http://localhost:3001/muokkaaTapahtumaa', {
            id: tapahtumaId,
            otsikko: otsikko,
            kuvaus: kuvaus,

            kuva: tapahtumaKuvanUrl,
        }).then((res) => {
            setAlertMsg(res.data.message);
            setAlertStatus(true);
            setEditTapahtuma(false);
            HaeTapahtuma();
        }).catch((err) => {
            setAlertMsg(err.data.message);
            setAlertStatus(true);
        });

    }
   
   
    
    return (

        <div id="dashBoardDiv">
           
            <h1>Hallintapaneeli</h1>
            <div className="bottomLine1"></div>
            
            <div id="toolDiv">
                <div>
                    {/*Mainoksen napit*/}
                    <Button variant="contained" color="success" onClick={() => { setAlertStatus(false); setLisaaMainosShow(show => !show); setMainoksesiShow(false); setTapahtumasiShow(false); setLisääTapahtumaShow(false); }}>Luo mainos</Button>
                    <Button variant="contained" color="info" onClick={() => { setAlertStatus(false); HaeMainokset(); setMainoksesiShow(show => !show); setLisaaMainosShow(false); setTapahtumasiShow(false); setLisääTapahtumaShow(false); }}>Mainoksesi</Button>
                    </div>
                {Userfront.user.hasRole("admin") && (
                    <div>
                        {/*Tapahtuman napit*/}
                        <Button variant="contained" color="success" onClick={() => { setAlertStatus(false); setLisääTapahtumaShow(show => !show); setTapahtumasiShow(false); setMainoksesiShow(false); setLisaaMainosShow(false); setOtsikko(""); setKuvaus(""); setTapahtumanKuvanUrl("");}}>Luo tapahtuma</Button>

                        <Button variant="contained" color="info" onClick={() => { setAlertStatus(false);HaeTapahtuma(); setTapahtumasiShow(show => !show); setLisääTapahtumaShow(false); setMainoksesiShow(false); setLisaaMainosShow(false); }}>Tapahtumasi</Button>
                    </div>
                    )}



            </div>
            {/*mainoksen luonti*/}
            {lisaaMainosShow && (

                <div className="lisääMainosDiv">
                    <h1>Luo mainos</h1>
                    <div className="bottomLine1"></div>
                    {showAlert ?(
                        <Alert id="mainosAlert" variant="filled" variant="filled" severity="error" onClose={() =>  setAlertStatus(false) }>{alertMsg}</Alert>
                    ):null}
                    <ul>
                        <li>
                            {/*Mainoksen luonnin inputit*/}
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
                            {/*Mainoksen luonnin kuvat*/}
                            <div className="rightImg">

                                <img id="mainosKuva" src={kuvanUrl} alt="MainosKuva" />






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
                        {resData === "" && (
                            <p>Ei mainoksia!</p>
                        )}
                        {/*Tulostetaan mainokset*/}
                        {resData.map(resData =>
                            <li key={resData.id}>

                              
                                    <div className="leftText">
                                    {/*Jos mainoksen muokkaus on pois päältä*/}
                                    {!editMainos && (
                                        <div>
                                            <h1>{resData.Otsikko}</h1>
                                            <p>{resData.Kuvaus}</p>
                                            <p className="yhteystiedot">{resData.Yhteystiedot}</p>
                                            <a href={"https://" + resData.SivunUrl} target="_blank" rel="noopener noreferrer">{resData.SivunUrl}</a><br></br>

                                        </div>


                                    )}
                                    <ul>
                                    {/*Jos mainoksen muokkaus on päällä*/}

                                    {editMainos && (
                                            <div style={{ float: "left", margin: "20px" }}>
                                                <p>Otsikko</p>
                                            <TextField multiline={true} onChange={inputOtsikko} id="mainoksenOtsikko" label={resData.Otsikko} autoComplete="off" fullwidth="true"  />
                                                <p>Kuvaus</p>
                                          <TextField multiline={true} onChange={inputKuvaus} id="mainoksenKuvaus" label={resData.Kuvaus} autoComplete="off" fullwidth="true"  />
                                                <br></br>
                                                <p>Sivun linkki</p>
                                            <TextField multiline={true} onChange={inputLinkki} id="mainoksenLinkki" label={resData.SivunUrl} autoComplete="off" fullwidth="true" />
                                                <p>Yhteystiedot</p>
                                                <TextField multiline={true} onChange={inputYhteystiedot} id="mainoksenYhteystiedot" label={resData.Yhteystiedot} autoComplete="off" fullwidth="true" />
                                            <input id="uploadInput" onChange={(e) => { updateMainosImg (e.target.files[0],resData.id); }} type="file" accept="image/*" />
                                        </div>
                                    )}

                                  </ul>

                                </div>
                                <div className="rightImg">

                                    <img src={resData.KuvaUrl} alt="mainosKuva" id={"mainoksenKuva " + resData.id} />
                                    {/*Jos mainoksen muokkaus on pois päältä*/}
                                    {!editMainos && (
                                        <div>

                                            <Button onClick={() => poistaMainos(resData.id)} id="deleteMainosBtn" color="error" variant="contained">Poista mainos</Button>
                                            {/*Laittaa mainoksen muokkauksen päälle ja lisää edelliset tiedot inputteihin*/}
                                            <Button onClick={() => { setEditMainos(edit => !edit); setOtsikko(resData.Otsikko); setKuvaus(resData.Kuvaus); setTapahtumanKuvanUrl(resData.KuvaUrl); setLinkki(resData.SivunUrl); setYhteystiedot(resData.Yhteystiedot) }} id="editMainosBtn" color="info" variant="contained">Muokkaa mainosta</Button>

                                            <Button onClick={() => julkaiseMainos(resData.Otsikko, resData.Kuvaus, resData.SivunUrl, resData.KuvaUrl, resData.yhteystiedot, resData.id)} id="julkaiseMainosBtn" color="success" variant="contained">Julkaise Mainos</Button>

                                        </div>
                                    )}
                                    {/*Jos mainoksen muokkaus on päällä*/}
                                    {editMainos && (
                                        <div>

                                            <Button onClick={() => setEditMainos(edit => !edit)} id="editMainosBtn" color="error" variant="contained">Poistu muokkauksesta</Button>

                                            <Button onClick={() => mainoksenMuokkaus(resData.id)} id="julkaiseMainosBtn" color="success" variant="contained">Tallenna muokkaus</Button>

                                        </div>
                                    )}


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
                  

                        <li>
                            
                            <img id="tapahtumaKuva" className="tapahtumaKuva" src={tapahtumaKuvanUrl} alt="TapahtumaKuva" />
                            <br></br>
                            <br></br>
                            <TextField onChange={inputOtsikko} id="tapahumtaOtsikko" label="Tapahtuman otsikko" autoComplete="off" fullwidth="true"  />
                            <br></br>
                            <br></br>
                            <br></br>
                            <TextField multiline={true} onChange={inputKuvaus} id="tapahumtakuvaus" label="Tapahtuman kuvaus" autoComplete="off" fullwidth="true" />
                            <br></br>
                            <br></br>
                            <input onChange={(e) => { uploadTapahtumaImg(e.target.files[0]); }} type="file" accept="image/*" />

                            <br></br>
                            <br></br>
                            <Button onClick={() => { if (tapahtumaKuvanUrl === "") { setAlertMsg("Tapahtumassa täytyy olla kuva!"); setAlertStatus(true); } else luoTapahtuma(); }} color="success" variant="contained">Tallenna</Button>

                            <br></br>
                            <br></br>

                            
                        </li>
                    
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
                        {TapahtumaData.length === 0 ||TapahtumaData.length === undefined ? (
                            <p>Ei Tapahtumia!</p>
                        ) : null}
                        {/*Tulostetaan tapahtumat*/}

                        {TapahtumaData.length !== "undefined" && TapahtumaData.map(tapahtumanData =>
                            <li key={tapahtumanData.id}>

                                <img className="tapahtumaKuva" id={"tapahtumaKuva " + tapahtumanData.id} src={tapahtumanData.KuvaUrl} alt="TapahtumaKuva" />
                                <br></br>
                                <br></br>

                                <ul>
                                {/*Jos tapahtuman muokkaus on pois päältä*/}
                                {!editTapahtuma && (
                                    <div>
                                     <h1>{tapahtumanData.Otsikko}</h1>
                                     <p >{tapahtumanData.Kuvaus}</p>

                                        <Button onClick={() => julkaiseTapahtuma(tapahtumanData.Otsikko, tapahtumanData.Kuvaus, tapahtumanData.KuvaUrl, tapahtumanData.id)} id="julkaiseTapahtumaBtn" color="success" variant="contained">Julkaise Tapahtuma</Button>
                                            {/*Laittaa tapahtuman muokkauksen päälle ja lisää edelliset tiedot inputteihin*/}
                                            <Button onClick={() => { setEditTapahtuma(edit => !edit); setOtsikko(tapahtumanData.Otsikko); setKuvaus(tapahtumanData.Kuvaus); setTapahtumanKuvanUrl(tapahtumanData.KuvaUrl); }} id="editTapahtumaBtn" color="info" variant="contained">Muokkaa tapahtumaa</Button>
                                            <Button onClick={() => poistaTapahtuma(tapahtumanData.id)} id="editTapahtumaBtn" color="error" variant="contained">Poista tapahtuma</Button>


                                    </div>
                                    )}
                                    {/*Jos tapahtuman muokkaus on päällä*/}
                                {editTapahtuma && (
                                    <div>
                                        <input onChange={(e) => { updateTapahtumaImg(e.target.files[0], tapahtumanData.id) }} type="file" accept="image/*" />
                                        <br></br>
                                            <br></br>
                                            <p>Otsikko</p>
                                        <TextField multiline={true} onChange={inputOtsikko} id="tapahumtaOtsikko" label={tapahtumanData.Otsikko} autoComplete="off" fullwidth="true"  />
                                            <p>Kuvaus</p>

                                            <TextField multiline={true} onChange={inputKuvaus} id="tapahumtaKuvaus" label={tapahtumanData.Kuvaus} autoComplete="off" fullwidth="true" />
                                        <Button onClick={() => tapahtumanMuokkaus(tapahtumanData.id,tapahtumanData.KuvaUrl)} id="julkaiseTapahtumaBtn" color="success" variant="contained">Tallenna muokkaus</Button>
                                        <Button onClick={() => setEditTapahtuma(edit => !edit)} id="editTapahtumaBtn" color="error" variant="contained">Poistu muokkauksesta</Button>


                                        </div>
                                    )}
                                    </ul>
                            </li>
                        )}
                    </ul>

                </div>
            )}


        </div>
    );
}
export default DashBoard;