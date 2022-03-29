import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../../assets/images/gif/loader2.gif';
import api from '../../services/api';
import "./loader.css"


function Loader() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    const navigate = useNavigate();



    useEffect(() => {
        async function findInformationsAccount() {
            let id = user.id
          const res = await api.get(`/informations/${id}`)
                if(res.data.length === 0) {
                    navigate("/completeregistration")
                }
                localStorage.setItem("informations-foursome", JSON.stringify(res.data[0]));  
                findInformationsCharacteristcs()      
        }

        async function findInformationsCharacteristcs() {
            let id = user.id
          const res = await api.get(`/characteristics/${id}`)
                if(res.data === undefined || res.data === []) {
                    navigate("/characteristcs")
                }
                localStorage.setItem("characteritics-foursome", JSON.stringify(res.data));  
                findInformationsPreferences()     
        }

        async function findInformationsPreferences() {
            let id = user.id
          const res = await api.get(`/preferences/${id}`)
          if(res.data === undefined || res.data === []) {
            navigate("/preferences")
        } else {
            localStorage.setItem("preferences-foursome", JSON.stringify(res.data[0])); 
            redirectToPage()    
        }
        }

        findInformationsAccount();


    }, [navigate, user.id]);


        async function redirectToPage() {
           await navigate("/feed");
            window.location.reload(false)
        }



    return(
        <div className="loader">
            <img src={loader} alt="Carregando" />
            <h4>Olá</h4>
            <h4>Estamos preparando tudo para você!</h4>
        </div>
    )
}

export { Loader }






