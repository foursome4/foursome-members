
import './chatSlim.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { socket } from '../../services/websocket'
import {FiLogOut} from 'react-icons/fi'

function ChatSlim() {

    const {socketDataLocation} = useContext(AuthContext)
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const [estilo, setEstilo] = useState(true)

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
   socketDataLocation()
 }, [])

 const myLocation = users.filter((location) => (location.idAccount === userData.id));

function handleEstilo(e) {
    e.preventDefault();

    setEstilo(false)
}       
    return (
        
        <div className={estilo === true ? "content-chat" : "content-chat-hidden"}>
            <div className="chat-avatar">
                    <button onClick={handleEstilo}><FiLogOut /> </button>
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