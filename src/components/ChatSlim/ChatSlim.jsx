
import './chatSlim.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { socket } from '../../services/websocket'
import {FiLogOut} from 'react-icons/fi'

function ChatSlim() {

    const {socketDataLocation} = useContext(AuthContext)
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

const [users, setUsers] = useState([])
 useEffect(() => {
   socketDataLocation()
 }, [])

 socket.on("userOnline", (data) => {
    console.log("data")
    console.log(data)
    setUsers(data)
})

 const myLocation = users.filter((location) => (location.idAccount === userData.id));
 console.log("myLocation");
 console.log(myLocation);

    
    return (
        
        <div className="content-chat">
            <div className="chat-avatar">
                    <button><FiLogOut /> </button>
                     </div>
            {users.map((user) => {
                return (
                    user.idAccount === myLocation[0].idAccount ? "" :
                    <div className="chat-avatar">
                    <img src={user.avatar} alt="" />
                     </div>
                )
            })}
        </div>
    )
}

export {ChatSlim}