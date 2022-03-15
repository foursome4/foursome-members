import logoFoursomemini from '../../assets/images/logo-mini2.png';
import logoFoursome from '../../assets/images/logo2.png';
import { FiMessageSquare, FiMail, FiLogOut, FiX, FiInfo} from 'react-icons/fi';
import avatarImg from '../../assets/images/avatar.png';
import './topBar.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import api from '../../services/api';
import { UserConversation } from '../UserConversation/UserConversation';

import { SearchUsers } from '../ButtonsTopBar/SearchUsers/SearchUsers';
import { SolicitationsFriend } from '../ButtonsTopBar/SolicitationsFriend/SolicitationsFriend';
import { Notifications } from '../ButtonsTopBar/Notifications/Notifications';

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

          loadRoomIdAccount()
          loadRoomIDFriend()
    }, [user.id])


  const newRooms = rooms.concat(rooms2)

 


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

            <SearchUsers />
  
            <div className="links">


                <SolicitationsFriend />
                <Notifications /> 



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

        </div>


    )
}

export {TopBar}