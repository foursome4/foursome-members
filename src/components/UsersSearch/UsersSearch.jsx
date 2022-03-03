import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import './usersSearch.css'


function UsersSearch({id, username}) {
    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    console.log(id)
    useEffect(() => {
        async function loadInformations() {
            const idAccount = id
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
           <a href={`/profile-friend/${id}`}>
           <img src={avatar} alt="" />
           </a>
           </div>
           <div className="name">
             <a href={`/profile-friend/${id}`}>
           <h3>{nickname}</h3>
           </a>
           <h5>{id} - {username}</h5>
           </div>
       </div>
    ) 
}


export { UsersSearch }