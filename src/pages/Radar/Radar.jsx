import './radar.css'
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { useEffect, useState, useContext, useLayoutEffect } from "react"
import { AuthContext } from "../../contexts/Auth"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import api from "../../services/api"
import { Link } from "react-router-dom"
import {toast} from 'react-toastify';
import {IoLocationOutline, IoPersonOutline} from 'react-icons/io5'

function Radar() {
    const {inactivityTime, logout, updateUserOnline} = useContext(AuthContext);

    // inactivityTime()

    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const [range, setRange] = useState(0);
    const [distancia, setDistancia] = useState([]);
    const [type, setType] = useState("");
    const [emojiSelect, setEmojiSelect] = useState("");
    const [myType, setMyType] = useState(false);
    const [myEmojiSelect, setMyEmojiSelect] = useState("");
    const [style, setStyle] = useState("recolher");
    const [users, setUsers] = useState([]);
    const [myInformations, setMyInformations] = useState(false)
    const id = userData.id

    useEffect(() => {
        async function searchAccount() {
          const res =  await api.get(`accounts/filter/${id}`);
            console.log(res.data)
            if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                logout(id)
            } else {
                console.log("Conta encontrada")
            } 
        }
        async function searchInformations() {
          const res =  await api.get(`informations/${id}`);
            console.log(res.data)
            if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                logout(id)
            } else {
                console.log("Informações encontradas")
            } 
        }
        async function searchCharacteristcs() {
          const res =  await api.get(`characteristics/${id}`);
            console.log(res.data)
            if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                logout(id)
            } else {
                console.log("Caracteristicas encontradas")
            } 
        }
        async function searchPreferences() {
          const res =  await api.get(`preferences/${id}`);
            console.log(res.data)
            if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                logout(id)
            } else {
                console.log("Preferencias encontradas")
                setMyInformations(true)
            } 
        }

        searchAccount()
        searchInformations()
        searchCharacteristcs()
        searchPreferences()
       }, []);


    useEffect(() => {
        async function loadUserOnlineOne() {
            const idAccount = userData.id;
            const res = await api.get(`/online/one/${idAccount}`);
            setUsers(res.data[0]);
        }
    
        loadUserOnlineOne()
    
        async function loadUsersONline() {
            const res = await api.get(`/online`);
            
    
                const myLocation = res.data.filter((location) => (location.idAccount === userData.id)); 
                res.data.forEach((userLocation) => {
    
                   function getDistanceFromLatLonInKm(myLat, myLong, latFriend, longFriend) {
                       console.log(myLat, myLong, latFriend, longFriend)
                       var deg2rad = function (deg) { return deg * (Math.PI / 180); },
                           R = 6371,
                           dLat = deg2rad(latFriend - myLat),
                           dLng = deg2rad(myLong - longFriend),
                           a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                               + Math.cos(deg2rad(myLat))
                               * Math.cos(deg2rad(latFriend))
                               * Math.sin(dLng / 2) * Math.sin(dLng / 2),
                           c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                           console.log(((R * c *1000)/10).toFixed());
                           console.log("Teste de Distancia")
                           console.log((R * c*1000)/1000)
                   
                           const distanceCalc = (R * c).toString();
                           
                           if(distanceCalc.includes("00.")) {
                               number = (((R * c *1000)/1000).toFixed())
                           } else{
                               number = (((R * c *1000)/1000).toFixed())
                           }
    
                           const dados = {
                               distanceKm: parseInt(number),
                               id: userLocation.id,
                               idAccount: userLocation.idAccount,
                               avatar: userLocation.avatar,
                               nickname: userLocation.nickname,
                               equalCity: userLocation.equalCity, 
                               type:userLocation.type,
                               plane: userLocation.plane,
                               emoji: userLocation.emoji,
                               song: userLocation.song,
                               invisible: userLocation.invisible    
                           }
                           setDistancia(oldDistancia => [...oldDistancia, dados])
                   }
                   
                   getDistanceFromLatLonInKm(myLocation[0].lat, myLocation[0].long, userLocation.lat, userLocation.long )
    
           })
    
        }
        loadUsersONline();   
     }, [userData.id])
    



    function handleUpdateInformations(e) {
        e.preventDefault();
            const id = users.id;
            const idAccount = users.idAccount;
            const username = users.username;
            const type = users.type;
            const nickname = users.nickname;
            const avatar = users.avatar;
            const relationship = users.relationship;
            const lat = users.lat;
            const long = users.long;
            const city = users.city;
            const uf = users.uf;
            const actualCity = users.cityActual;
            const actualUf = users.ufActual;
            const equalCity = users.equalCity;
            const plane = users.plane;
            const emoji = myEmojiSelect;
            const song = users.song;
            const invisible = myType            


        updateUserOnline(
            id, idAccount, username, type ,nickname, avatar, relationship, lat, long, city, uf, actualCity, actualUf, equalCity, plane, emoji, song, invisible            
        )
      }
    function handleSelectStyle(e) {
        e.preventDefault();
        if(style === "recolher") {
            setStyle("selections")
        } else {
            setStyle("recolher")
        }
      }

    function handleSetectType(e) {
        setType(e.target.value)
      }

    function handleSetectTEmoji(e) {
        setEmojiSelect(e.target.value)
      }
    function handleSetectMyType(e) {
        setMyType(e.target.value)
      }

    function handleSetectTMyEmoji(e) {
        setMyEmojiSelect(e.target.value)
      }
    
    var number ;





 console.log("DistanciaArray")
 console.log(distancia)
 console.log("User Online Unic")
 console.log(users)

 if(distancia) {
     distancia.sort(function(a,b) {
        if(a.distanceKm < b.distanceKm ) {
            return -1
        } else {
            return true
        }
    })
}

const searchAll = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.type === type && distanciaUser.distanceKm <= range));
const searchEmojiType = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.type === type) );
const searchEmojiRange = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.distanceKm <= range));
const searchTypeRange = distancia.filter((distanciaUser) => (distanciaUser.type === type && distanciaUser.distanceKm <= range));
const searchEmoji= distancia.filter((distanciaUser) => distanciaUser.emoji === emojiSelect );
const searchType= distancia.filter((distanciaUser) =>  distanciaUser.type === type);
const searchDistance= distancia.filter((distanciaUser) => distanciaUser.distanceKm <= range);
const myUserFilter= distancia.filter((distanciaUser) => distanciaUser.idAccount <= userData.id);

console.log(myUserFilter)


const filter = (range > 0) && (emojiSelect === "") && (type === "") ? searchDistance : 
                (range < 1) && (emojiSelect !== "") && (type === "" ) ? searchEmoji : 
                (range < 1) && (emojiSelect === "") && (type !== "") ? searchType : 
                (range < 1) && (emojiSelect !== "") && (type !== "") ? searchEmojiType : 
                (range > 0) && (emojiSelect !== "") && (type === "" ) ? searchEmojiRange : 
                (range > 0) && (emojiSelect === "") && (type !== "") ? searchTypeRange : 
                (range > 0) && (emojiSelect !== "") && (type !== "") ? searchAll : 
                (range < 1) && (emojiSelect === "") && (type === "") ? distancia : 
                distancia


                if(!users) {
                    return (
                        "Carregando..."
                    )
                }

    return (
        <div className="content">
     <ToolbarLeftSlim />
     <BarBottomMenu />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="radar">
                            <div className="radar-selected">
  
                                <button className="selected">Radar</button>
                            </div>


                            {users !== "" || users !== null || users !== undefined ?
                           
                           <div className="mySelections">
                           <div className="text">
                           <h6>{users.invisible === false ? " Você está Visível" : "Você está invisível"}</h6>
                           <h6>{users.emoji === "musica" ? " Hoje você quer balada" :
                                   users.emoji === "emoji" ? "Hoje você quer sexo" :
                                   users.emoji === "viagem" ? "Você está aqui de viagem" : "Deseja escolher um Status?"}</h6>

                                   <button onClick={handleSelectStyle}>Alterar </button>
                           </div>
                           <div className={style === "selections" ? "selections" : "recolher"}>
                               
                       <select value={myType} onChange={handleSetectMyType}>
                           <option value="">Visibilidade</option>
                           <option value={false}>Disponível</option>
                           <option value={true}>Invisível</option>
                       </select>

                       <select value={myEmojiSelect} onChange={handleSetectTMyEmoji}>
                           <option value="">Qual seu status de hoje?</option>
                           <option value="viagem">De viagem ✈️</option>
                           <option value="emoji">Quero Sexo 😈</option>
                           <option value="musica">Partiu Balada 🎶</option>
                       </select>

                       <button onClick={handleUpdateInformations}>Atualizar</button>

                           </div>
                       </div>
                       : "Carregando suas informações"
}

                            <div className="radar-range">
                                <h4>{range} Km</h4>
                                <input type="range" min={0} max={5000} value={range} onChange={(e) => setRange(e.target.value)}/>
                                <h4>5.000 km</h4>
                                <br />
                                <br />
                                <br />
                            </div>
                            <div className="selectFilter">
                            <select className={emojiSelect === "" ? "" : "active"} value={emojiSelect} onChange={handleSetectTEmoji}>
                                <option value="">Quem deseja buscar hoje?</option>
                                <option value="viagem">De viagem ✈️</option>
                                <option value="emoji">Que querem Sexo 😈</option>
                                <option value="musica">Que querem Balada 🎶</option>
                            </select>

                            <select className={type === "" ? "" : "active"} value={type} onChange={handleSetectType}>
                                <option value="">Tipo de conta</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher </option>
                                <option value="Casal">Casal </option>
                                <option value="Trisal">Trisal </option>
                                <option value="Transex">Transex </option>
                                <option value="Travestis">Travestis </option>
                            </select>

                            </div>
                            <div className="radar-all">
                                {filter.map((user) => {
                                    return (
                               user.idAccount === userData.id ? "":
                               user.invisible === true ? "" :
                               <div className="radar-unic" key={user.id}>
                                   <div className="img">
                                   <Link to={user.idAccount === userData.id ? `/profile` : `/profile-friend/${user.idAccount}`}>
                                   <img 
                        src={user.avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                                   </Link>
                                   <h4>{user.emoji === "musica" ? "🎶" : user.emoji === "emoji"? "😈" : user.emoji === "viagem" ? "✈️" :""  }</h4>
                                   </div>
                                   <h6><IoLocationOutline />{user.distanceKm === 0 ? "- 1Km" : ` ${user.distanceKm}Km`}</h6>
                                   <h6><IoPersonOutline /> {user.type}</h6>
                           </div>
                                    )
                                })}

                            </div>
                            <h1>Olá Mundo</h1>
                    <h1>Olá Mundo</h1>

                    </div>

                <ChatSlim />
                </div>
     
            </div>
        </div>
    )
}

export { Radar }