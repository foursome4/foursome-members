import './myMessages.css'
import Modal from 'react-modal';
import api from '../../../services/api';
import { UserConversation } from './UserConversation/UserConversation';
import { IoChatboxOutline, IoCloseOutline} from 'react-icons/io5';
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { useFetch } from '../../../hooks/useFetch';

function MyMessages() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    const [date, setDate] = useState(new Date("Tue Mar 06 2022 03:38:05 GMT-0300 (Hora padrão de Brasília)"));
    const [dateReadMessage, setDateReadMessage] = useState([])

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
    }, [user.id]);


    const newRooms = rooms.concat(rooms2);




    useEffect(() => {
      async function loadDateRead() {
        const idAccount = user.id
        await api.get(`/datereadmessage/${idAccount}`)
        .then( async (res) => {
            if(res.data.length !== 0) {
                      setDateReadMessage(res.data[0]);
            } else {
                const data = {
                    idAccount: user.id,
                    DateReadMessage: new Date() 
                }
                await api.post(`/datereadmessage`, data).then(() => {
                }).catch(error => {
            console.log("Erro ao buscar dados" + error)
        })
            }
        }).catch(error => {
            console.log("Erro ao buscar dados" + error)
        })
    }


      loadDateRead()
    }, [user.id])

    const idFriend = user.id;
    const {data} = useFetch(`notificationsmessage/my/${idFriend}`);

    let notificationsFilter = [];

    if(data) {
      notificationsFilter = data?.filter((notification) => (new Date(notification.created_at) > new Date(dateReadMessage.DateReadMessage) ))
    }




    function handleOpenModal() {
        setIsOpenModal(true)
      }
    
      function handleCloseModal() {
        setIsOpenModal(false)
      }

      async function handleMessages() {
        handleOpenModal();

        const date = new Date()
        handleNewDate(date)

        const id = dateReadMessage.id
        const data = {
            DateReadMessage: new Date()
        }

    await api.patch(`/datereadmessage/${id}`, data).then(() => {
        }).catch(error => {
        console.log("Erro ao buscar dados" + error)
    })

      }

      function handleNewDate(date) {
        setDate(date)
    }


      Modal.setAppElement('#root');
    return (
        <>
                <div className="link" onClick={handleMessages} data-tip data-for='Mensagens'>

                {notificationsFilter.length === 0 ? "" :
                    <div className="counter"></div>
                    }
                    
                  <IoChatboxOutline />
                </div>
                <ReactTooltip id='Mensagens' place="bottom" type="dark" effect="solid">
                   <span>Mensagens</span>
                </ReactTooltip>


                 
            {/* Modal Conversations  */}
            <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal">
            <h3>Conversas</h3>
        
            <div className="itensModalMessages">

            {newRooms.map((rooms) => {
                return(
                    <div className="rooms" key={rooms.room}>
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