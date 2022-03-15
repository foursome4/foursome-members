import './solicitationsFriend.css';
import { useEffect, useContext, useState } from "react";
import Modal from 'react-modal';
import api from "../../../services/api";
import ReactTooltip from 'react-tooltip';
import {  FiX, FiCheckSquare, FiHeart, FiXSquare, FiUserPlus } from 'react-icons/fi';
import { UsersPending } from '../../UsersPending/UsersPending';
import { AuthContext } from "../../../contexts/Auth";

function SolicitationsFriend() {
    const {friendAproved, deleteFriend, deleteFriendAndFollower} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    const [isOpenModalFriend, setIsOpenModalFriend] = useState(false);
    const [myFriends, setMyFriends] = useState([]);


    useEffect(() => {
        async function loadFriends() {
            const idAccount = user.id;
            const result = await api.get(`/friends/${idAccount}`);
            setMyFriends(result.data)
          }

          loadFriends()

    }, [user.id]);


    const friendPending = myFriends.filter(friend => (friend.status === 'pending' && friend.idFriend === user.id));


    function handleOpenModalFriend() {
        setIsOpenModalFriend(true)
      }
    function handleFriends() {
        handleOpenModalFriend()
      }
    
      function handleCloseModalFriend() {
        setIsOpenModalFriend(false)
      }

      function handleAprovedFriend(id) {
        friendAproved(id)
    }

    function handleDeleteFriend(id) {
        deleteFriend(id)
    }
    function handleFollowerFriend(id, friendId ) {
        const idAccount = friendId
        const idFriend = user.id
        const type = "friend"
        const status = "aproved"
        deleteFriendAndFollower(id, idAccount, idFriend, type, status)
    }

    Modal.setAppElement('#root');
    return (
        <>
        <div className="link"  onClick={handleFriends} data-tip data-for='Solicitações'>
        {friendPending.length === 0 ? "" :
        <div className="counter"> {friendPending.length}</div>
        }
        <FiUserPlus />
    </div>
    <ReactTooltip id='Solicitações' place="bottom" type="dark" effect="solid">
         <span>Solicitações</span>
    </ReactTooltip>



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
                            <button className='Acept' data-tip data-for='Aceitar' onClick={() => handleAprovedFriend(friend.id)}><FiCheckSquare /></button>
                            <ReactTooltip id='Aceitar' place="bottom" type="dark" effect="solid">
                             <span>Aceitar</span>
                            </ReactTooltip>
                            <button className='Acept' data-tip data-for='Seguir' onClick={() => handleFollowerFriend(friend.id, friend.idAccount )}> <FiHeart /></button>
                            <ReactTooltip id='Seguir' place="bottom" type="dark" effect="solid">
                             <span>Seguir</span>
                            </ReactTooltip>
                            <button className='Refuse' data-tip data-for='Recusar' onClick={() => handleDeleteFriend(friend.id)}> <FiXSquare /></button>
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
    </>
    )
}

export {SolicitationsFriend}