import './listEventsFeed.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom';

function ListEventsFeed() {

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
        <div className="listEventsFeed">
            <h4>Próximos eventos:</h4>
                             {events.map((event) => {
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