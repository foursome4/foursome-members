import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './radar.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { DistanceFromUser } from "../../components/DistanceFromUser/DistanceFromUser"
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../contexts/Auth"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import api from "../../services/api"
import apiInstagram from "../../services/api-instagram"
import { Link } from "react-router-dom"
import { UserRadar } from "../../components/UserRadar/UserRadar"

function Radar() {
    const {inactivityTime} = useContext(AuthContext);

    inactivityTime()

    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const [lat1, setLat] = useState();
    const [long1, setLong] = useState();
    const [distancia, setDistancia] = useState();

    const list = [];
    var number ;

const [users, setUsers] = useState([])
useEffect(() => {

    async function loadUsersONline() {
        await api.get("/online").then((res) => {
            setUsers(res.data)
            console.log(res.data);
            const myLocation = res.data.filter((location) => (location.idAccount === userData.id)); 
            setLat(myLocation[0].lat);
            setLong(myLocation[0].long);
            console.log(myLocation[0].lat);
            console.log(myLocation[0].long);
            console.log(res.data.lat, res.data.long)

            users.forEach((userLocation) => {
                let distance = 0;
               function getDistanceFromLatLonInKm(myLat, myLong, latFriend, longFriend) {
                   var deg2rad = function (deg) { return deg * (Math.PI / 180); },
                       R = 6371,
                       dLat = deg2rad(latFriend - myLat),
                       dLng = deg2rad(myLong - longFriend),
                       a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                           + Math.cos(deg2rad(myLat))
                           * Math.cos(deg2rad(latFriend))
                           * Math.sin(dLng / 2) * Math.sin(dLng / 2),
                       c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                       console.log(((R * c *1000)/10).toFixed());
                       console.log("Teste de Distancia")
                       console.log((R * c*1000)/1000)
               
                       const distanceCalc = (R * c).toString();
                       
                       if(distanceCalc.includes("00.")) {
                           number = (((R * c *1000)/1000).toFixed())
                       } else{
                           number = (((R * c *1000)/1000).toFixed())
                       }
                       const dados = {
                           distance: number,
                           id: userLocation.id,
                           idAccount: userLocation.idAccount,
                           avatar: userLocation.avatar,
                           nickname: userLocation.nickname,
                           equalCity: userLocation.equalCity,     
                       }
   
                       console.log("dados")
                       console.log(dados)
                       list.push(dados)
               }
               
               getDistanceFromLatLonInKm(myLocation[0].lat, myLocation[0].long, res.data.lat, res.data.long )

       })
       console.log(list)
       setDistancia(list);
        })
    }
    loadUsersONline();   
 }, [userData.id])


 console.log("DistanciaArray")
 console.log(distancia)
 console.log("List Array")
 console.log(list)

 


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
                                {/* <h4>0 km</h4>
                                <input type="range" />
                                <h4>1.000 km</h4> */}
                                <br />
                                <br />
                                <br />
                            </div>
                            <div className="radar-all">
                                {users.map((user) => {
                                    return (
                               user.idAccount === userData.id ? "" :
                               <div className="radar-unic" key={user.id}>
                                   <div className="img">
                                   <Link to={user.idAccount === userData.id ? `/profile` : `/profile-friend/${user.idAccount}`}>
                               <img src={user.avatar} alt="" className="profile"/>
                                   </Link>
                                   </div>
                                    {/* <UserRadar nickname={user.nickname} equalCity={user.equalCity} idAccount={user.idAccount}/> */}
                               <DistanceFromUser myLat={lat1} myLong={long1} latFriend={user.lat} longFriend={user.long}/>
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