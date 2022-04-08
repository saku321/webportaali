import React from "react";

const Registerpage = () => {
    return (
        <div>
            <form>
                <input autoComplete="off" placeholder="Käyttäjänimi" name="userName" />
                <input autoComplete="off" placeholder="Salasana" name="passwrd" pattern="(?=.*\d)(?=.*[a-z]).(?=.*?[~`!@#$%\^&*()\-_=+[\]{};:\x27.,\x22\\|/?><]).{8,}" title="Salasanan täytyy olla vähintään 8 merkkiä pitkä ja sisältää vähintään yhden numeron ja erikoismerkin!" />

                <button type="submit">Rekisteröidy</button>


                </form>
            </div>
        )
}
export default Registerpage;