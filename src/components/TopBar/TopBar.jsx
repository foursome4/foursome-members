import logoFoursomemini from '../../assets/images/logo-mini2.png'
import logoFoursome from '../../assets/images/logo2.png'
import { FiSearch, FiMessageSquare, FiUserPlus, FiBell, FiMail, FiLogOut, FiX, FiInfo, FiCheckSquare, FiHeart, FiXSquare } from 'react-icons/fi'
import avatarImg from '../../assets/images/avatar.png'
import './topBar.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal'
import api from '../../services/api'
import { UserConversation } from '../UserConversation/UserConversation'
import { UsersSearch } from '../UsersSearch/UsersSearch'
import { toast } from 'react-toastify'
import { UsersPending } from '../UsersPending/UsersPending'
import { UsersNotifications } from '../UsersNotifications/UsersNotifications'

function TopBar() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);
    const [isOpenModalFriend, setIsOpenModalFriend] = useState(false);
    const [isOpenModalNotifications, setIsOpenModalNotifications] = useState(false);

    const [rooms, setRooms] = useState([])
    const [rooms2, setRooms2] = useState([])
    const [messages, setMessages] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [myFriends, setMyFriends] = useState([]);
    const [accounts, setAccoounts] = useState([])
    const [search, setSearch] = useState('')
    const [searchId, setSearchId] = useState('')
    const [type, setType] = useState("username")
    const [date, setDate] = useState(new Date("Tue Mar 06 2022 03:38:05 GMT-0300 (Hora padrão de Brasília)"))
 
    useEffect(() => {
        async function loadRoomIdAccount() {
            const idAccount = user.id
            await api.get(`conversations/account/filter/${idAccount}`)
            .then( async (res) => {
                setRooms(res.data)
            }).catch(error => {
              console.log("Erro ao buscar dados" + error)
          })
          }

          async function loadRoomIDFriend() {
            const idFriend = user.id
            await api.get(`conversations/friend/filter/${idFriend}`)
            .then( async (res) => {
                setRooms2(res.data)
            }).catch(error => {
              console.log("Erro ao buscar dados" + error)
          })
          }


          async function loadAccounts() {
              await api.get("/accounts").then((result) => {
                  setAccoounts(result.data)
              })
          }

          async function loadFriends() {
            const idAccount = user.id;
            const result = await api.get(`/friends/${idAccount}`);
            setMyFriends(result.data)
            console.log("Friends")
            console.log(result.data)
          }
          async function loadNotifications() {
              const idPatrono = user.id
            const result = await api.get(`/notifications/my/${idPatrono}`);
            setNotifications(result.data)
            console.log("Notifications")
            console.log(result.data)
          }

          loadNotifications()
          loadFriends()
          loadAccounts()
          loadRoomIdAccount()
          loadRoomIDFriend()

    }, [user.id])


    console.log("Date");
    console.log(date);
    console.log("Actual Date");
    console.log(new Date);

  const newRooms = rooms.concat(rooms2)
  const SearchUsers = accounts.filter((account) => account.username.startsWith(search))
  const SearchUsersId = accounts.filter((account) => account.id.startsWith(searchId))

  const notificationsFilter = notifications.filter((notification) => (new Date(notification.created_at) > date))
    console.log("notificationsFilter")
    console.log(notificationsFilter)


  const friendPending = myFriends.filter(friend => (friend.status === 'pending' && friend.idFriend === user.id))
  console.log("Pending");
  console.log(friendPending);


    function Tologout(e) {
        e.preventDefault();
        logout(user.id)
    }

    function handleOpenModal() {
        setIsOpenModal(true)
      }
    
      function handleCloseModal() {
        setIsOpenModal(false)
      }

      function handleMessages() {
        handleOpenModal()
      }

    function handleOpenModalSearch() {
        setIsOpenModalSearch(true)
      }
    
      function handleCloseModalSearch() {
        setIsOpenModalSearch(false)
      }
      function handleSearch() {
        handleOpenModalSearch()
      }


    function handleOpenModalFriend() {
        setIsOpenModalFriend(true)
      }
    function handleFriends() {
        handleOpenModalFriend()
      }
    
      function handleCloseModalFriend() {
        setIsOpenModalFriend(false)
      }


    function handleOpenModalNotifications() {
        setIsOpenModalNotifications(true)
      }
    function handleNotifications() {
        handleOpenModalNotifications()
        const date = new Date()
        handleNewDate(date)
      }
    
      function handleCloseModalNotifications() {
        setIsOpenModalNotifications(false)
      }


      function handleSelectTypeSearch(e) {
        setType(e.target.value)
    }


    //Deslogandop após tempo de inatividade
    function inactivityTime() {
        let time;
        // reset timer
        window.onload = resetTimer;
        document.onmousemove = resetTimer;
        document.onkeydown = resetTimer;
        function doSomething() {
            toast.error("Finalizando a sessão")
          logout(user.id)
        }
        function resetTimer() {
            clearTimeout(time);
          //  time = setTimeout(doSomething, 2000000)
            time = setTimeout(doSomething, 50000)
        }
    }

    inactivityTime()

    function handleNewDate(date) {
        console.log("NOva data")
        console.log(date)
        setDate(date)
    }



      Modal.setAppElement('#root');
    return (
        <div className="topBar">
            <div className="logo">
                <a href="/feed">
                <img src={logoFoursome} alt="" />
                </a>
            </div>
            <div className="logo2">
                  <a href="/feed">
                <img src={logoFoursomemini} alt="" />
                </a>
            </div>
            <div className="search" onClick={handleSearch}>
                <FiSearch />
               <p>Pesquisar</p>
            </div>
            <div className="links">
                <div className="link"  onClick={handleFriends} data-tip data-for='Solicitações'>
                    {friendPending.length === 0 ? "" :
                    <div className="counter"> {friendPending.length}</div>
                    }
                    <FiUserPlus />
                </div>
                <ReactTooltip id='Solicitações' place="bottom" type="dark" effect="solid">
                     <span>Solicitações</span>
                </ReactTooltip>


                <div className="link" onClick={handleNotifications} data-tip data-for='Notificações'>
                {notificationsFilter.length === 0 ? "" :
                    <div className="counter"> {notificationsFilter.length}</div>
                    }
                    <FiBell />
                </div>
                <ReactTooltip id='Notificações'  place="bottom" type="dark" effect="solid">
                     <span>Notificações</span>
                </ReactTooltip>

                <a href="/invite">
                <div className="link" data-tip data-for='Convidar'>
                    <FiMail />
                </div>
                </ a>
                <ReactTooltip id='Convidar' place="bottom" type="dark" effect="solid">
                     <span>Convidar</span>
                </ReactTooltip>


                <div className="link" onClick={handleMessages} data-tip data-for='Mensagens'>
                    <FiMessageSquare />
                </div>
                <ReactTooltip id='Mensagens' place="bottom" type="dark" effect="solid">
                     <span>Mensagens</span>
                </ReactTooltip>


                <div className="link" data-tip data-for='Sair'>
                    <FiLogOut onClick={Tologout} />
                </div>
                <ReactTooltip id='Sair' place="bottom" type="dark" effect="solid">
                     <span>Sair</span>
                </ReactTooltip>
                <div className="account">
                    <a href="/profile">
                        <div className="avatar">
                    <img src={userInformation !== null ? userInformation.avatar : avatarImg} alt="" />
                    </div>
                    </a>
                    <a href="/profile">
                    <h4>@{user !== null ? user.username : "Usuário não encontrado"}</h4>
                    </a>
                </div>
                <a href="/invite">
                <div className="link" data-tip data-for='Informações'>
                    <FiInfo />
                </div>
                </a>
                <ReactTooltip id='Informações' place="bottom" type="dark" effect="solid">
                     <span>Informações</span>
                </ReactTooltip>
                
            </div>
           
 
            {/* Modal Conversations  */}
            <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <FiX /> 
            </button>
            <div className="content-modal">
            <h3>Conversas</h3>
        
            <div className="itensModalMessages">

            {newRooms.map((rooms) => {
                return(
                    <div className="rooms" key={rooms.id}>
                        <UserConversation idAccount={rooms.idAccount !== user.id ? rooms.idAccount : rooms.idFriend} room={rooms.room}/>

                    </div>
                )
            })}
            </div>
            
            
            <div className="buttons-modal">
            <button className="butont-White" onClick={handleCloseModal}>Cancelar</button>
            </div>
            </div>
            </Modal>
            {/* FIM Modal Conversations  */}

            {/* Modal Search  */}
            <Modal isOpen={isOpenModalSearch} onRequestClose={handleCloseModalSearch}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalSearch}>
            <FiX /> 
            </button>
            <div className="content-modal">
            <h3>Busca de usuários</h3>
        
            <div className="search">
           <select  value={type} onChange={handleSelectTypeSearch}>
                <option value="username">Usuário</option>
                <option value="id">id</option>
            </select>
            {type === "username" ?
            <input type="text" placeholder='buscar usuário' value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value)}/>
            :
            <input type="text" placeholder='buscar pelo Id' value={searchId.toLowerCase()} onChange={(e) => setSearchId(e.target.value)}/>
            }
            </div>
            
            <div className="itensModal">
            {type === "username" ?
            SearchUsers.map((account) => {
                return(
                    
                    <div className="accounts" key={account.id}>
                      <UsersSearch id={account.id} username={account.username} />
                    </div>
                )
            })
                :
                SearchUsersId.map((account) => {
                    return(
                        
                        <div className="accounts" key={account.id}>
                           <UsersSearch id={account.id} username={account.username} />
                        </div>
                    )
            
                })
            }
            
            </div>
            <div className="buttons-modal">
            <button className="butont-White" onClick={handleCloseModalSearch}>Cancelar</button>
            </div>
            </div>
            </Modal>
            {/* FIM Modal Search  */}

            {/* Modal Friends  */}
            <Modal isOpen={isOpenModalFriend} onRequestClose={handleCloseModalFriend}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalFriend}>
            <FiX /> 
            </button>
            <div className="content-modal">
            <h3>Solicitações de amizade</h3>
            
            <div className="itensModalFriend">
            {friendPending.map((friend) => {
                return(
                    <div className="friend" key={friend.idAccount}>
                        <div className="name">
                        <UsersPending id={friend.idAccount} />
                        </div>
                        <div className="buttons">
                            <button className='Acept' data-tip data-for='Aceitar'><FiCheckSquare /></button>
                            <ReactTooltip id='Aceitar' place="bottom" type="dark" effect="solid">
                             <span>Aceitar</span>
                            </ReactTooltip>
                            <button className='Acept' data-tip data-for='Seguir'> <FiHeart /></button>
                            <ReactTooltip id='Seguir' place="bottom" type="dark" effect="solid">
                             <span>Seguir</span>
                            </ReactTooltip>
                            <button className='Refuse' data-tip data-for='Recusar'> <FiXSquare /></button>
                            <ReactTooltip id='Recusar' place="bottom" type="dark" effect="solid">
                             <span>Recusar</span>
                            </ReactTooltip>
                        </div>
                    </div>
                )
            })}
            </div>
            <div className="buttons-modal">
            <button className="butont-White" onClick={handleCloseModalFriend}>Cancelar</button>
            </div>
            </div>
            </Modal>
            {/* FIM Modal Friends  */}

            {/* Modal Notifications  */}
            <Modal isOpen={isOpenModalNotifications} onRequestClose={handleCloseModalNotifications}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalNotifications}>
            <FiX /> 
            </button>
            <div className="content-modal">
            <h3>Notificações</h3>
        
            <div className="search">          
            </div>
            
            <div className="itensModalNotifications">
            {notifications.map((notification) => {

                return(
                    <div className="notification" key={notification.id}>
                        <div className="name">
                        <UsersNotifications id={notification.idAccount} text={notification.text}/>
                        </div>
                    </div>
                )
            })}
            </div>
            <div className="buttons-modal">
            <button className="butont-White" onClick={handleCloseModalNotifications}>Cancelar</button>
            </div>
            </div>
            </Modal>
            {/* FIM Modal Notifications  */}
        </div>


    )
}

export {TopBar}