import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import './userConversation.css'

function UserConversation({idAccount, room}) {
    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
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

        loadInformations()
    }, [])

    return (
       <div className="item">
           <div className="image">
           <a href={`/chat/${room}`}>
           <img src={avatar} alt="" />
           </a>
           </div>
           <a href={`/chat/${room}`}>
           <h3>Eu & {nickname}</h3>
           </a>
       </div>
    ) 
}


export { UserConversation }