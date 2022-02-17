import { useContext, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';
import './editComment.css'


function EditComment({data}) {
    const {newComment} = useContext(AuthContext);

    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);
    const [textComment, setTextComment] = useState("");

    function handleComment(data) {
        newComment({text: textComment, idPost: data, idAccount: userData.id, avatar:userInformation.avatar, nickname: userInformation.nickname, username: userData.username})
        setTextComment("");
        }

    return (
        <div className='editComment'>
               <input type="text" placeholder='Comentar' value={data} onChange={(e) => setTextComment(e.target.value)}/>
               <button onClick={() => {handleComment(data)}}><FiSend />Editar</button>
        </div>
    )
}

export {EditComment}