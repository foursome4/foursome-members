import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../../../../services/api";
import './userConversation.css'

function UserConversation({idAccount, room}) {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [messages, setMessages] = useState([])

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

        async function loadMesages() {
            api.get(`/messages/${room}`).then((result) => {
                setMessages(result.data);
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadInformations()
        loadMesages()
    }, [idAccount, room ]);

 

     const myMessages = useMemo(() => {
        messages.filter((message) => (message.idAccount === user.id));
    }, [messages, user.id]) ;

    const friendMessage = useMemo(() => {
    messages.filter((message) => (message.idAccount !== user.id));
    }, [messages, user.id]) ;

    const newMessages = useMemo(() => {
            if(myMessages !== undefined && friendMessage !== undefined ) {
        friendMessage.filter((messages) => (new Date(messages.created_at) > new Date(myMessages[0].created_at)));
    }
    }, [friendMessage,myMessages ]) ;
 


    return (
        messages.length === 0 ? "" :       
       <div className="item">
           <div className="image">
           <Link to={`/chat/${room}/${idAccount}`}>
           <img src={avatar} alt="" />
           </Link>
           </div>
           <Link to={`/chat/${room}/${idAccount}`}>
           <h4>Eu & {nickname}</h4>
           </Link>
           {newMessages === undefined ? "" :
           <div className="counter">
               {newMessages.length}
            </div>
}
       </div>
    ) 
}


export { UserConversation }