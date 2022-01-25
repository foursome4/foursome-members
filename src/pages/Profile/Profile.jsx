// import { ChatSlim } from '../../components/ChatSlim/ChatSlim'
import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import coverImg from '../../assets/images/cover.png'
import avatar from '../../assets/images/avatar.png'
import {FiHome, FiImage, FiVideo, FiUsers, FiList, FiCalendar, FiSettings, FiMoreVertical} from 'react-icons/fi'
import './profile.css'
import { Post } from '../../components/Post/Post'
import { FaMars } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import {FeedPost} from "../../components/FeedPost/FeedPost"
import api from '../../services/api'


function Profile() {
  const [dataUser, setDataUser] = useState(null)
  const Local = localStorage.getItem("foursome");
  const user = JSON.parse(Local)


    useEffect(() => {
      const LocalData = localStorage.getItem("foursome");
      const userData = JSON.parse(LocalData);
      const idUser = userData.id;
      console.log("userData.id")
      console.log(userData.id)
      async function loadInformations() {
        await api.get(`/informations/${idUser}`)
    .then((res) => {
        console.log("res.data");
        console.log(res.data[0])
        setDataUser(res.data[0])
    }).catch(error => {
        console.log("Erro ao buscar dados" + error)
    })
      }


      loadInformations()
    }, [])

    

  return (
      <div className="container">
    <div className="content-profile">
      <ToolbarLeftSlim />
      <div className="profile">
        <TopBar />
        <div className="main">
         <div className="section">
          <div className="cover">
              <img src={ dataUser !== null ? dataUser.cover : coverImg} alt="" />
          </div>
            <div className="profile-tools">
                <div className="user">
                  <img src={dataUser !== null ? dataUser.avatar : avatar} alt="" />
                  <h3> <b>{dataUser !== null ? dataUser.nickname :"User Test"}</b></h3>
                </div>
                <div className="tools">
                  <button className='select'><FiHome size={16}/></button>
                  {/* <button><FiUser size={16}/></button>
                  <button><FiUserPlus size={16}/></button> */}
                  <button><FiImage size={16}/></button>
                  <button><FiVideo size={16}/></button>
                  <button><FiUsers size={16}/></button>
                  <button><FiList size={16}/></button>
                  <button><FiCalendar size={16}/></button>
                  <button><FiSettings size={16}/></button>
                  <button  className='settings'><FiMoreVertical size={16}/></button>
                </div>
            </div>
          <div className="sections">
              <div className="infos">
              <div className="info">
                <div className="name">
                    <h5>@{user !== null ? user.username :"User Test"}</h5>
                    <h6> {user !== null ? user.role : "Função não encontrada"} / {user !== null ? user.type : "Tipo de conta não encontrada"}</h6>
                </div>
                <h4><FaMars size={20} /> </h4>
                <div className="info-user-man">
                    <div className="info-user-data">
                        <h5>Idade</h5>
                        <p>29 Anos</p>
                    </div>
                    <div className="info-user-data">
                        <h5>Signo</h5>
                        <p>Capricórnio</p>
                    </div>
                    <div className="info-user-data">
                        <h5>Opção</h5>
                        <p>Hétero</p>
                    </div>
                </div>
              
                <div className="info-social">
                    <div className="info-social-data">
                        <p>150</p>
                        <h5>Amigos</h5>
                    </div>
                    <div className="info-social-data">
                        <p>15</p>
                        <h5>Fotos</h5>
                    </div>
                    <div className="info-social-data">
                        <p>5</p>
                        <h5>Vídeos</h5>
                    </div>
                </div>
            </div>

            <div className="photos">
              <button>Fotos</button>
              <div className="images">
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
              </div>
            </div>
            <div className="photos">
              <button>Vídeos</button>
              <div className="images">
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
              </div>
            </div>
              </div>
              <div className="feed">
                    <Post userData={dataUser}/>
                    <br /><br />
                    <FeedPost />    
                    </div>
            </div>
         </div>
         {/* <ChatSlim /> */}
        </div>
      </div>
    </div>
    </div>
  )
}

export { Profile }