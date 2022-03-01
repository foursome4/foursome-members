import { useContext, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';
import './editPost.css'


function EditPost({data, id}) {
    const {editPost} = useContext(AuthContext);

    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);
    const [text, setText] = useState(data);

    function handleComment() {
        editPost(id, text)
        setText("");
        }

    return (
        <div className='editPost'>
               <input type="text" placeholder='Comentar' value={text} onChange={(e) => setText(e.target.value)}/>
               <button onClick={handleComment}><FiSend /> Editar</button>
        </div>
    )
}

export {EditPost}