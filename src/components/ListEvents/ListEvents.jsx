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
                                 event?.status === "Aproved" ?
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

function ListEventsUnic() {
    const {data} = useFetch(`/events`);

    const EventAprtoved = data?.filter((event) => event.status === "Aproved")

    return (
<<<<<<< HEAD
           EventAprtoved?.length === 0 ?
           <div className="listEvents2">

           <div className="events-all2">
                                  <div className="events-unic2">
                                  <h4>Nenhum evento criado</h4>
                                  <Link to={`/events`}>Criar Agora!</Link>
                              </div>
                             
                          </div>
     
      </div>
       :
        <div className="listEvents2">

=======
        <div className="listEvents2">
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd
             <div className="events-all2">
                                    <div className="events-unic2" key={EventAprtoved?.[0].id}>
                                        <div className="imageCover"> 
                                    <img src={EventAprtoved?.[0].cover} alt="" className="cover"/>
                                        </div>
                                    <img src={EventAprtoved?.[0].avatar} alt="" className="profile"/>
                                    <h4>{EventAprtoved?.[0].name}</h4>
                                    <Link to={`/event/${EventAprtoved?.[0].id}`}>Saber mais</Link>
                                </div>
                               
                            </div>
       
<<<<<<< HEAD
=======
                         
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd
        </div>
    )
}


export { ListEvents, ListEventsUnic }