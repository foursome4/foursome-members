import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './radar.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { DistanceFromUser } from "../../components/DistanceFromUser/DistanceFromUser"
import { FaPlane} from "react-icons/fa"
import {  useEffect, useState } from "react"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import api from "../../services/api"
import apiInstagram from "../../services/api-instagram"
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

    async function dataApi() {
        const dados = await apiInstagram.get('/jefersonmacedo.dev/?__a=1');
        console.log(dados)
    }

    loadUsersONline();  
    dataApi(); 

      
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
                                    return (
                               user.idAccount === userData.id ? "" :
                               <div className="forun-unic" key={user.idAccount}>
                               <img src={user.avatar} alt="" className="profile"/>
                               <h5>{user.nickname} {user.equalCity === true ? "" : <FaPlane/>}</h5>
                               <DistanceFromUser myLat={lat1} myLong={long1} latFriend={user.lat} longFriend={user.long}/>
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