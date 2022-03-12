
import './chatSlim.css'
import { useEffect, useState } from 'react'
import { FaCircle } from 'react-icons/fa'
import api from '../../services/api'
import { Link } from 'react-router-dom'

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
                    <div className="chat-avatar" key={user.idAccount}>
                        <FaCircle />
                        <a href={user.idAccount === userData.id ? `/profile` : `/profile-friend/${user.idAccount}`}>
                    <img src={user.avatar} alt={user.username} width="35px"/>
                    </a>
                     </div>
                )
            })}
        </div>
    )
}

export {ChatSlim}