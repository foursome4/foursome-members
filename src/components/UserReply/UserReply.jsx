import { useState,useEffect, useContext} from 'react'
import api from '../../services/api'
import './userReply.css'
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { AuthContext } from '../../contexts/Auth';
import { NewReply } from '../NewReply/NewReply';
import { EditReply } from '../EditReply/EditReply';

function UserReply({idAccount, username, date, id, text}) {
    const {newComment, deleteReply} = useContext(AuthContext);
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
                setNickname(result.data[0].nickname)
                setAvatar(result.data[0].avatar)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadInformations()
    }, [idAccount]);


    
    function handleDeleteReply(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
           deleteReply(id)
            } 
        }

        function handleHabiliteEdit () {
            if(edit === false) {
                setEdit(true)
            } else {
                setEdit(false) 
            }
        }

    return (
       <div className="itemReply" key={userData.id}>
           <div className="block1">
           <div className="title">
           <div className="image">
           <a href={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
               <img src={avatar} alt="" />
           </a>
           </div>
           <div className={userData.id === idAccount ? "MyName":"name"}>
           <a href={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
               <h6>{nickname}</h6>
               </a>
           <p>{date}</p>
           </div>
           </div>
           {userData.id === idAccount ?
           <div className="buttonsReply">
               <button onClick={handleHabiliteEdit}><FiEdit /></button>
               <button onClick={() => {handleDeleteReply(id)}}><FiTrash2 /></button>
           </div>
           : ""
            }
            </div>
            <div className="Reply-data" >
                <p><i>{text}</i></p>
            </div>

            {edit === true ?
            <EditReply id={id} data={text}/>
                     :
                     ""}
            {reply === true ?
            <NewReply id={id} username={username}/>
                     :
                     ""}
       </div>
    ) 
}


export {UserReply}