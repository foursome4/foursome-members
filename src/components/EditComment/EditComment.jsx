import { useContext, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';
import './editComment.css'


function EditComment({data, id}) {
    const {editComment} = useContext(AuthContext);
    const [text, setTextComment] = useState(data);

    function handleComment() {
        editComment(id, text)
        setTextComment("");
        }

    return (
        <div className='editComment'>
               <input type="text" placeholder='Comentar' value={text} onChange={(e) => setTextComment(e.target.value)}/>
               <button onClick={handleComment}><FiSend />Editar</button>
        </div>
    )
}

export {EditComment}