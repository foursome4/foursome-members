import './FeedComments.css';
import { useContext, useEffect, useState, memo } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { parseISO, format} from 'date-fns';
import { UserComment } from '../UserComment/UserComment';
import { FeedReply } from '../FeedReply/FeedReply';

function FeedCommentsComponent({idPost}) {
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
            <h5>{dataComments.length} {dataComments.length === 1 ? "comentário" : "comentários"}</h5>

                    
                             {dataComments.map((comments) => {
                                 return (
                                    <div className="feed-comment" key={comments.id}>
                                    <UserComment idAccount={comments.idAccount} username={comments.username}
                                    date={comments.created_at} text={comments.text} idComment={comments.id}/>
                                    <FeedReply idComment={comments.id} />
                                    </div>
                                 )
                                })}
                          
  
        </div>
         
         
                        
    )
}

export const FeedComments = memo(FeedCommentsComponent)