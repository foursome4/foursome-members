import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './radar.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { DistanceFromUser } from "../../components/DistanceFromUser/DistanceFromUser"
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../contexts/Auth"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import api from "../../services/api"
import apiInstagram from "../../services/api-instagram"
import { Link } from "react-router-dom"
import { UserRadar } from "../../components/UserRadar/UserRadar"
import {toast} from 'react-toastify';

function Radar() {
    const {inactivityTime} = useContext(AuthContext);

    // inactivityTime()

    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const [range, setRange] = useState(0);
    const [distancia, setDistancia] = useState([]);
    const [type, setType] = useState("");
    const [emojiSelect, setEmojiSelect] = useState("");
    const [myType, setMyType] = useState("");
    const [myEmojiSelect, setMyEmojiSelect] = useState("");
    const [style, setStyle] = useState("recolher");



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
        toast(e.target.value)
        setMyType(e.target.value)
      }

    function handleSetectTMyEmoji(e) {
        toast(e.target.value)
        setMyEmojiSelect(e.target.value)
      }
    
    var number ;

const [users, setUsers] = useState([])
useEffect(() => {

    async function loadUsersONline() {
        const res = await api.get(`/online`);
        setUsers(res.data)

            const myLocation = res.data.filter((location) => (location.idAccount === userData.id)); 
            res.data.forEach((userLocation) => {
                let distance = 0;

                console.log("Variavel distancia ");



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
                           console.log(((R * c *1000)/1000).toFixed())
                       } else{
                           number = (((R * c *1000)/1000).toFixed())
                          console.log(((R * c *1000)/1000).toFixed())
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
   
                       console.log("dados")
                       console.log(dados.distanceKm)
                       setDistancia(oldDistancia => [...oldDistancia, dados])
               }
               
               getDistanceFromLatLonInKm(myLocation[0].lat, myLocation[0].long, userLocation.lat, userLocation.long )

       })

    }
    loadUsersONline();   
 }, [userData.id])


 console.log("DistanciaArray")
 console.log(distancia)
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
const myData = distancia.filter((user) => user.idAccount === userData.id);
console.log(myData)
console.log(parseInt(range))
console.log(searchAll)
console.log(emojiSelect)

const filter = (range > 0) && (emojiSelect === "") && (type === "") ? searchDistance : 
                (range < 1) && (emojiSelect !== "") && (type === "" ) ? searchEmoji : 
                (range < 1) && (emojiSelect === "") && (type !== "") ? searchType : 
                (range < 1) && (emojiSelect !== "") && (type !== "") ? searchEmojiType : 
                (range > 0) && (emojiSelect !== "") && (type === "" ) ? searchEmojiRange : 
                (range > 0) && (emojiSelect === "") && (type !== "") ? searchTypeRange : 
                (range > 0) && (emojiSelect !== "") && (type !== "") ? searchAll : 
                (range < 1) && (emojiSelect === "") && (type === "") ? distancia : 
                distancia


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
                                                        {/* <div className="mySelections">
                                                        <div className="text">
                                                        <h4>{myData[0].invisible === false ? " Você está Visível" : "Você está invisível"}</h4>
                                                        <h4>{myData[0].emoji === "musica" ? " Hoje você quer balada" :
                                                                myData[0].emoji === "emoji" ? "Hoje você quer sexo" :
                                                                myData[0].emoji === "viagem" ? "Você está aqui de viagem" : "Deseja escolher um Status?"}</h4>
                        
                                                                <button onClick={handleSelectStyle}>Alterar Status ou visibilidade</button>
                                                        </div>
                                                        <div className={style === "selections" ? "selections" : "recolher"}>
                                                            
                                                    <select value={type} onChange={handleSetectMyType}>
                                                        <option value="">Visibilidade</option>
                                                        <option value={false}>Disponível</option>
                                                        <option value={true}>Invisível</option>
                                                    </select>
                        
                                                    <select value={emojiSelect} onChange={handleSetectTMyEmoji}>
                                                        <option value="">Qual seu status de hoje?</option>
                                                        <option value="viagem">De viagem ✈️</option>
                                                        <option value="emoji">Que querem Sexo 😈</option>
                                                        <option value="musica">Que querem Balada 🎶</option>
                                                    </select>
                        
                                                        </div>
                                                    </div> */}


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
                               user.idAccount === userData.id ? "" :
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
                                   <h6>{user.distanceKm === 0 ? "- 1Km" : ` ${user.distanceKm}Km`}</h6>
                                   <h6>{user.type}</h6>
                           </div>
                                    )
                                })}

                            </div>
                    </div>
                <ChatSlim />
                </div>
            </div>
        </div>
    )
}

export { Radar }