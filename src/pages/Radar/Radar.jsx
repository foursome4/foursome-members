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
import apiGoogleReverse from "../../services/apiGoogleReverse"

function Radar() {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const [lat1, setLat] = useState();
    const [long1, setLong] = useState()

const [users, setUsers] = useState([])
 useEffect(() => {

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
      
 }, [])






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


                        

async function reverseGeolocalization(lat1, long1, lat2, long2) {
    const Distance = await apiGoogleReverse.get(`json?origins=${lat1},${long1}&destinations=${lat2},${long2}&key=AIzaSyAKKy0iHlEZMQavlxNM5i-tkIYp4q7X_Y0`);
    console.log("Distance")
    console.log(Distance)
}

reverseGeolocalization(user.lat, user.long, lat1, long1)









                                    return (
                               user.idAccount === userData.id ? "" :
                               <div className="forun-unic" key={user.idAccount}>
                               <img src={user.avatar} alt="" className="profile"/>
                               <h5>{user.nickname} {user.equalCity === true ? "" : <FaPlane/>}</h5>
                               <h6>+ 1km de você</h6>
                               <a href={user.idAccount === userData.id ? `/profile` : `/profile-friend/${user.idAccount}`}>Ver perfil</a>
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