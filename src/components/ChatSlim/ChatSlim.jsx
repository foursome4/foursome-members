
import './chatSlim.css'
import { FaCircle } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch';

function ChatSlim() {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

const {data} = useFetch(`/online`);

     
    return (
        <div className="content-chat">
            {data?.map((user) => {
                return (
                    user.idAccount === userData.id ? "" :
                    <div className="chat-avatar" key={user.idAccount}>
                        <FaCircle />
                        <a href={user.idAccount === userData.id ? `/profile` : `/profile-friend/${user.idAccount}`}>
                    <img src={user.avatar} alt={user.username} width="35px"/>
                    </a>
                     </div>
                )
            })}
        </div>
    )
}

export {ChatSlim}