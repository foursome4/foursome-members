import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import api from "../../../../services/api";
import './userConversation.css'

function UserConversation({idAccount, room}) {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        async function loadInformations() {
            await api.get(`informations/${idAccount}`).then((result) => {
                setNickname(result.data[0].nickname)
                setAvatar(result.data[0].avatar)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }
        loadInformations()
    }, [idAccount, room ]);

 

    const {data} = useFetch(`/messages/${room}`);

    let myMessages = [];
    let friendMessage = [];
    let newMessages = [];

    if(data) {

        myMessages = data?.filter((message) => (message.idAccount === user.id));

        friendMessage =  data?.filter((message) => (message.idAccount !== user.id));

        newMessages = friendMessage.filter((messages) => (myMessages !== undefined && friendMessage !== undefined ? new Date(messages.created_at) > new Date(myMessages[0].created_at) : ""))
    }


    return (
        data?.length === 0 ? "" :       
       <div className="item">
           <div className="image">
           <Link to={`/chat/${room}/${idAccount}`}>
           <img src={avatar} alt="" />
           </Link>
           </div>
           <Link to={`/chat/${room}/${idAccount}`}>
           <h4>Eu & {nickname}</h4>
           </Link>
           {newMessages.length === 0 ? "" :
           <div className="counter">
               {newMessages.length }
            </div>
}
       </div>
    ) 
}


export { UserConversation }