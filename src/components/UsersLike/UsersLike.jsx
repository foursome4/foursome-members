import { useState,useEffect, memo} from 'react'
import api from '../../services/api'
import './usersLike.css'

function UsersLikeComponent({idAccount, username}) {

    
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
       <div>
          {nickname === "" ? username : nickname } 
       </div>
    ) 
}


export const UsersLike = memo(UsersLikeComponent)