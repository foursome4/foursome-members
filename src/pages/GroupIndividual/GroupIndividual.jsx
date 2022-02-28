import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import {FiHome, FiMoreVertical, FiUser} from 'react-icons/fi'
import './groupIndividual.css'

import {useContext, useEffect, useState } from 'react'
import api from '../../services/api'
import { ChatSlim } from '../../components/ChatSlim/ChatSlim'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth'
import { PostGroup } from '../../components/PostGroup/PostGroup'
import { FeedPostGroup } from '../../components/FeedPostGroup/FeedPostGroup'
import { BarBottomMenu } from '../../components/BarBottomMenu/BarBottomMenu'


function GroupIndividual() {
  const {id} = useParams();
  console.log(id)
  const {socketDataLocation} = useContext(AuthContext)
  const [dataUser, setDataUser] = useState(null)
  const Local = localStorage.getItem("foursome");
  const user = JSON.parse(Local);
  const LocalInformations = localStorage.getItem("informations-foursome");
  const userInformations = JSON.parse(LocalInformations);




  const [feed, setFeed] = useState("feed");
  const [friend, setFriend] = useState("");

  const [avatar, setAvatar] = useState();
    const [cover, setCover] = useState();
    const [name, setName] = useState();
    const [privacity, setPrivacity] = useState();
    const [theme, setTheme] = useState();
    const [description, setDescription] = useState();
    const [idGroup, setIdGroup] = useState();
    const [members, setMembers] = useState([])
    const [nickname, setNickname] = useState("");
    const [username, setUsername] = useState("");
    const [avatarUser, setAvatarUser] = useState("");



  useEffect(() => {
    async function loadGroups(){
        await api.get(`/groups/${id}`).then((result) => {
            console.log(result.data[0]);
                setAvatar(result.data[0].avatar);
                setCover(result.data[0].cover);
                setName(result.data[0].name);
                setPrivacity(result.data[0].privacity);
                setTheme(result.data[0].theme);
                setDescription(result.data[0].description);
                setIdGroup(result.data[0].id);
                setUsername(result.data[0].username);
                setNickname(result.data[0].nickname);
                setAvatarUser(result.data[0].avatarUser);
        })
    }

    async function loadMembers(){
      const idGroup = id
      await api.get(`/members/${idGroup}`).then((result) => {
          console.log(result.data);
          setMembers(result.data)

      })
  }

  loadMembers()
    loadGroups()
    socketDataLocation()
}, [socketDataLocation]);


     function handleFeed() {
        setFeed("feed")
        setFriend("")

    }
    function handleMembers() {
      setFeed("")
      setFriend("friend")

    }
  
const member = members.slice(0,6);
console.log(member)
   
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
                  <button className={friend === "" ? "" : "select"} onClick={handleMembers}><FiUser size={16}/> Membros</button>
                  <button  className='settings'><FiMoreVertical size={16}/></button>
                </div>
            </div>
          <div className="sections">
              <div className="infos">
              <div className="info">
              <div className="name">
                   <h3>Sobre o grupo</h3>
                   <div className='bar'></div>
                   <h5>{description}</h5>
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
                   <br />
                   <h3>Membros</h3>
                   <div className='bar'></div>
                   <div className="imageMembers">
                   {member.map((avatar) => {
                      return (
                          <div className="image">
                            <img src={avatar.avatar} />
                          </div>
                          )
                        })}
                        </div>

            </div>
            </div>
            </div>
                     <div className="feed">
                  {feed === "feed" ?
                  <>
                    <PostGroup nameGroup={name} idGroup={idGroup}/>
                    <br /><br />
                    <FeedPostGroup idGroup={id} />
                  </>
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

export { GroupIndividual }