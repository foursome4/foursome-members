import "./listComments.css";
import { useFetch } from '../../hooks/useFetch';
import { UsersLike } from "../UsersLike/UsersLike";
import { UsersSearchLikes } from "../ButtonsTopBar/SearchUsers/UsersSearchLikes/UsersSearchLikes";
import {IoCloseOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { useState } from "react";
import { FeedComments } from "../FeedComments/FeedComments";

function ListComments({idPost}) {   
    const [isOpenModalFriend, setIsOpenModalFriend] = useState(false);
    const {data} = useFetch(`/comments/${idPost}`);

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
        <div className="ListComments">
            {data.length === 0 ? "" :
            <div className="text">
            <h5 onClick={handleFriends}>{data.length} {data.length === 1 ? "Comentário" : "Comentários"}</h5>
            </div>
            }
        


               {/* Modal Friends  */}
               <Modal isOpen={isOpenModalFriend} onRequestClose={handleCloseModalFriend}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalFriend}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal">
            <h5>{`${data.length} comentários`}</h5>
            <br />
            <div className="itensModalFriend">
           
                  <FeedComments idPost={idPost}/>

            </div>
            </div>
            </Modal>
            {/* FIM Modal Friends  */}
        </div>
    )
}

export {ListComments}