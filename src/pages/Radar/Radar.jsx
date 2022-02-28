import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './radar.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { FaPlane} from "react-icons/fa"
import { socket } from '../../services/websocket'
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/Auth"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"

function Radar() {
    const {socketDataLocation} = useContext(AuthContext)
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const [lat1, setLat] = useState();
    const [long1, setLong] = useState()

const [users, setUsers] = useState([])
 useEffect(() => {
   socketDataLocation()

   socket.on("userOnline", (data) => {
       console.log("data")
       console.log(data)
       setUsers(data)
       
       const myLocation = data.filter((location) => (location.idAccount === userData.id));
        console.log(myLocation[0])
        console.log(myLocation[0].lat)
        console.log(myLocation[0].long)
       
        setLat(myLocation[0].lat)
        setLong(myLocation[0].long)
      })
      
 }, [socketDataLocation])






  //end Function calculate distance

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


                                // Function calculate distance
                                function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
                                    var R = 6371; // Radius of the earth in km
                                    var dLat = deg2rad(lat1-lat2);  // deg2rad below
                                    var dLon = deg2rad(lon1-lon2); 
                                    var a = 
                                    Math.sin(dLat/2) * Math.sin(dLat/2) +
                                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                                    Math.sin(dLon/2) * Math.sin(dLon/2)
                                    ; 
                                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                                    var d = R * c; // Distance in km
                                    return d;
                                }
                                
                                function deg2rad(deg) {
                                    console.log(deg * (Math.PI/180))

                                    // const distance = deg * (Math.PI/180);

                                    
                                    // var km = Math.round(distance / 100) /10;  
                                    // console.log(km + " Km")
                                    
                                    // var km2 = Math.round(distance * 100) /10 ;  
                                    // console.log(km2 + " Metros")
                                    // let newDistance;
                                    // if(km === 0) {
                                    //     newDistance = km
                                    //     console.log("newDistance") 
                                    //     console.log(newDistance + " Km") 
                                    // } else  if(km !== 0 ){
                                    //     newDistance = km2
                                    //     console.log("newDistance") 
                                    //     console.log(newDistance + " Metros") 

                                    // }


                                }

                                getDistanceFromLatLonInKm(lat1, long1, user.lat, user.long)









                                    return (
                               user.idAccount === userData.id ? "" :
                               <div className="forun-unic" key={user.idAccount}>
                               <img src={user.avatar} alt="" className="profile"/>
                               <h5>{user.nickname} {user.equalCity === true ? "" : <FaPlane/>}</h5>
                               <h6>+ 1km de você</h6>
                               <Link to={`/profile`}>Ver perfil</Link>
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