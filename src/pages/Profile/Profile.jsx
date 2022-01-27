import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import coverImg from '../../assets/images/cover.png'
import avatar from '../../assets/images/avatar.png'
import {FiHome, FiImage, FiVideo, FiUsers, FiList, FiCalendar, FiSettings, FiMoreVertical} from 'react-icons/fi'
import './profile.css'
import { Post } from '../../components/Post/Post'
import { FaMars, FaVenus } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { FeedPostIndividual } from '../../components/FeedPostIndividual/FeedPostIndividual'


function Profile() {
  const [dataUser, setDataUser] = useState(null)
  const Local = localStorage.getItem("foursome");
  const user = JSON.parse(Local);

  const [characteristics, setCharacteristics] = useState([])
  const [posts, setPosts] = useState([])


    useEffect(() => {
      const idUser = user.id;
      async function loadInformations() {
        await api.get(`/informations/${idUser}`)
    .then((res) => {
        setDataUser(res.data[0])
    }).catch(error => {
        console.log("Erro ao buscar dados" + error)
    })
      }

      async function loadCharacteristcs() {
        const id_account = user.id
        await api.get(`characteristics/${id_account}`)
        .then((res) => {
          setCharacteristics(res.data)
        }).catch(error => {
          console.log("Erro ao buscar dados" + error)
      })
      }

      async function loadPosts() {
          const res = await api.get(`/posts/filter/accounts/${user.id}`);
          console.log("res.data posts")
          console.log(res.data)
          const dataPosts = (res.data)
          setPosts(dataPosts)
      }

      loadInformations();
      loadCharacteristcs();
      loadPosts()
    }, []);

    const photos = posts.filter(post => (post.type === "post-photo"));
    const allPhotos = photos.slice(0, 6)
    console.log("allPhotos")
    console.log(allPhotos)
    const videos = posts.filter(post => (post.type === "post-video"));
 

    

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
                {characteristics.map((characteristicsUser) => {

                  const nascimento = new Date(characteristicsUser.birthDate);
                  const hoje = new Date()
                  
                  const idade =  Math.floor(Math.ceil(Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25);
                  console.log(idade)

                  return (
                    <div className={characteristicsUser.sex === "Mulher" ? "info-user-woman" : "info-user-man"}>
                      <h4>{characteristics.sex === "Mulher" ? <FaVenus size={20} /> : <FaMars size={20} />} </h4>
                        <div className="info-user-data">
                            <h5>Idade</h5>
                            <p>{idade}</p>
                        </div>
                        <div className="info-user-data">
                            <h5>Signo</h5>
                            <p>{characteristicsUser.sign}</p>
                        </div>
                        <div className="info-user-data">
                            <h5>Opção</h5>
                            <p>{characteristicsUser.sexualOption}</p>
                        </div>
                    </div>
                        )
                      })}
                  
                    <div className="info-social">
                        <div className="info-social-data">
                            <p>150</p>
                            <h5>Amigos</h5>
                        </div>
                        <div className="info-social-data">
                            <p>{photos.length}</p>
                            <h5>Fotos</h5>
                        </div>
                        <div className="info-social-data">
                            <p>{videos.length}</p>
                            <h5>Vídeos</h5>
                        </div>
                    </div>
                </div>
            

            <div className="photos">
              <button>Fotos</button>
              <div className="images">
                {allPhotos.map((photos) => {
                  return (
                    <div className="photos-list">
                <img src={photos.link} alt="" />
                    </div>
                  )
                })}
 
               
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
                    <FeedPostIndividual idAccount={user.id} />    
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