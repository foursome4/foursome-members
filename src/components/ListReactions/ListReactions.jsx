import { useContext, useEffect, useState, memo } from "react"
import {FiThumbsUp } from 'react-icons/fi'
import { AuthContext } from "../../contexts/Auth";
import api from "../../services/api"
import "./listReactions.css"
import {v4 as uuiv4} from 'uuid'


function ListReactionsComponent({idPost}) {
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
    }, [idPost]);

    const myLike = like.filter(likes => (likes.idAccount === userData.id));
    console.log(myLike)

    function handleLikePost(e) {
        e.preventDefault()
        console.log("Curti")
        const data = {id: uuiv4(), idAccount: userData.id, username: userData.username, idPost}
        setLike([...like, data]);
       likePost({idAccount: userData.id, username: userData.username, idPost});
       console.log(myLike)
    }

    function handleDeleteLike(e) {
        e.preventDefault();
        deleteLike(like[0].id)
        let newLike = like.filter(user => user.id !== like[0].id);
          setLike(newLike)
        console.log(myLike)
        
     }



    return (
        <div className="reactionsList">
              <button className={myLike.length === 0 ? "" :"selected"} onClick={myLike.length === 0 ? handleLikePost : handleDeleteLike}>
                  <FiThumbsUp /> {like.length === 0 ? "" :
            <>
            {like.length}
            </>
            }
                  </button>
        </div>
    )
}


export const ListReactions = memo(ListReactionsComponent)