import { useContext, useEffect, useState } from "react"
import {FiThumbsUp } from 'react-icons/fi'
import { AuthContext } from "../../contexts/Auth";
import api from "../../services/api"
import {toast} from 'react-toastify';
import "./listReactions.css"


function ListReactions({idPost}) {
    const {likePost, deleteLike} = useContext(AuthContext);
    const [like, setLike] = useState([]);
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    useEffect(() => {
        async function loadReactions() {
           const res =  await api.get(`/reactions/${idPost}`)
                setLike(res.data);
        }

        loadReactions()
    }, [like]);

    const myLike = like.filter(likes => (likes.idAccount === userData.id));
    function handleLikePost(e) {
        e.preventDefault()
       likePost({idAccount: userData.id, username: userData.username, idPost})
    }

    function handleDeleteLike(e) {
        e.preventDefault()
      deleteLike(like[0].id)
     }



    return (
        <div className="reactionsList">
              <button className={myLike.length === 0 ? "" :"selected"} onClick={myLike.length === 0 ? handleLikePost : handleDeleteLike}>
                  <FiThumbsUp />
                    Curtir
                  </button>
            <h5>{like.length === 0 ? "" :
            <>
            ({like.length})
            </>
            }</h5>
        </div>
    )
}


export {ListReactions}