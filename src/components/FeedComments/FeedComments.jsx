import './FeedComments.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { parseISO, format} from 'date-fns';
import { UserComment } from '../UserComment/UserComment';
import { FeedReply } from '../FeedReply/FeedReply';

function FeedComments({idPost}) {
    const [dataComments, setDataComments] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(() => {
          async function Comments() {
            const res = await api.get(`/comments/${idPost}`);
            const dataPosts = (res.data)
            setDataComments(dataPosts)

        }

        Comments()

    }, [user, idPost, dataComments])



    return (
        <div className="feedComments">
            <h5>{dataComments.length} comentários</h5>

                    
                             {dataComments.map((comments) => {
                                const date = parseISO(comments.created_at);
                                const dateFormated = format(
                                    date, 
                                    "dd'/'MM'/'yyyy' às 'HH:mm'h'"
                                );
                                 return (
                                    <div className="feed-comment" key={comments.id}>
                                    <UserComment idAccount={comments.idAccount} username={comments.username} date={dateFormated} text={comments.text} idComment={comments.id}/>
                                    <FeedReply idComment={comments.id} />
                                    </div>
                                 )
                                })}
                          
  
        </div>
         
         
                        
    )
}

export {FeedComments}