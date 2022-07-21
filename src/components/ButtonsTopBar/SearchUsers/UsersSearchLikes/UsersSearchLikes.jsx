import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import api from "../../../../services/api";
import './usersSearchLikes.css'


function UsersSearchLikes({idAccount}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    console.log(idAccount)

    const [nickname, setNickname] = useState("")
    const [city, setCity] = useState("")
    const [uf, setUf] = useState("")
    const [país, setPaís] = useState("")
    const [avatar, setAvatar] = useState("")

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

    const {data} = useFetch(`/informations/${idAccount}`);

    useEffect(() => {
        async function loadInformations() {
            await api.get(`/informations/${idAccount}`).then((res) => {
                console.log(res.data)
                console.log(res.data[0])
                        setNickname(res.data[0].nickname);
                        setAvatar(res.data[0].avatar);
                        setCity(res.data[0].city);
                        setUf(res.data[0].uf);
                        setPaís(res.data[0].país);
            })
        }
        loadInformations()
    }, [idAccount])

    // if(data) {
    //     console.log(data);

    //     setNickname(data?.[0].nickname);
    //     setAvatar(data?.[0].avatar);
    //     setCity(data?.[0].city);
    //     setUf(data?.[0].uf);
    //     setPaís(data?.[0].país);
    // }

 console.log({nickname, avatar, city, uf, país})

    if(!data) {
      return (
          <div className="load">
              <h5>Carregando...</h5>
          </div>
      )
  }


    return (
        <>
        {nickname === "" || nickname === undefined ? "" :
       <div className="item-search" key={idAccount}>
           <div className="image">
           {nickname === "" || nickname === undefined ||  nickname === null ?
            <Link to="">
               <img src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e24" />
           </Link>
           :
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
           {avatar === "" || avatar === undefined ? 
                                                           <img 
                                                           src={profile}
                                                           onError={({ currentTarget }) => {
                                                               currentTarget.onerror = null; // previne loop
                                                               currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                                                           }}
                                                           />
                        :
                        <img 
                        src={avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                        }
           </Link>}
            </div>
           <div className="name">
           {nickname === "" || nickname === undefined ?
            <Link to="">
          <h4>Usuário não encontrado</h4>
                </Link> :
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
                 <h4>{nickname} - {país === "Brasil" ? uf : city} {país === "Brasil" ? "🇧🇷" : país === "Portugal" ? "🇵🇹" : ""}</h4>
               </Link>}
           </div>
       </div>
        }
       </>
    ) 
}


export { UsersSearchLikes }