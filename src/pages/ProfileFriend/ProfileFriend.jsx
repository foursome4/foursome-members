import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import {FiHome, FiImage, FiVideo, FiMoreVertical, FiUser, FiUserPlus, FiHeart, FiUserMinus, FiMessageSquare, FiCheck} from 'react-icons/fi'
import {FaHeart} from 'react-icons/fa'
import {IoShieldCheckmark} from 'react-icons/io5'
import './profileFriend.css'
import { Photos } from '../../components/Photos/Photos'
import { Video } from '../../components/Video/Video'
import { FaMars, FaVenus } from 'react-icons/fa'
import { useEffect, useState, useContext } from 'react'
import api from '../../services/api'
import { FeedPostIndividual2 } from '../../components/FeedPostIndividual2/FeedPostIndividual2'
import { ListFriends } from '../../components/ListFriends/ListFriends'
import { ChatSlim } from '../../components/ChatSlim/ChatSlim'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth'
import { ListFollowing } from '../../components/ListFollowing/ListFollowing'
import { ListFollowers } from '../../components/ListFollowers/ListFollowers'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom';
import { BarBottomMenu } from '../../components/BarBottomMenu/BarBottomMenu'


function ProfileFriend() {
  const navigate = useNavigate()
  const {newFriend, newFollower, deleteFriend, deleteFollower, newVisit, inactivityTime} = useContext(AuthContext)
  const Local = localStorage.getItem("foursome");
  const myUser = JSON.parse(Local);
  const {id} = useParams();

  inactivityTime()


  const coverImg = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/capa%20foursome2.png?alt=media&token=6124db20-1954-47d4-9444-73b3fee41ce0"
  const avatar = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

  const [userInformations, setuserInformations] = useState([])
  const [user, setUser] = useState([])

  const [rooms, setRooms] = useState([])
  const [characteristics, setCharacteristics] = useState([])
  const [preferences, setPreferences] = useState([])
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
  const [width, setWidth] = useState("");
  const [login, setLogin] = useState([])

useEffect(() => {
function widthView() {
  //resolução navegador
console.log(window.screen.width+'x'+window.screen.height);

//resolução 'real' navegador
setWidth((window.innerWidth > 0) ? window.innerWidth : window.screen.width);
}

widthView()
},[])

console.log(id)

  useEffect(() => {

    async function loadDateLogin() {
      await api.get(`/datereadlogin/${id}`).then((result) => {
        setLogin(result.data)
      }).catch((error) => {
        console.log(error);
      });
    }
    async function loadAccount() {
      await api.get(`/accounts/filter/${id}`).then( async (res) => {
        setUser(res.data[0]);
        const idAccount = res.data[0].patron.toLowerCase()
        await api.get(`informations/${idAccount}`)
        .then((patron) => {
          setPatron(patron.data[0])
        }).catch((error) => {
          console.log(error)
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

    async function loadPreferences() {
      const idAccount = id;
      await api.get(`/preferences/${idAccount}`)
      .then((res) => {
        setPreferences(res.data[0])
      }).catch(error => {
        console.log("Erro ao buscar dados" + error)
    })
    }

    async function loadRoom() {
      await api.get(`conversations/${myUser.id}/${id}`)
      .then( async (res) => {
        if(res.data.length !== 0) {
          setRooms(res.data[0])
          return
        } 
       
        await api.get(`conversations/${id}/${myUser.id}`)
        .then( async (res) => {
          if(res.data.length !== 0) {
            setRooms(res.data[0])
            return
          }

          const v4 = uuidv4();
          const room = v4.substring(0, 6);
          const data = {room, idAccount: myUser.id, idFriend: id}
          setRooms(data)

          await api.post(`/conversations`, data).then((res) => {
          })


        }).catch(error => {
          console.log("Erro ao buscar dados" + error)
      })

      }).catch(error => {
        console.log("Erro ao buscar dados" + error)
    })
    }
    
    loadAccount()
    loadInformations()
    loadCharacteristcs()
    loadPreferences()
    loadRoom()
    loadDateLogin()
  }, [myUser.id, id]);



 function handleChat() {
  navigate(`/chat/${rooms.room}/${id}`);
  }


    useEffect(() => {
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
          setMyFollowers(result.data)
      }

      loadPosts();
      loadFriends();
      loadFollowers();
    }, [id]);

    useEffect(() => {
      function createVisit() {
        const idAccount = myUser.id;
        const username = myUser.username;
        const idFriend = id;
    
        newVisit(idAccount, username, idFriend)
      }
    
      createVisit()
    }, [myUser.id, myUser.username, id, newVisit ])

    
    function handleNewFriend(e) {
    const idAccount = myUser.id
    const idFriend = user.id
    const type = "friend"
    const status = "pending"
    e.preventDefault()
    newFriend(idAccount, idFriend, type, status)
  }
  function handleNewFollower(e) {
    const idAccount = myUser.id
    const idFriend = user.id
    const type = "follower"
    const status = "aproved"
    e.preventDefault()
    newFollower(idAccount, idFriend, type, status)
  }

  function handleDeleteFriend(e) {
    e.preventDefault()

   deleteFriend(FriendExists[0].id)
  }
  function handleDeleteFollower(e) {
    e.preventDefault()

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

    const date = login.length === 0 ? new Date() : new Date(login[0].DateReadLogin);
    const newDateFormated = ((date.getDate())) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear();

    const dateActual = new Date();
    const timeDifference = Math.abs(dateActual.getTime() - date.getTime());
    const datDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));



  return (
      <div className="container">
    <div className="content-profileFriend">
      <ToolbarLeftSlim />
      <BarBottomMenu />
      <div className="profileFriend">
        <TopBar />
        <div className="main">
         <div className="section">
          <div className="cover">
          <img 
                        src={userInformations.cover}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
          </div>
            <div className="profileFriend-tools">
                <div className="users">
                <div className="users-img">
                <img 
                        src={userInformations.avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                  </div>
                  <h3> <b>{userInformations !== null ? `${userInformations.nickname} - ${userInformations.uf}` :"User Test"}</b>{user.role !== "Membro" ? <IoShieldCheckmark />: ""}</h3>
                </div>
                <div className="tool">
                  <button className={feed === "" ? "" : "select"} onClick={handleFeed }><FiHome size={16}/></button>
                  <button onClick={FriendExists.length === 0 ? handleNewFriend : handleDeleteFriend}>
                  {FriendExists.length === 0 ? <FiUserPlus size={16}/> : <FiUserMinus size={16}/> } 
                    </button>
                  
                  <button className="follower" onClick={FollowingExists.length === 0 ? handleNewFollower : handleDeleteFollower}>
                    {FollowingExists.length === 0 ? <FiHeart size={16} /> : <FaHeart size={16} />}
                    </button>
                  <button className={friend === "" ? "" : "select"} onClick={handleFriend}><FiUser size={16}/></button>
                  <button className="" onClick={handleChat}><FiMessageSquare size={16}/></button>
                  <button className={photo === "" ? "" : "select"} onClick={handlePhoto}><FiImage size={16}/></button>
                  <button className={video === "" ? "" : "select"} onClick={handleVideo}><FiVideo size={16}/></button>
                  <button  className='settings'><FiMoreVertical size={16}/></button>
                </div>
            </div>
          <div className="sections">
          {width <= 900 && feed !== "feed" ? "":
              <div className="infos">
                    <div className="info">
                    <div className="name">
                        <h6> {`Membro desde ${date.getMonth()+1 === 1 ? "Janeiro":
                                              date.getMonth()+1 === 2 ? "Fevereiro":
                                              date.getMonth()+1 === 3 ? "Março" : 
                                              date.getMonth()+1 === 4 ? "Abril":
                                              date.getMonth()+1 === 5 ? "Maio" :
                                              date.getMonth()+1 === 6 ? "Junho": 
                                              date.getMonth()+1 === 7 ? "Julho":
                                              date.getMonth()+1 === 8 ? "Agosto":
                                              date.getMonth()+1 === 9 ? "Setembro":
                                              date.getMonth()+1 === 10 ? "Outubro":
                                              date.getMonth()+1 === 11 ? "Novembro":
                                              date.getMonth()+1 === 12 ? "Desembro": ""} de ${date.getFullYear()}`}</h6>
                        <h6> {user !== null ? user.role : "Função não encontrada"} / {user !== null ? user.type : "Tipo de conta não encontrada"}</h6>
                        <br />
                        
        {login.length !== 0 ?
        <h6> {datDifference === 0 ? "Ultimo Acesso hoje" :
        datDifference === 1 ? "Ultimo Acesso a 1 dia" :
        datDifference > 1 && datDifference < 7 ? `Último acesso a ${datDifference} dias`:
        datDifference === 7 ? "Ultimo Acesso a 1 semana" :
        datDifference > 7 && datDifference < 14 ? `Último acesso a ${datDifference} dias`:
        datDifference === 14 ? "Ultimo Acesso a 2 semanas" :
        datDifference > 14 && datDifference < 21 ? `Último acesso a ${datDifference} dias`:
        datDifference === 21 ? "Ultimo Acesso a 3 semanas" :
        datDifference > 21 && datDifference < 30 ? `Último acesso a ${datDifference} dias`:
        datDifference === 30 ? "Ultimo Acesso a 4 semanas" :
        "Ultimo Acesso mais de um mês" }</h6> :
        <h6> Último acesso não registrado</h6>}
        
        


                    </div>
                    <div className="name">
                      <br />
                        <h4>{userInformations.city} - {userInformations.uf}</h4>
                        <h4>Patrono: {patron !== null ?  <Link to={patron.idAccount === user.id ? `/profile` : `/profile-friend/${patron.idAccount}`}>{patron.nickname}</Link> :"Patrono não eocnotrado"}</h4>
                       </div>

                       <div className="info-user-preferences">
                        <div className="informations">
                            <h5 className='title'>Preferencias</h5>
                          <div className="selects">
                          <div className="itens">{preferences.men !== "" ? <h5><FiCheck /> {preferences.men}</h5> : "" }  </div>
                              <div className="itens"> {preferences.woman !== "" ? <h5><FiCheck /> {preferences.woman}</h5> : "" } </div>
                              <div className="itens"> {preferences.couple !== "" ? <h5><FiCheck /> {preferences.couple}</h5> : "" } </div>
                              <div className="itens"> {preferences.trisal !== "" ? <h5><FiCheck /> {preferences.trisal}</h5> : "" } </div>
                              <div className="itens"> {preferences.transsexuals !== "" ? <h5><FiCheck /> {preferences.transsexuals}</h5> : "" } </div>
                              <div className="itens"> {preferences.transvestites !== "" ? <h5><FiCheck /> {preferences.transvestites}</h5> : "" } </div>
                              <div className="itens"> {preferences.groups !== "" ? <h5><FiCheck /> {preferences.groups}</h5> : "" } </div>
                          </div>
                          <div className="proposal">
                            <h5 className='title'>Proposta</h5>
                            {preferences.proposal !== "" ? <h5>{preferences.proposal}</h5> : "" }
                          </div>
                        </div>
                      </div>


                {characteristics.map((characteristicsUser) => {

                  const nascimento = new Date(characteristicsUser.birthDate);
                  const hoje = new Date()
                  
                  const idade =  Math.floor(Math.ceil(Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25);

                  return (
                    <div className={characteristicsUser.sex === "Mulher" ? "info-user-woman" : "info-user-man"} key={characteristicsUser.id}>
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
            

            <div className="photo">
              <button>Fotos</button>
              <div className="image">
                {allPhotos.map((photos) => {
                  return (
                    <div className="photo-list" key={photos.id}>
                <img src={photos.link} alt="" />
                    </div>
                  )
                })}
 
               
              </div>
            </div>

              </div>
          }
                     <div className="feed">
                  {feed === "feed" ?
                  <>
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