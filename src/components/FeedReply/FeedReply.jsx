import './feedReply.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { parseISO, format} from 'date-fns';
import { UserReply } from '../UserReply/UserReply';

function FeedReply({idComment}) {
    const [reply, setReply] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(() => {
          async function Comments() {
            const res = await api.get(`/reply/${idComment}`);
            const dataPosts = (res.data)
            setReply(dataPosts)
        }
        Comments()
    }, [user, idComment, reply])



    return (
        reply.length === 0 ? "" :    
        <div className="feedReply">
           
                             {reply.map((replys) => {
                                const date = parseISO(replys.created_at);
                                const dateFormated = format(
                                    date, 
                                    "dd'/'MM'/'yyyy' às 'HH:mm'h'"
                                );
                                 return (
                                    <div className="feed-reply" key={replys.id}>
                                    <UserReply idAccount={replys.idAccount} username={replys.username} date={dateFormated} text={replys.text} id={replys.id}/>
                                    </div>
                                 )
                             })}
        </div>                       
    )
}

export {FeedReply}