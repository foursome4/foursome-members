import './myEvents.css'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function MyEvents() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const LocalInformations = localStorage.getItem("informations-foursome");
    const userInformations= JSON.parse(LocalInformations);

    const [foruns, setForuns] = useState([])

    useEffect(() => {
        async function loadMyEvents(){
            const idAccount = user.id
            await api.get(`/foruns/account/${idAccount}`).then((result) => {
                console.log(result.data);
                setForuns(result.data)
            })
        }

        loadMyEvents()
    }, []);





    return (
        <div className="listForuns">
             <div className="foruns-all">
                             {foruns.map((forum) => {
                                 return(
                                    <div className="foruns-unic" key={forum.id}>
                                        <div className="imageCover">                                          
                                    <img src={forum.cover} alt="" className="cover"/>
                                        </div>
                                        <div className="avatarImage">
                                    <img src={forum.avatar} alt="" className="profile"/>
                                        </div>
                                    <h4>{forum.name}</h4>
                                    <Link to={`/forum/${forum.id}`}>Entrar</Link>
                                    <button>Fechar</button>
                                </div>
                           
                                 )
                             })}

                            </div>
                            <br />
                                
        </div>
    )
}

export { MyEvents }