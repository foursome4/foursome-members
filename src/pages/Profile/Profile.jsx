import { ChatSlim } from '../../components/ChatSlim/ChatSlim'
import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import coverImg from '../../assets/images/cover.png'
import avatar from '../../assets/images/avatar.png'
import {FiHome, FiImage, FiVideo, FiUsers, FiList, FiCalendar, FiSettings, FiMoreVertical, FiTrash2, FiEdit, FiMessageCircle, FiThumbsUp, FiMinus} from 'react-icons/fi'
import './profile.css'
import { Post } from '../../components/Post/Post'
import { FaMars } from 'react-icons/fa'


function Profile() {

  return (
      <div className="container">
    <div className="content-profile">
      <ToolbarLeftSlim />
      <div className="profile">
        <TopBar />
        <div className="main">
         <div className="section">
          <div className="cover">
              <img src={coverImg} alt="" />
          </div>
            <div className="profile-tools">
                <div className="user">
                  <img src={avatar} alt="" />
                  <h3> <b> Jeferson Macedo </b></h3>
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
                    <h5>@jefersonmmacedo</h5>
                    <h6>Membro / Homem</h6>
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
              </div>
              <div className="feed">
                    <Post />
                        <div className="posts-feed">
                            <div className="buttons">
                                <button className='selected'> Feed </button>
                                <button> Posts </button>
                                <button> Fotos </button>
                                <button> Vídeos </button>
                                <button> Grupos </button>
                                <button> Fóruns </button>
                            </div>
                        
                            {/* Posts do Feed */}
                            <div className="feed-post">
                                <div className="post-user">
                                    <img src={avatar} alt="" />
                                    <div className="info-data">
                                       <div className="name-data">
                                       <h4 className="selected">Jeferson Macedo</h4>
                                        <h4> <FiMinus /> </h4>
                                        <h4>Festas a dois</h4>
                                       </div>
                                       <div className="time-data">
                                           <h5>3 Horas e 24 Minutos</h5>
                                       </div>
                                    </div>
                                </div>

                                <div className="post-data">
                                    <p>
                                        Vamos curtir o fim de semana na presença de nossos melhores amigos.
                                    </p>
                                </div>

                                <div className="reactions">
                                    <button className="selected">
                                        <FiThumbsUp />
                                        Curtir
                                    </button>
                                    <button>
                                        <FiMessageCircle />
                                        Comentar
                                    </button>
                                    <button>
                                        <FiEdit />
                                        Editar
                                    </button>
                                    <button>
                                        <FiTrash2 />
                                        Apagar
                                    </button>
                                </div>
                            </div>

                            
                        </div>
                    </div>
            </div>
         </div>
         <ChatSlim />
        </div>
      </div>
    </div>
    </div>
  )
}

export { Profile }