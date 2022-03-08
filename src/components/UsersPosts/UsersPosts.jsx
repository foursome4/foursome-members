import { useState,useEffect} from 'react'
import api from '../../services/api'
import './usersPosts.css'

function UsersPosts({idAccount, username, date}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
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
    }, [idAccount])

    return (
       <div className="itemUsers">
           <div className="image">
           <a href={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
           <img src={avatar} alt="" />
           </a>
           </div>
           <div className="name">
           <a href={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
               <h4>{nickname}</h4>
               </a>
           <p>{date}</p>
           </div>
       </div>
    ) 
}


export {UsersPosts}