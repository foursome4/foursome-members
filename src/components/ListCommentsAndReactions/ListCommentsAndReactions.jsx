import "./listCommentsAndReactions.css";
import { useFetch } from '../../hooks/useFetch';
import { UsersLike } from "../UsersLike/UsersLike";
import { UsersSearchLikes } from "../ButtonsTopBar/SearchUsers/UsersSearchLikes/UsersSearchLikes";
import {IoCloseOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { useState } from "react";

function ListCommentsAndReactions({idPost}) {   
    const [isOpenModalFriend, setIsOpenModalFriend] = useState(false);
    const {data} = useFetch(`/reactions/${idPost}`);

    if(data) {
        console.log(data)
    }

    if(!data) {
        return (
            <div className="load">
                <h5>Carregando...</h5>
            </div>
        )
    }

    function handleOpenModalFriend() {
        setIsOpenModalFriend(true)
      }
    function handleFriends() {
        handleOpenModalFriend();
      }
    
      function handleCloseModalFriend() {
        setIsOpenModalFriend(false)
      }


    Modal.setAppElement('#root');
    return (
        <div className="ListCommentsAndReactions">
            {data.length === 1?
            <h5> <UsersLike idAccount={data[0].idAccount} username={data[0].username} /> &nbsp; curtiu </h5>
            :data.length === 2?
            <h5> <UsersLike idAccount={data[0].idAccount} username={data[0].username} /> &nbsp; e &nbsp;<UsersLike idAccount={data[1].idAccount} username={data[1].username} /> &nbsp; curtiram</h5>
            :data.length > 2 ?
            <div className="text">
                <h5><UsersLike idAccount={data[0].idAccount} username={data[0].username} /> , &nbsp;<UsersLike idAccount={data[1].idAccount} username={data[1].username} />&nbsp; </h5> <h5 onClick={handleFriends}>  e mais {data.length - 2} curtiram</h5>
            </div>
        
            : "" }


               {/* Modal Friends  */}
               <Modal isOpen={isOpenModalFriend} onRequestClose={handleCloseModalFriend}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalFriend}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal">
            <h3>{`${data.length} pessoas curtiram`}</h3>
            <br />
            <div className="itensModalFriend">
            {data?.map((friend) => {
                return(
                    <div className="accounts" key={friend.idAccount}>
                    <UsersSearchLikes idAccount={friend.idAccount} />
                    </div>
                )
            })}
            </div>
            </div>
            </Modal>
            {/* FIM Modal Friends  */}
        </div>
    )
}

export {ListCommentsAndReactions}