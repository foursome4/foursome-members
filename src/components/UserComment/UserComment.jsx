import { useState,useEffect} from 'react'
import api from '../../services/api'
import './userComment.css'

import { DateFormat } from '../DateFormat/DateFormat';
import { Link } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa';

function UserComment({idAccount, date, role}) {
    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);
    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [uf, setUf] = useState('')
    const [city, setCity] = useState('')
    const [país, setPaís] = useState('')
    const [status, setStatus] = useState('')
    useEffect(() => {
        async function loadInformations() {
            await api.get(`/accounts/filter/${idAccount}`).then((result) => {
                setNickname(result.data[0].nickname)
                setAvatar(result.data[0].avatar)
                setCity(result.data[0].city)
                setUf(result.data[0].uf)
                setPaís(result.data[0].país)
                setStatus(result.data[0].status)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadInformations()
        async function loadStatus() {
            await api.get(`accounts/filter/${idAccount}`).then((result) => {
                setStatus(result.data[0].status)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadStatus()
    }, [idAccount]);




    return (
       <div className="itemComment" key={userData.id}>
           <div className="block1">
           <div className="title">
           <div className="image">
           {nickname === "" || nickname === undefined ?
            <Link to="">
               <img src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e24" />
           </Link>
           :
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
           {avatar === "" || avatar === undefined ? <>
           <img 
           src={profile}
           onError={({ currentTarget }) => {
               currentTarget.onerror = null; // previne loop
               currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
           }}
           />
           {status === "premium" || status === "lifetime" ? <FaCrown /> : ""}
           </>
                        :
                        <>
                        <img 
                        src={avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                      {status === "premium" || status === "lifetime" ? <FaCrown /> : ""}
                        </>
                        }
           </Link>}
           </div>
           <div className="name">
           {nickname === "" || nickname === undefined ?
            <Link to="">
          <h4>Usuário não encontrado</h4>
                </Link> :
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
                    {
                      idAccount === "67789f" ||
                      idAccount === "503465" ||
                      idAccount === "2ac0f7" ||
                      idAccount === "e90897" ||
                      idAccount === "4aabed" ||
                      idAccount === "7b9f35" 
                    ?
                    <h4>{nickname} {país === "Brasil" ? "🇧🇷" : país === "Portugal" ? "🇵🇹" : ""}</h4>
                    :
                    <h4>{nickname} - {país === "Brasil" ? uf : país === "Portugal" ? `${city} - ${país}` : uf} {país === "Brasil" ? "🇧🇷" : país === "Portugal" ? "🇵🇹" : ""}</h4>
                  }
               </Link>}
              <DateFormat date={date}/>
           </div>
           </div>
       </div>
       </div>
    ) 
}


export {UserComment}