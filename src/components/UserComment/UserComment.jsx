import { useState,useEffect} from 'react'
import api from '../../services/api'
import './userComment.css'

import { DateFormat } from '../DateFormat/DateFormat';

function UserComment({idAccount, date, role}) {
    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [uf, setUf] = useState('')
    const [city, setCity] = useState('')
    useEffect(() => {
        async function loadInformations() {
            await api.get(`informations/${idAccount}`).then((result) => {
                setNickname(result.data[0].nickname)
                setAvatar(result.data[0].avatar)
                setCity(result.data[0].city)
                setUf(result.data[0].uf)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadInformations()
    }, [idAccount]);




    return (
       <div className="itemComment" key={userData.id}>
           <div className="block1">
           <div className="title">
           <div className="image">
           <a href={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
           {avatar === "" || avatar === undefined ? 
                        <img src={profile} alt={"avatar"} />
                        :
                        <img src={avatar} alt={avatar} />
                        }
           </a>
           </div>
           <div className="name">
           <a href={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
           {nickname === "" || nickname === undefined ?
         <h4>Usuário deletado</h4>
        :
        <h4>{nickname} - {uf}</h4> }
               </a>
                                     <DateFormat date={date}/>
           </div>
           </div>
          
       </div>
       </div>
    ) 
}


export {UserComment}