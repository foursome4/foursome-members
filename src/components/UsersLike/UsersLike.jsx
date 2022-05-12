import { useState,useEffect, memo} from 'react'
import api from '../../services/api'
import './usersLike.css'

function UsersLikeComponent({idAccount, username}) {
    const LocalInformations = localStorage.getItem("informations-foursome");
    const userInformations = JSON.parse(LocalInformations);
        
    const [nickname, setNickname] = useState('')
    useEffect(() => {
        async function loadInformations() {
            await api.get(`informations/${idAccount}`).then((result) => {
                setNickname(result.data[0].nickname)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadInformations()
    }, [idAccount])

    return (
       <div className="user">
          {nickname === "" ? <a href={`/profile-friend/${idAccount}`}>{username}</a> : userInformations.nickname === nickname ? <a href={`/profile`}>Você</a>: <a href={`/profile-friend/${idAccount}`}>{nickname}</a>} 
       </div>
    ) 
}


export const UsersLike = memo(UsersLikeComponent)