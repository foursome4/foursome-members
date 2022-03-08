import { useState,useEffect, useContext} from 'react'
import api from '../../services/api'
import './userComment.css'
import { FiTrash2, FiEdit, FiMessageCircle, FiSend } from 'react-icons/fi'
import { AuthContext } from '../../contexts/Auth';
import { NewReply } from '../NewReply/NewReply';

function UserComment({idAccount, username, date, id, text}) {
    const {user, newComment, deleteComment} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);


    const [reply, setReply] = useState(false);
    const [commentText, setReplyText] = useState("");
    const [edit, setEdit] = useState(false);
    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    useEffect(() => {
        async function loadInformations() {
            await api.get(`informations/${idAccount}`).then((result) => {
                console.log(result.data[0])
                setNickname(result.data[0].nickname)
                setAvatar(result.data[0].avatar)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadInformations()
    }, [idAccount]);


    
    function handleHabiliteReply () {
        if(reply === false) {
            setReply(true)
        } else {
            setReply(false) 
        }
    }

    function handleComment(idPost) {
    newComment({text: commentText, idReply: "idReply", idAccount: userData.id, avatar:userInformation.avatar, nickname: userInformation.nickname, username: userData.username})
    setReplyText("");
    setReply(false) 
    }

    function handleDeleteComment(id) {
        deleteComment(id)
        }

        function handleHabiliteEdit () {
            if(edit === false) {
                setEdit(true)
            } else {
                setEdit(false) 
            }
        }

    return (
       <div className="itemComment">
           <div className="block1">
           <div className="title">
           <div className="image">
           <a href={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
               <img src={avatar} alt="" />
           </a>
           </div>
           <div className="name">
           <a href={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
               <h5>{nickname}</h5>
               </a>
           <p>{date}</p>
           </div>
           </div>
           {userData.id === idAccount ?
           <div className="buttonsComment">
               <button onClick={handleHabiliteReply} ><FiMessageCircle /></button>
               <button onClick={handleHabiliteEdit}><FiEdit /></button>
               <button onClick={() => {handleDeleteComment(id)}}><FiTrash2 /></button>
           </div>
           : 
           <div className="buttonsComment">
           <button onClick={handleHabiliteReply}><FiMessageCircle /></button>
               </div>
            }
            </div>
            <div className="comment-data" >
                <p><i>{text}</i></p>
            </div>

            {reply === true ?
            <NewReply id={id} username={username}/>
                     :
                     ""}
       </div>
    ) 
}


export {UserComment}