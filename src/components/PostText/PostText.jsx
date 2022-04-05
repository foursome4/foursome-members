import { FiSend,  FiRefreshCcw} from 'react-icons/fi'
import './postText.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';


function PostText({nameForum, idForum}) {
    console.log(nameForum, idForum)
    const {newPost} = useContext(AuthContext)
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);
    
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("");
    
    async function handlePost(e) {
        e.preventDefault();
        setLoading(true)

            newPost({
                idAccount: user.id,
                link: "",
                username: user.username,
                nameGroup: "",
                nameForum: nameForum,
                nameEvent: "",
                idEvent: "",
                idGroup: "",
                idForum: idForum,
                type: "post-text-forum",
                text,
                idPatrono: null
            })
        
            setLoading(false)
            setText("")
            console.log("Text")
    }
        

 
    return (
        <div className="post">
             <div className="post-data">
            <div className="avatar">
            <img src={userInformation.avatar} alt="" />
            </div>
            <div className="post-type">
                <div className="inputs">
                <textarea name="" id="" cols={30} rows={10} placeholder="Dê sua dica ou opnião"
                onChange={(e) => setText(e.target.value)}></textarea>
              
                    <button className="public" onClick={handlePost}>
                        {loading === true ? <FiRefreshCcw /> : <FiSend /> } </button>
                </div>
            </div>      
            </div>
        </div>
         
         
                        
    )
}

export {PostText}