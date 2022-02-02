import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import coverImg from '../../assets/images/cover.png'
import avatar from '../../assets/images/avatar.png'
import {FiHome, FiImage, FiVideo, FiMoreVertical, FiUser, FiUserPlus, FiHeart} from 'react-icons/fi'
import {FaHeart} from 'react-icons/fa'
import './profileFriend.css'
import { Photos } from '../../components/Photos/Photos'
import { Video } from '../../components/Video/Video'
import { FaMars, FaVenus } from 'react-icons/fa'
import { useEffect, useState, useContext } from 'react'
import api from '../../services/api'
import { FeedPostIndividual2 } from '../../components/FeedPostIndividual2/FeedPostIndividual2'
import { ListFriends } from '../../components/ListFriends/ListFriends'
import { ChatSlim } from '../../components/ChatSlim/ChatSlim'
import { useParams } from 'react-router-dom'
import {  } from 'react/cjs/react.development'
import { AuthContext } from '../../contexts/Auth'


function ProfileFriend() {
  const {newFriend, newFollower} = useContext(AuthContext)
  const Local = localStorage.getItem("foursome");
  const myUser = JSON.parse(Local);
  const {id} = useParams();

  const [userInformations, setuserInformations] = useState("null")
  const [user, setUser] = useState("null")


  const [characteristics, setCharacteristics] = useState([])
  const [posts, setPosts] = useState([]);
  const [feed, setFeed] = useState("feed");
  const [friend, setFriend] = useState("");
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");
  const [follower, setUserFollower] = useState("");
  const [friendNew, setUserNew] = useState("");
  const [myFriends, setMyFriends] = useState("")


    useEffect(() => {
      async function loadAccount() {
        const res = await api.get(`/accounts/filter/${id}`)
        setUser(res.data[0]) 
      }


      const idUser = id;
      async function loadInformations() {
        await api.get(`/informations/${idUser}`)
    .then((res) => {
      setuserInformations(res.data[0])
    }).catch(error => {
        console.log("Erro ao buscar dados" + error)
    })
      }

      async function loadCharacteristcs() {
        const id_account = id
        await api.get(`characteristics/${id_account}`)
        .then((res) => {
          setCharacteristics(res.data)
        }).catch(error => {
          console.log("Erro ao buscar dados" + error)
      })
      }

      async function loadPosts() {
        
          const res = await api.get(`/posts/filter/accounts/${id}`);
          const dataPosts = (res.data)
          setPosts(dataPosts)
      }

      async function loadFriends() {
        const idAccount = id;
        const result = await api.get(`/friends/filter/${idAccount}`);
        console.log("Friends")
        console.log(result.data);
        setMyFriends(result.data)
      }
      loadAccount()
      loadInformations();
      loadCharacteristcs();
      loadPosts();
      loadFriends();
    }, []);

    const idAccount = myUser.id
    const idFriend = user.id
    const type = "friend"
    const status = "pending"


  function handleNewFriend(e) {
    e.preventDefault()
    console.log(idAccount, idFriend, type, status);
    newFriend(idAccount, idFriend, type, status)
  }
  function handleNewFollower(e) {
    e.preventDefault()
    console.log(idAccount, idFriend, type, status)
    newFollower(idAccount, idFriend, type, status)
  }



    function handleFeed() {
        setFeed("feed")
        setFriend("")
        setPhoto("")
        setVideo("")
        setUserNew("")
        setUserFollower("")
    }
    function handleFriend() {
      setFeed("")
      setFriend("friend")
      setPhoto("")
      setVideo("")
      setUserNew("")
      setUserFollower("")
    }
    function handlePhoto() {
      setFeed("")
      setFriend("")
      setPhoto("photo")
      setVideo("")
      setUserNew("")
      setUserFollower("")
    }
    function handleVideo() {
      setFeed("")
      setFriend("")
      setPhoto("")
      setVideo("video")
      setUserNew("")
      setUserFollower("")
    }

    function handleFriendNew() {
      setFeed("")
      setFriend("")
      setPhoto("")
      setVideo("")
      setUserNew("friendNew")
      setUserFollower("")
    }
    function handleFollower() {
      setFeed("")
      setFriend("")
      setPhoto("")
      setVideo("")
      setUserNew("")
      setUserFollower("follower")
    }


    const photos = posts.filter(post => (post.type === "post-photo"));
    const allPhotos = photos.slice(0, 6)
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
              <img src={ userInformations !== null ? userInformations.cover : coverImg} alt="" />
          </div>
            <div className="profile-tools">
                <div className="user">
                <div className="user-img">
                  <img src={userInformations !== null ? userInformations.avatar : avatar} alt="" />
                  </div>
                  <h3> <b>{userInformations !== null ? userInformations.nickname :"User Test"}</b></h3>
                </div>
                <div className="tools">
                  <button className={feed === "" ? "" : "select"} onClick={handleFeed}><FiHome size={16}/></button>
                  <button onClick={handleFriendNew, handleNewFriend}><FiUserPlus size={16}/></button>
                  <button className="follower" onClick={handleFollower,handleNewFollower}><FiHeart size={16} backgroundColor="8124E2"/></button>
                  <button className={friend === "" ? "" : "select"} onClick={handleFriend}><FiUser size={16}/></button>
                  <button className={photo === "" ? "" : "select"} onClick={handlePhoto}><FiImage size={16}/></button>
                  <button className={video === "" ? "" : "select"} onClick={handleVideo}><FiVideo size={16}/></button>
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

                  return (
                    <div className={characteristicsUser.sex === "Mulher" ? "info-user-woman" : "info-user-man"}>
                      <h4>{characteristicsUser.sex === "Mulher" ? <FaVenus size={20} /> : <FaMars size={20} />} </h4>
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
                  {feed === "feed" ?
                  <>
                    {/* <Post userData={userInformations}/> */}
                    <br /><br />
                    <FeedPostIndividual2 idAccount={user.id} avatar={userInformations.avatar} username={user.username}/>
                  </>
                  :
                  friend === "friend" ?
                  <div className="friends">
                    <div className="buttonsFriends">
                      <button>Amigos</button>
                      <button>Seguindo</button>
                      <button>Segiodores</button>
                      <button>Solicitação de amizade</button>
                    </div> 

                    {myFriends.map((friends) => {
                      return (
                        <>
                        <ListFriends id={friends.idFriend} />
                        </>
                      )
                    })}
                  </div>
                  :
                  photo === "photo" ?
                  <Photos idAccount={user.id} type={"post-photo"} />
                  :
                  video === "video" ?
                   <Video idAccount={user.id} type={"post-video"} />
                   :
                   friendNew === "group" ?
                   "Nenhum grupo aqui"
                   :
                   follower === "forum" ?
                   "Nenhum forum aqui"
                   :
                  ""
                  } 
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

export { ProfileFriend }