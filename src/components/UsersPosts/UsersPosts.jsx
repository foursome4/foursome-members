import { useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
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
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
           <img src={avatar} alt="" />
           </Link>
           </div>
           <div className="name">
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
               <h4>{nickname}</h4>
               </Link>
           <p>{date}</p>
           </div>
       </div>
    ) 
}


export {UsersPosts}