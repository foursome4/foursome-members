import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import {FiCheck, FiCheckSquare, FiHome, FiInfo, FiMoreVertical, FiUser, FiXSquare} from 'react-icons/fi'
import './eventIndividual.css'

import {useContext, useEffect, useState } from 'react'
import api from '../../services/api'
import { ChatSlim } from '../../components/ChatSlim/ChatSlim'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth'
import { FeedPostEvent } from '../../components/FeedPostEvent/FeedPostEvent'
import { PostTextEvent } from '../../components/PostTextEvent/PostTextEvent'
import { set } from 'date-fns/esm'
import { BarBottomMenu } from '../../components/BarBottomMenu/BarBottomMenu'


function EventIndividual() {
  const {id} = useParams();
  console.log(id)
  const {socketDataLocation} = useContext(AuthContext)

  const [feed, setFeed] = useState("feed");
  const [member, setMember] = useState("");
  const [info, setInfo] = useState("");
  const [newMember, setNewMember] = useState(true)

  const [avatar, setAvatar] = useState();
    const [cover, setCover] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [theme, setTheme] = useState("");
    const [date, setDate] = useState("");
    const [street, setStreet] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [reference, setReferencee] = useState("");
    const [complement, setComplement] = useState("");
    const [cep, setCep] = useState("");
    const [number, setNumber] = useState("")
      const [idEvent, setIdEvent] = useState("");
      const [idAccount, setIdAccount] = useState("");
      const [nickname, setNickname] = useState("");
      const [username, setUsername] = useState("");
      const [avatarUser, setAvatarUser] = useState("");


  useEffect(() => {
    async function loadGroups(){
        await api.get(`/events/${id}`).then((result) => {
            console.log(result.data[0]);
                setAvatar(result.data[0].avatar);
                setCover(result.data[0].cover);
                setName(result.data[0].name);
                setTheme(result.data[0].theme);
                setDescription(result.data[0].description);
                setIdAccount(result.data[0].idAccount);
                setUsername(result.data[0].username);
                setNickname(result.data[0].nickname);
                setAvatarUser(result.data[0].avatarUser);
                setIdEvent(result.data[0].id);
                setDate(result.data[0].date);
                setDistrict(result.data[0].district);
                setStreet(result.data[0].street);
                setCity(result.data[0].city);
                setUf(result.data[0].uf);
                setReferencee(result.data[0].reference);
                setComplement(result.data[0].complement);
                setNumber(result.data[0].number);
                setCep(result.data[0].cep);
        })
    }

    loadGroups()
    socketDataLocation()
}, [socketDataLocation]);


     function handleFeed() {
      setInfo("")
        setFeed("feed")
        setMember("")

    }
    function handleMembers() {
      setInfo("")
      setFeed("")
      setMember("member")

    }
  
    function handleInfo() {
      setInfo("info")
      setFeed("")
      setMember("")

    }
    function handleAddMembers() {
        setNewMember(true)
    }
    function handleDeleteMembers() {
      setNewMember(false)
    }
  

   
  return (
      <div className="container">
    <div className="content-profile">
      <ToolbarLeftSlim />
      <BarBottomMenu />
      <div className="profile">
        <TopBar />
        <div className="main">
         <div className="section">
          <div className="cover">
  
              <img src={ cover} alt="" />
          </div>
            <div className="profile-tool">
                <div className="user">
                 <div className="user-img">
                   <img src={avatar} alt="" />
                   </div>
                  <h4> <b>{name}</b></h4>
                </div>
                <div className="tools">
                  <button className={feed === "" ? "" : "select"} onClick={handleFeed}><FiHome size={16}/> Home</button>
                  <button className={info === "" ? "" : "select"} onClick={handleInfo}><FiInfo size={16}/> Infos</button>
                 {newMember === true ?  <button onClick={handleAddMembers}><FiCheckSquare size={16}/> Confirmar</button> :
                  <button onClick={handleDeleteMembers}><FiXSquare size={16}/> Remover</button> }
                  <button className={member === "" ? "" : "select"} onClick={handleMembers}><FiUser size={16}/> Confirmados</button>
                  <button  className='settings'><FiMoreVertical size={16}/></button>
                </div>
            </div>
          <div className="sections">
              <div className="infos">
              <div className="info">
              <div className="name">
                   <h3>Sobre o evento</h3>
                   <div className='bar'></div>
                   <h5>{description}</h5>
                   <br />
                   <img src={avatar} alt="" />
                   <br />
                   <h5><b>Endereço</b></h5>
                   <h6>{street}, {number}</h6>
                   <h6>{district} - {city} - {uf}</h6>
                   <h6>{complement}</h6>
                   <h6>Referência: {reference}</h6>
                   <br />
                   <h3>Criado por</h3>
                   <div className='bar'></div>
                   <div className="creator">
                     <div className="image">
                       <img src={avatarUser}alt="" />
                     </div>
                     <h4>{nickname}</h4>
                     <h5>{username}</h5>
                   </div>

            </div>
            </div>
            </div>
                     <div className="feed">
                  {feed === "feed" ?
                  <>
                    <PostTextEvent nameEvent={name} idEvent={id}/>
                    <br /><br />
                    <FeedPostEvent idEvent={id} />
                  </>
                  :
                  info === "info" ?
                  <div className='informações'>
                    <h3>{name}</h3>
                    <h4>{description}</h4>
                   <h5>{street}, {number}</h5>
                   <h5>{district} - {city} - {uf}</h5>
                   <h5>{complement}</h5>

                   <div className="bar"></div>
                   <img src={avatar} alt="" />

                  </div> 
                  :
                 
                  "Nada para mostrar"
                  
                }
                </div>

                  
                </div>
               
                    </div>
            </div>
         </div>
         <ChatSlim /> 
        </div>
      </div>

  )
}

export { EventIndividual }