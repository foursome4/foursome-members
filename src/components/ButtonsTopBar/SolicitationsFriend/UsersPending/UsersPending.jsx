import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../services/api";
import './usersPending.css'


function UsersPending({id}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    useEffect(() => {
        async function loadInformations() {
            const idAccount = id
            await api.get(`informations/${idAccount}`).then((result) => {
                setNickname(result.data[0].nickname)
                setAvatar(result.data[0].avatar)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadInformations()
    }, [id])

    return (
       <div className="item">
           <div className="image">
           <Link to={userData.id === id ? `/profile` :`/profile-friend/${id}`}>
           <img src={avatar} alt="" />
           </Link>
           </div>
           <div className="name">
             <Link to={userData.id === id ? `/profile` :`/profile-friend/${id}`}>
           <h4>{nickname}</h4>
           </Link>
           </div>
       </div>
    ) 
}


export { UsersPending }