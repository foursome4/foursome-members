import { useContext, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';
import './newReply.css'


function NewReply({id, username}) {
    const {newReply} = useContext(AuthContext);

    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);
    const [textComment, setTextComment] = useState("");

    function handleComment(id) {
        newReply({text: textComment, idReply: id, idAccount: userData.id, avatar:userInformation.avatar, nickname: userInformation.nickname, username: userData.username})
        setTextComment("");
        }

    return (
        <div className='commentNew'>
               <input type="text" placeholder={`Responder a ${username}`} value={textComment} onChange={(e) => setTextComment(e.target.value)}/>
               <button onClick={() => {handleComment(id)}}><FiSend /> Responder</button>
        </div>
    )
}

export {NewReply}