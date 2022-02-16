import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import avatarImg2 from '../../assets/images/avatar2.png'
import avatarImg3 from '../../assets/images/avatar3.png'
import avatarImg4 from '../../assets/images/avatar4.png'
import avatarImg5 from '../../assets/images/avatar5.png'
import avatarImg6 from '../../assets/images/avatar6.png'
import './radar.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { socket } from '../../services/websocket'
import { useEffect, useState } from "react"

function Radar() {

const [users, setUsers] = useState([])
 useEffect(() => {
   function loadUserOnline() {
    socket.on("userOnline", (data) => {
        console.log("data")
        console.log(data)
        setUsers(data)
    })
   }

   loadUserOnline()
 }, [])

    return (
        <div className="content">
     <ToolbarLeftSlim />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="foruns">
                            <div className="foruns-selected">
                                <button className="selected">Radar</button>
                            </div>
                            <div className="foruns-range">
                                <h4>0 km</h4>
                                <input type="range" />
                                <h4>1.000 km</h4>
                            </div>
                            <div className="foruns-all">
                                {users.map((user) => {
                                    return (
                                <div className="forun-unic" key={user.idAccount}>
                                    <img src={user.avatar} alt="" className="profile"/>
                                    <h5>{user.nickname}</h5>
                                    <h6>+ 1km de você</h6>
                                    <button>Ver perfil</button>
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