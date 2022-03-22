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
            <h3>Olá</h3>
            <h3>Estamos preparando tudo para você!</h3>
        </div>
    )
}

export { Loader }



    // useEffect(() => {
    //     async function findInformationsAccount() {
    //         let id = user.id
    //         await api.get(`/informations/${id}`)
    //         .then((res) => {
    //             let data2 = res.data[0]
    //             console.log("data2");               
    //             console.log(res.data[0]);     

    //             if(data2 !== undefined) {
    //                 console.log("Redirecionar feed")
    //                 console.log(data2)
    //              navigate("/feed");
        
    //             } else if (data2 === undefined) {
    //                 console.log("Redirecionar")
    //                 console.log(data2)
    //               navigate("/completeregistration");       
    //             }
    //            window.location.reload(false)
               
    //         }).catch(error => {
    //             console.log("Erro ao buscar dados" + error)
    //         })
            
    //     }
    //     findInformationsAccount()
    // }, [navigate, user.id])    



