import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../../assets/images/gif/loader2.gif';
import api from '../../services/api';
import "./loader.css"


function Loader() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformations = localStorage.getItem("informations-foursome");
    console.log(LocalInformations)
    // const informations = JSON.parse(LocalInformations);
    const LocalCharacteristics = localStorage.getItem("characteritics-foursome");
    // const characteristics = JSON.parse(LocalCharacteristics);
    const LocalPreferences = localStorage.getItem("preferences-foursome");
    // const preferences = JSON.parse(LocalPreferences);

    const navigate = useNavigate();



    useEffect(() => {
        function redirectToPage() {
            if(LocalInformations === "undefined") {
                navigate("/completeregistration")
            } else if(LocalCharacteristics === "undefined") {
                navigate("/characteristcs")
            } else if(LocalPreferences === "undefined") {
                navigate("/preferences")
            } else {
                navigate("/feed")
            }

            window.location.reload(false)
        }


        redirectToPage()
    }, [navigate])


    return(
        <div className="loader">
            <img src={loader} alt="Carregando" />
            <h4>Olá</h4>
            <h4>Estamos preparando tudo para você!</h4>
        </div>
    )
}

export { Loader }