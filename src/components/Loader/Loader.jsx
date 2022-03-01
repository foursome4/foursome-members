import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../../assets/images/gif/loader2.gif';
import { AuthContext } from '../../contexts/Auth';
import api from '../../services/api';
import "./loader.css"


function Loader() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const navigate = useNavigate()

    useEffect(() => {
        async function findInformationsAccount() {
            const id = user.id
            await api.get(`/informations/${id}`)
            .then((res) => {
                const data2 = res.data[0]
                console.log("data2");               
                console.log(res.data[0]);               
                localStorage.setItem("informations-foursome", JSON.stringify(data2));

                if(data2 !== undefined) {
                    console.log("Redirecionar feed")
                    console.log(data2)
                    navigate("/feed");
        
                } else {
                    console.log("Redirecionar")
                    console.log(data2)
                    navigate("/completeregistration");       
                }
                window.location.reload()
               
            }).catch(error => {
                console.log("Erro ao buscar dados" + error)
            })
            
        }
        findInformationsAccount()
    }, [navigate, user.id])    


    return(
        <div className="loader">
            <img src={loader} alt="Carregando" />
            <h3>Carregando informações</h3>
        </div>
    )
}

export { Loader }


