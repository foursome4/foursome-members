import './myMessages.css'
import Modal from 'react-modal';
import api from '../../../services/api';
import { UserConversation } from '../../UserConversation/UserConversation';
import { FiMessageSquare, FiX} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

function MyMessages() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

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
        <>
                <div className="link" onClick={handleMessages} data-tip data-for='Mensagens'>
                  <FiMessageSquare />
                </div>
                <ReactTooltip id='Mensagens' place="bottom" type="dark" effect="solid">
                   <span>Mensagens</span>
                </ReactTooltip>


                 
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

        </>
    )
}

export {MyMessages}