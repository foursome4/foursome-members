import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './radar.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { FaPlane} from "react-icons/fa"
import {  useEffect, useState } from "react"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import apiGoogleReverse from "../../services/apiGoogleReverse"
import api from "../../services/api"
import axios from 'axios';
import { Link } from "react-router-dom"

function Radar() {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const [lat1, setLat] = useState();
    const [long1, setLong] = useState()

const [users, setUsers] = useState([])
useEffect(() => {

    async function loadUsersONline() {
        await api.get("/online").then((res) => {
            setUsers(res.data)
            console.log(res.data);
            const myLocation = res.data.filter((location) => (location.idAccount === userData.id));
            console.log(myLocation[0])
            console.log(myLocation[0].lat)
            console.log(myLocation[0].long)
           
            setLat(myLocation[0].lat)
            setLong(myLocation[0].long)
        })
    }

    loadUsersONline();   

      
 }, [userData.id])

 console.log(lat1)
 console.log(long1)


    return (
        <div className="content">
     <ToolbarLeftSlim />
     <BarBottomMenu />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="radar">
                            <div className="radar-selected">
                                <button className="selected">Radar</button>
                            </div>
                            <div className="radar-range">
                                <h4>0 km</h4>
                                <input type="range" />
                                <h4>1.000 km</h4>
                            </div>
                            <div className="radar-all">
                                {users.map((user) => {

                   

// function reverseGeolocalization() {
//     apiGoogleReverse.get(`/distancematrix/json?origins=-22.8447154,-42.0592233&destinations=-22.7012879,-42.6334516&key=AIzaSyAKKy0iHlEZMQavlxNM5i-tkIYp4q7X_Y0`).then((result) => {
//         console.log("Distance")
//         console.log(result.data)
//     }).catch(error => {
//         console.log(error)
//     })
// }


// reverseGeolocalization();
// console.log(user.lat, user.long, lat1, long1);

let distance = 0;
function getDistanceFromLatLonInKm(lat1, long1, lat2, long2) {
    "use strict";
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        dLat = deg2rad(lat2 - lat1),
        dLng = deg2rad(long1 - long2),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(lat1))
            * Math.cos(deg2rad(lat2))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        console.log(((R * c *1000)/10).toFixed());
        console.log("Teste de Distancia")
        console.log((R * c*1000)/1000)

        const distanceCalc = (R * c).toString();
        
        if(distanceCalc.includes("00.")) {
            distance = "- " + ((R * c *1000)/1000).toFixed() + "Km"
        } else{
            distance = ((R * c *1000)/1000).toFixed() + "Km"
        }
    return ((R * c *1000).toFixed());
}

getDistanceFromLatLonInKm(user.lat, user.long, lat1, long1 )




                                    return (
                               user.idAccount === userData.id ? "" :
                               <div className="forun-unic" key={user.idAccount}>
                               <img src={user.avatar} alt="" className="profile"/>
                               <h5>{user.nickname} {user.equalCity === true ? "" : <FaPlane/>}</h5>
                               <h6>{distance} de você</h6>
                               <Link to={user.idAccount === userData.id ? `/profile` : `/profile-friend/${user.idAccount}`}>Ver perfil</Link>
                           </div>
                                    )
                                })}

                            </div>
                    </div>
                <ChatSlim />
                </div>
            </div>
        </div>
    )
}

export { Radar }