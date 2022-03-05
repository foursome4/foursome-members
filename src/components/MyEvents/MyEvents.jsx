import './myEvents.css'
import { useEffect, useState } from 'react';
import api from '../../services/api';

function MyEvents() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)

    const [events, setForuns] = useState([])

    useEffect(() => {
        async function loadMyEvents(){
            const idAccount = user.id
            await api.get(`/events/account/${idAccount}`).then((result) => {
                console.log(result.data);
                setForuns(result.data)
            })
        }

        loadMyEvents()
    }, [user.id]);





    return (
        <div className="listForuns">
             <div className="foruns-all">
                             {events.map((event) => {
                                 return(
                                    <div className="foruns-unic" key={event.id}>
                                        <div className="imageCover">                                          
                                    <img src={event.cover} alt="" className="cover"/>
                                        </div>
                                        <div className="avatarImage">
                                    <img src={event.avatar} alt="" className="profile"/>
                                        </div>
                                    <h4>{event.name}</h4>
                                    <a href={`/event/${event.id}`}>Entrar</a>
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