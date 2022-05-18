import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import api from "../../../../services/api";
import './userConversation.css';


function UserConversation({idAccount, room}) {
    console.log(idAccount)
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [uf, setUf] = useState('')

    useEffect(() => {
        async function loadInformations() {
            await api.get(`informations/${idAccount}`).then((result) => {
                if(result.data[0] !== undefined) {
                    setAvatar(result.data[0].avatar)
                    setNickname(result.data[0].nickname)
                    setUf(result.data[0].uf)
                }
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

    }
    newMessages = friendMessage?.filter((messages) => (myMessages !== undefined && friendMessage !== undefined ? new Date(messages.created_at) > new Date(myMessages[0]?.created_at) : ""))


    return (
        data?.length === 0 ? "" :       
       <div className="item">
           <div className="image">
           <Link to={`/chat/${room}/${idAccount}`}>
           {avatar === "" || avatar === undefined ?
          <img src={profile} alt="" />
          :
          <img src={avatar} alt="" />
           }
          
           </Link>
           </div>
           <Link to={`/chat/${room}/${idAccount}`}>
         {nickname === "" || nickname === undefined ?
         <h4>Usuário deletado</h4>
        :
        <h4>{nickname} - {uf}</h4> }
           </Link>
           {newMessages.length === 0 ? "" :
           <div className="counter-conversation">
               {newMessages.length }
            </div>
}
       </div>
       
    ) 
}


export { UserConversation }