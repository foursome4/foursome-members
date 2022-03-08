
import './chatSlim.css'
import { useEffect, useState } from 'react'
import {FiLogOut} from 'react-icons/fi'
import { FaCircle } from 'react-icons/fa'
import api from '../../services/api'

function ChatSlim() {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

const [users, setUsers] = useState([])

useEffect(() => {
    async function loadUsersONline() {
        await api.get("/online").then((res) => {
            setUsers(res.data)
        })
    }

    loadUsersONline()
}, [users])

     
    return (
        
        <div className="content-chat">

            {users.map((user) => {
                return (
                    user.idAccount === userData.id ? "" :
                    <div className="chat-avatar" key={user.id}>
                        <FaCircle />
                        <a href={user.idAccount === userData.id ? `/profile` : `/profile-friend/${user.idAccount}`}>
                    <img src={user.avatar} alt={user.idAccount} />
                    </a>
                     </div>
                )
            })}
        </div>
    )
}

export {ChatSlim}