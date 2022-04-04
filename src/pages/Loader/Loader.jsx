import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loader from '../../assets/images/gif/loader2.gif';
import api from '../../services/api';
import "./loader.css"


function Loader() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    console.log(user)

    const navigate = useNavigate();

    const [informations, setInformations] = useState([]);
    const [characteristcs, setCharacteristcs] = useState([]);
    const [preferences, setPreferences] = useState([]);




    useEffect(() => {
        async function findInformationsAccount() {
            let id = user.id
          await api.get(`/informations/${id}`).then( async (res) => {
              setInformations(res.data);    
              console.log(res.data);  
              localStorage.setItem("informations-foursome", JSON.stringify(res.data[0])); 
              
                    await api.get(`/characteristics/${id}`).then( async (res) => {
                        setCharacteristcs(res.data);
                    console.log(res.data);
                    localStorage.setItem("characteritics-foursome", JSON.stringify(res.data)); 


                            await api.get(`/preferences/${id}`).then( async (res) => {
                                setPreferences(res.data);
                                console.log(res.data);
                                localStorage.setItem("preferences-foursome", JSON.stringify(res.data[0])); 

                            })
            })



          })

        }

          findInformationsAccount();


        
    }, [user.id]);

    
    console.log(informations.length);
    console.log(characteristcs.length);
    console.log(preferences.length);




 
        function VerifyDataUser() {
            if(informations.length !== 0) {
                redirectToPage()    
            } else {
                navigate("/completeregistration");
                window.location.reload(true);
              
            }
        }

        useEffect(() => {
            VerifyDataUser()
        },[VerifyDataUser])


        async function redirectToPage() {
           navigate("/feed");
            window.location.reload(true)
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






