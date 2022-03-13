import { useContext, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';
import './editReply.css'


function EditReply({data, id}) {
    const {editReply} = useContext(AuthContext);
    const [text, setTextReply] = useState(data);

    function handleReply() {
        editReply(id, text)
        setTextReply("");
        }

    return (
        <div className='editReply'>
               <input type="text" placeholder='Comentar' value={text} onChange={(e) => setTextReply(e.target.value)}/>
               <button onClick={handleReply}><FiSend />Editar</button>
        </div>
    )
}

export {EditReply}