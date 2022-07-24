import './listEvents.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

function ListEvents() {
    const {data} = useFetch(`/events`);


    return (
        <div className="listEvents">
             <div className="events-all">
                             {data?.map((event) => {
                                 return(
                                 event.status === "Aproved" ?
                                    <div className="events-unic" key={event.id}>
                                        <div className="imageCover"> 
                                    <img src={event.cover} alt="" className="cover"/>
                                        </div>
                                    <img src={event.avatar} alt="" className="profile"/>
                                    <h4>{event.name}</h4>
                                    <Link to={`/event/${event.id}`}>Saber mais</Link>
                                </div>
                                :
                                ""
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