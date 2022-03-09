import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import './userConversation.css'

function UserConversation({idAccount, room}) {
    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [messages, setMessages] = useState("75863e")
    console.log(idAccount)
    useEffect(() => {
        async function loadInformations() {
            await api.get(`informations/${idAccount}`).then((result) => {
                console.log(result.data[0])
                setNickname(result.data[0].nickname)
                setAvatar(result.data[0].avatar)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        async function loadMesages() {
            api.get(`/messages/${room}`).then((result) => {
                setMessages(result.data);
                console.log(result.data.length);
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadInformations()
        loadMesages()
    }, [idAccount])

    return (
        messages.length === 0 ? "" :       
       <div className="item">
           <div className="image">
           <Link to={`/chat/${room}`}>
           <img src={avatar} alt="" />
           </Link>
           </div>
           <Link to={`/chat/${room}`}>
           <h4>Eu & {nickname}</h4>
           </Link>
           <div className="counter">
               {messages.length}
            </div>
       </div>
    ) 
}


export { UserConversation }