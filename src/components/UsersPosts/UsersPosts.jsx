import { useState,useEffect, memo} from 'react'
import { Link } from 'react-router-dom';
import api from '../../services/api'
import { DateFormat } from '../DateFormat/DateFormat';
import './usersPosts.css'

function UsersPostsComponent({idAccount, username, date, keyId, role}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
    
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
    }, [idAccount])

    return (
       <div className="itemUsers" key={keyId}>
           <div className="image">
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
           {avatar === "" || avatar === undefined ? 
                        <img src={profile} alt={"avatar"} />
                        :
                        <img src={avatar} alt={avatar} />
                        }
           </Link>
           </div>
           <div className="name">
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
           {nickname === "" || nickname === undefined ?
         <h4>Usuário deletado</h4>
        :
        <h4>{nickname} - {uf}</h4> }
               </Link>
           <DateFormat date={date} />
           </div>
       </div>
    ) 
}


export const UsersPosts = memo(UsersPostsComponent)