import './notifications.css'
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import api from "../../../services/api";
import ReactTooltip from 'react-tooltip';
import { UsersNotifications } from '../../UsersNotifications/UsersNotifications';
import { IoNotificationsOutline, IoCloseOutline} from 'react-icons/io5';

function Notifications() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    const [date, setDate] = useState(new Date("Tue Mar 06 2022 03:38:05 GMT-0300 (Hora padrão de Brasília)"))
    const [dateRead, setDateRead] = useState([])

    const [isOpenModalNotifications, setIsOpenModalNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        async function loadDateRead() {
            const idAccount = user.id
            await api.get(`/dateread/${idAccount}`)
            .then( async (res) => {
                if(res.data.length !== 0) {
                    setDateRead(res.data[0]);
                } else {
                    const data = {
                        idAccount: user.id,
                        DateRead: new Date() 
                    }
                    await api.post(`/dateread`, data) .then((res) => {
                        console.log("Data inicial definida com sucesso!")
                    }).catch(error => {
                console.log("Erro ao buscar dados" + error)
            })
                }
            }).catch(error => {
                console.log("Erro ao buscar dados" + error)
            })
        }

        async function loadNotifications() {
            const idPatrono = user.id
          const result = await api.get(`/notifications/my/${idPatrono}`);
          setNotifications(result.data)
        }

        loadDateRead()
        loadNotifications()
    }, [user.id]);


    const notificationsFilter = notifications.filter((notification) => (new Date(notification.created_at) > new Date(dateRead.DateRead) ))


    function handleOpenModalNotifications() {
        setIsOpenModalNotifications(true)
      }
    async function handleNotifications() {
        handleOpenModalNotifications()
        const date = new Date()
        handleNewDate(date)

        const id = dateRead.id
        const data = {
            DateRead: new Date()
        }

    await api.patch(`/dateread/${id}`, data).then((res) => {
        console.log("Data inicial alterada com sucesso!")
        }).catch(error => {
        console.log("Erro ao buscar dados" + error)
    })

      }
    
      function handleCloseModalNotifications() {
        setIsOpenModalNotifications(false)
      }

      function handleNewDate(date) {
        setDate(date)
    }



    
    Modal.setAppElement('#root');
    return (
        <>
                        <div className="link" onClick={handleNotifications} data-tip data-for='Notificações'>
                {notificationsFilter.length === 0 ? "" :
                    <div className="counter"> {notificationsFilter.length}</div>
                    }
                    <IoNotificationsOutline />
                </div>
                <ReactTooltip id='Notificações'  place="bottom" type="dark" effect="solid">
                     <span>Notificações</span>
                </ReactTooltip>



                            {/* Modal Notifications  */}
            <Modal isOpen={isOpenModalNotifications} onRequestClose={handleCloseModalNotifications}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalNotifications}>
            <IoCloseOutline /> 
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
        </>
    )

}

export {Notifications}