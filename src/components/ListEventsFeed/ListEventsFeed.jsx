import './listEventsFeed.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom';
import Evento from '../../assets/images/evento.jpeg';

function ListEventsFeed() {

    const [events, setEvents] = useState([])

    const eventos = [{
        id: "636363",
        cover: Evento,
        status: "Aproved"
    }]
    useEffect(() => {
        async function loadGroups(){
            await api.get("/events").then((result) => {
                console.log(result.data);
                setEvents(result.data)
            })
        }
        loadGroups()
    }, []);

    const eventsListNew = eventos.filter((event) => event.status === "Aproved")


    return (
        <div className="listEventsFeed">
                                 {eventos.map((event) => {
                                 return(
                                     event.status === "Aproved" ?
                                        <div className="imageCover" key={event.id}> 
                                        <Link to={`/event/${event.id}`}>
                                    <img src={event.cover} alt="" className="cover"/>
                                    </Link>
                                </div>

                                : ""
                           
                                 )
                             })}
        </div>
    )
}

export { ListEventsFeed }