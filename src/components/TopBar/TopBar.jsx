import logoFoursomemini from '../../assets/images/logo-mini2.png'
import logoFoursome from '../../assets/images/logo2.png'
import { FiSearch, FiMessageSquare, FiUserPlus, FiBell, FiMail, FiLogOut, FiX } from 'react-icons/fi'
import avatarImg from '../../assets/images/avatar.png'
import './topBar.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal'
import api from '../../services/api'
import { UserConversation } from '../UserConversation/UserConversation'

function TopBar() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const [rooms, setRooms] = useState([])
    const [rooms2, setRooms2] = useState([])

    useEffect(() => {
        async function loadRoomIdAccount() {
            const idAccount = user.id
            await api.get(`conversations/account/filter/${idAccount}`)
            .then( async (res) => {
                console.log("Busca Sala - tentativa 1");
                console.log(res.data)
                setRooms(res.data)
            }).catch(error => {
              console.log("Erro ao buscar dados" + error)
          })
          }

          async function loadRoomIDFriend() {
            const idFriend = user.id
            await api.get(`conversations/friend/filter/${idFriend}`)
            .then( async (res) => {
                console.log("Busca Sala - tentativa 2");
                console.log(res.data)
                setRooms2(res.data)
            }).catch(error => {
              console.log("Erro ao buscar dados" + error)
          })
          }

          

          loadRoomIdAccount()
          loadRoomIDFriend()
    }, [])

    console.log("Salas")
    const newRooms = rooms.concat(rooms2)
    console.log("New Salas")
    console.log(newRooms)
  

    function Tologout(e) {
        e.preventDefault();
        logout()
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


      Modal.setAppElement('#root');
    return (
        <div className="topBar">
            <div className="logo">
                <Link to="/feed">
                <img src={logoFoursome} alt="" />
                </Link>
            </div>
            <div className="logo2">
                  <Link to="/feed">
                <img src={logoFoursomemini} alt="" />
                </Link>
            </div>
            <div className="search">
                <FiSearch />
                <input type="text" />
            </div>
            <div className="links">
                <Link to="/invite">
                <div className="link" data-tip data-for='Convidar'>
                    <FiUserPlus />
                </div>
                </ Link>
                <ReactTooltip id='Convidar' place="bottom" type="dark" effect="solid">
                     <span>Convidar</span>
                </ReactTooltip>


                <div className="link" data-tip data-for='Notificações'>
                    <FiBell />
                </div>
                <ReactTooltip id='Notificações' place="bottom" type="dark" effect="solid">
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
                    <Link to="/profile">
                        <div className="avatar">
                    <img src={userInformation !== null ? userInformation.avatar : avatarImg} alt="" />
                    </div>
                    </Link>
                    <Link to="/profile">
                    <h4>@{user !== null ? user.username : "Usuário não encontrado"}</h4>
                    </Link>
                </div>
            </div>
           
 
            <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <FiX /> 
            </button>
            <div className="content-modal">
            <h3>Mensagens</h3>
        
            <div className="itensModal">
            </div>

            {newRooms.map((rooms) => {
                return(
                    
                    <div className="rooms" key={rooms.id}>
                        <UserConversation idAccount={rooms.idAccount !== user.id ? rooms.idAccount : rooms.idFriend} room={rooms.room}/>
                        {/* <h4>{rooms.idAccount} - {rooms.idFriend} - {rooms.room}</h4> */}
                    </div>
                )
            })}
            
            
            <div className="buttons-modal">
            <button className="butont-White" onClick={handleCloseModal}>Cancelar</button>
            </div>
            </div>
            </Modal>

        </div>


    )
}

export {TopBar}