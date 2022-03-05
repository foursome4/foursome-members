import logoFoursomemini from '../../assets/images/logo-mini2.png'
import logoFoursome from '../../assets/images/logo2.png'
import { FiSearch, FiMessageSquare, FiUserPlus, FiBell, FiMail, FiLogOut, FiX, FiInfo } from 'react-icons/fi'
import avatarImg from '../../assets/images/avatar.png'
import './topBar.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal'
import api from '../../services/api'
import { UserConversation } from '../UserConversation/UserConversation'
import { UsersSearch } from '../UsersSearch/UsersSearch'
import { socket } from '../../services/websocket'

function TopBar() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);
    const [isOpenModalFriend, setIsOpenModalFriend] = useState(false);

    const [rooms, setRooms] = useState([])
    const [rooms2, setRooms2] = useState([])
    const [accounts, setAccoounts] = useState([])
    const [search, setSearch] = useState('')
    const [searchId, setSearchId] = useState('')
    const [type, setType] = useState("username")
 
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

          loadAccounts()
          loadRoomIdAccount()
          loadRoomIDFriend()

    }, [])




  const newRooms = rooms.concat(rooms2)
  const SearchUsers = accounts.filter((account) => account.username.startsWith(search))
  const SearchUsersId = accounts.filter((account) => account.id.startsWith(searchId))

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
        console.log("Modal")
      }

    function handleOpenModalSearch() {
        setIsOpenModalSearch(true)
      }
    
      function handleCloseModalSearch() {
        setIsOpenModalSearch(false)
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

      function handleSearch() {
        handleOpenModalSearch()
        console.log("Modal")
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
            logout(user.id)
        }
        function resetTimer() {
            clearTimeout(time);
            time = setTimeout(doSomething, 2000000)
        }
    }

    inactivityTime()



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
                <a href="/invite">
                <div className="link" data-tip data-for='Convidar'>
                    <FiUserPlus />
                </div>
                </ a>
                <ReactTooltip id='Convidar' place="bottom" type="dark" effect="solid">
                     <span>Convidar</span>
                </ReactTooltip>


                <div className="link" onClick={handleFriends} data-tip data-for='Notificações'>
                    <FiBell />
                </div>
                <ReactTooltip id='Notificações'  place="bottom" type="dark" effect="solid">
                     <span>Notificações</span>
                </ReactTooltip>


                <div className="link" data-tip data-for='Recados'>
                    <FiMail />
                </div>
                <ReactTooltip id='Recados' place="bottom" type="dark" effect="solid">
                     <span>Recados</span>
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

            <Modal isOpen={isOpenModalFriend} onRequestClose={handleCloseModalFriend}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalFriend}>
            <FiX /> 
            </button>
            <div className="content-modal">
            <h3>Notificações</h3>
        
            <div className="search">          
            </div>
            
            <div className="itensModalFriend">
           
            </div>
            <div className="buttons-modal">
            <button className="butont-White" onClick={handleCloseModalFriend}>Cancelar</button>
            </div>
            </div>
            </Modal>

        </div>


    )
}

export {TopBar}