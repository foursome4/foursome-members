
import './chatSlim.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { socket } from '../../services/websocket'
import {FiCircle, FiLogOut} from 'react-icons/fi'

function ChatSlim() {

    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

const [users, setUsers] = useState([])
 useEffect(() => {
 }, [])

 socket.on("userOnline", (data) => {
    setUsers(data)
})

     
    return (
        
        <div className="content-chat">
            <div className="chat-avatar">
                    <button><FiLogOut /> </button>
                     </div>
            {users.map((user) => {
                return (
                    user.idAccount === userData.id ? "" :
                    <div className="chat-avatar" key={user.id}>
                        <FiCircle />
                    <img src={user.avatar} alt="" />
                     </div>
                )
            })}
        </div>
    )
}

export {ChatSlim}