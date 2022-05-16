import { useEffect, useState } from "react";
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { UserConversation } from "../../components/ButtonsTopBar/MyMessages/UserConversation/UserConversation"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import api from "../../services/api";
import "./messages.css"

function Messages() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const [rooms, setRooms] = useState([])
    const [rooms2, setRooms2] = useState([])

    useEffect(() => {
        async function loadRoomIdAccount() {
            const idAccount = user.id
            await api.get(`conversations/account/filter/${idAccount}`)
            .then( async (res) => {
                setRooms(res.data)
            }).catch(error => {
              console.log("Erro ao buscar dados" + error)
          })
          }

          async function loadRoomIDFriend() {
            const idFriend = user.id
            await api.get(`conversations/friend/filter/${idFriend}`)
            .then( async (res) => {
                setRooms2(res.data)
            }).catch(error => {
              console.log("Erro ao buscar dados" + error)
           })
          }

          loadRoomIdAccount()
          loadRoomIDFriend()
    }, [user.id]);


    const newRooms = rooms.concat(rooms2);
    return (
        <div className="Messages">
        <TopBar />
        <h2>Conversas</h2>
        
        <div className="itensMessages">

        {newRooms.map((rooms) => {
            return(
                <div className="rooms" key={rooms.room}>
                    <UserConversation idAccount={rooms.idAccount !== user.id ? rooms.idAccount : rooms.idFriend} room={rooms.room}/>

                </div>
            )
        })}
        </div>

        <ChatSlim />
                 <ToolbarLeftSlim />
                 <BarBottomMenu />


        </div>
    )
}

export { Messages }