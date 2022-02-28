import './listEvents.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom';

function ListEvents() {

    const [events, setEvents] = useState([])


    useEffect(() => {
        async function loadGroups(){
            await api.get("/events").then((result) => {
                console.log(result.data);
                setEvents(result.data)
            })
        }

        loadGroups()
    }, []);


    return (
        <div className="listEvents">
             <div className="events-all">
                             {events.map((event) => {
                                 return(
                                    <div className="events-unic" key={event.id}>
                                        <div className="imageCover"> 
                                    <img src={event.cover} alt="" className="cover"/>
                                        </div>
                                    <img src={event.avatar} alt="" className="profile"/>
                                    <Link to={`/event/${event.id}`}>
                                    <h4>{event.name}</h4>
                                    </Link>
                                    <Link to={`/event/${event.id}`}>Entrar</Link>
                                </div>
                           
                                 )
                             })}
                               
                            </div>
                                 <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
       
                         
        </div>
    )
}

export { ListEvents }