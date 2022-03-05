import "./deleteMessage.css"
import { useContext } from 'react';
import { FiTrash } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';

function DeleteMessage(_id) {
    console.log(_id._id)
    const {deleteActualMessage} = useContext(AuthContext);

    function handleMessageDelete(e){
        e.preventDefault();
        deleteActualMessage(_id._id)
    }

    return (
        <div className="delete">
            <button className ="buttonDelete" onClick={handleMessageDelete}><FiTrash /></button>
        </div>
    )
}

export {DeleteMessage}