import { FiSend,  FiRefreshCcw} from 'react-icons/fi'
import './postTextEvent.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';


function PostTextEvent({nameEvent, idEvent}) {
    console.log(nameEvent, idEvent)
    const {newPostEvent} = useContext(AuthContext)
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    
    async function handlePost(e) {
        e.preventDefault();

        newPostEvent({
                idAccount: user.id,
                link: "",
                username: user.username,
                nameGroup: "",
                nameForum: "",
                nameEvent: nameEvent,
                idEvent: idEvent,
                idGroup: "",
                idForum: "",
                type: "post-text-event",
                text,
                idPatrono: null
            })
            setText("")
            reset()
           
            
    }

    function reset() {
        setText("")
    }
    
    return (
        <div className="post">
             <div className="post-data">
            <div className="avatar">
            <img src={userInformation.avatar} alt="" />
            </div>
            <div className="post-type">
                <div className="inputs">
                <textarea name="" id="" cols={30} rows={10} placeholder="Deixe um comentário sobre o evento"
                onChange={(e) => setText(e.target.value)}></textarea>
              
                    <button className="public" onClick={handlePost}>
                        {loading === true ? <FiRefreshCcw /> : <FiSend /> } </button>
                </div>
            </div>      
            </div>
        </div>
         
         
                        
    )
}

export {PostTextEvent}