import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../services/api";
import './usersNotifications.css'


function UsersNotifications({id, text}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const [avatar, setAvatar] = useState('')
    useEffect(() => {
        async function loadInformations() {
            const idAccount = id

            if(id !== null) {
                await api.get(`informations/${idAccount}`).then((result) => {
                    setAvatar(result.data[0].avatar)
                }).catch((error) => {
                    console.log(error)
                    console.log("Erro aos buscar informações")
                })
            }
        }

        loadInformations()
    }, [id])

    return (
       <div className="item">
          { id !== null ?
           <div className="image">
           <Link to={userData.id === id ? `/profile`:`/profile-friend/${id}`}>
           <img src={avatar} alt="" />
           </Link>
           </div>
           : ""
            }
           <div className="name">
           <p>{text}</p>
           </div>
       </div>
    ) 
}


export { UsersNotifications }