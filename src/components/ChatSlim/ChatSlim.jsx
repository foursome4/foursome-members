
import './chatSlim.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { socket } from '../../services/websocket'
import {FiCircle, FiLogOut} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { FaCircle } from 'react-icons/fa'

function ChatSlim() {

    const {socketDataLocation} = useContext(AuthContext)
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

const [users, setUsers] = useState([])
 useEffect(() => {
   socketDataLocation()
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
                        <FaCircle />
                        <a href={user.idAccount === userData.id ? `/profile` : `/profile-friend/${user.idAccount}`}>
                    <img src={user.avatar} alt="" />
                    </a>
                     </div>
                )
            })}
        </div>
    )
}

export {ChatSlim}