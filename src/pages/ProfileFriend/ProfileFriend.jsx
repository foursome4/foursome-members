import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import coverImg from '../../assets/images/cover.png'
import avatar from '../../assets/images/avatar.png'
import {FiHome, FiImage, FiVideo, FiMoreVertical, FiUser, FiUserPlus, FiHeart, FiUserMinus} from 'react-icons/fi'
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
import { AuthContext } from '../../contexts/Auth'
import { ListFollowing } from '../../components/ListFollowing/ListFollowing'
import { ListFollowers } from '../../components/ListFollowers/ListFollowers'


function ProfileFriend() {
  const {newFriend, newFollower, deleteFriend, deleteFollower} = useContext(AuthContext)
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
  const [myFriends, setMyFriends] = useState([]);
  const [myFollowers, setMyFollowers] = useState([]);
  const [patron, setPatron] = useState([]);
  const [friends, setFriends] = useState("friends");
  const [following, setFollowing] = useState("");
  const [followers, setFollowers] = useState("");

    useEffect(() => {
      async function loadAccount() {
        await api.get(`/accounts/filter/${id}`).then(async (res) => {
          setUser(res.data[0]);
          console.log("res.data[0].patron")
          console.log(res.data[0].patron)
          await api.get(`accounts/filter/${res.data[0].patron}`)
          .then((patron) => {
            console.log("patron.data[0]")
            console.log(patron.data[0])
            setPatron(patron.data[0])
          })
            
          
        }).catch((error) => {
          console.log(error)
        })
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
        const result = await api.get(`/friends/${idAccount}`);
        setMyFriends(result.data)
      }
      async function loadFollowers() {
        const idAccount = id;
        const result = await api.get(`/followers/filter/${idAccount}`);
        console.log("result.data Followers")
        console.log(result.data)
        setMyFollowers(result.data)
      }

     

      loadAccount()
      loadInformations();
      loadCharacteristcs();
      loadPosts();
      loadFriends();
      loadFollowers();
    }, []);

    
    console.log("Patron")
    console.log(patron)

    function handleNewFriend(e) {
    const idAccount = myUser.id
    const idFriend = user.id
    const type = "friend"
    const status = "pending"
    e.preventDefault()
    console.log(idAccount, idFriend, type, status);
    newFriend(idAccount, idFriend, type, status)
  }
  function handleNewFollower(e) {
    const idAccount = myUser.id
    const idFriend = user.id
    const type = "follower"
    const status = "aproved"
    e.preventDefault()
    console.log(idAccount, idFriend, type, status)
    newFollower(idAccount, idFriend, type, status)
  }

  function handleDeleteFriend(e) {
    e.preventDefault()
    console.log("FriendExists.data[0]")
    console.log(FriendExists[0].id)
   deleteFriend(FriendExists[0].id)
  }
  function handleDeleteFollower(e) {
    e.preventDefault()
    console.log("FriendExists.data[0]")
    console.log(FollowingExists[0].id)
    deleteFollower(FollowingExists[0].id)
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

    function handleFriends() {
      setFriends("friends");
      setFollowing("");
      setFollowers("");
    }
    function handleFollowing() {
      setFriends("");
      setFollowing("following");
      setFollowers("");
    }
    function handleFollowers() {
      setFriends("");
      setFollowing("");
      setFollowers("followers");
    }
  


    const photos = posts.filter(post => (post.type === "post-photo"));
    const allPhotos = photos.slice(0, 6)
    const videos = posts.filter(post => (post.type === "post-video"));
    const friendAproveds = myFriends.filter(friend => (friend.status === 'aproved'))
    const FriendExists = myFriends.filter(friend => (friend.idAccount === myUser.id || friend.idFriend === myUser.id))

    const followersMy = myFollowers.filter(friend => (friend.idFriend === user.id))
    const followingMy = myFollowers.filter(friend => (friend.idAccount === user.id))
    const FollowingExists = myFollowers.filter(friend => (friend.idAccount === myUser.id))


console.log("FollowingExists")
console.log(FollowingExists.length)

   

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
                  <button className={feed === "" ? "" : "select"} onClick={handleFeed }><FiHome size={16}/></button>
                  <button onClick={FriendExists.length === 0 ? handleNewFriend : handleDeleteFriend}>
                  {FriendExists.length === 0 ? <FiUserPlus size={16}/> : <FiUserMinus size={16}/> } 
                    </button>
                  
                  <button className="follower" onClick={FollowingExists.length === 0 ? handleNewFollower : handleDeleteFollower}>
                    {FollowingExists.length === 0 ? <FiHeart size={16} /> : <FaHeart size={16} />}
                    </button>
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
                    <div className="name">
                        <br />
                        <h4>Patrono: {patron !== null ? patron.username :"Patrono não eocnotrado"}</h4>
                        <br />
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
                            <p>{friendAproveds.length}</p>
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
                      <button className={friends === "" ? "" : "select"} onClick={handleFriends}>Amigos</button>
                      <button className={following === "" ? "" : "select"} onClick={handleFollowing}>Seguindo</button>
                      <button className={followers === "" ? "" : "select"} onClick={handleFollowers}>Seguidores</button>
                    </div> 

                    <div className="listFriendsMap">
                    {friends === "friends" ?
                    friendAproveds.map((friends) => {
                      return (
                        <>
                        <ListFriends id={friends.idFriend === id ? friends.idAccount : friends.idFriend} />
                        </>
                      )
                    })
                    : following === "following" ?
                    followingMy.map((following) => {
                     return (
                       <ListFollowing idAccount={following.idAccount === id ? following.idFriend : following.idAccount} idRegister={following.id}/>
                     )
                   })
                    : followers === "followers" ?
                    
                      followersMy.map((followers) => {
                        return (
                          <ListFollowers id={followers.idFriend === id ? followers.idAccount : followers.idFriend} />
            
                        )
                      })
                    : 
                    "Nada para mostrar"
                    
                  }

                    
                  </div>
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