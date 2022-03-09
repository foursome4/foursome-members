import { FiTrash2, FiEdit } from 'react-icons/fi'
import './feedPostEvent.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { parseISO, format} from 'date-fns';
import { UsersPosts } from '../UsersPosts/UsersPosts';


    function FeedPostEvent({idEvent}) {
    const [data, setData] = useState([]); 
    const {user, deletePost} = useContext(AuthContext);

    useEffect(() => {
          async function findPosts() {
    
            const res = await api.get(`/posts/events/${idEvent}`);
            const dataPosts = (res.data)
            setData(dataPosts)
        }
        findPosts()

    }, [idEvent]);

    function handleDeletePost(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
    
        if(deletar === true) {
           deletePost(id);
            } 
        }

    return (
        <div className="feedPostIndividual">
            <div className="posts-feed">
                            
                                {data.map((postsData => {
                                const date = parseISO(postsData.created_at);
                                const dateFormated = format(
                                    date, 
                                "dd'/'MM'/'yyyy', às 'HH:mm'h'"
                                );

                                    return (   
                                        <>                      
                                <div className="feed-post" key={postsData.id}>
                                <UsersPosts idAccount={postsData.idAccount} username={postsData.username} date={dateFormated} />

                                    <div className="post-data" >
                                        <p>{postsData.text}</p>
                                    </div>
                                    <div className="reactions-individual" >
                                        {postsData.idAccount === user.id ?
                                        <>
                                            <button> <FiEdit />  </button>
                                            <button onClick={() => {handleDeletePost(postsData.id)}}> <FiTrash2 />  </button>
                                            </>
                                        : ""}
                                    </div>
                                </div>
                                </>
                                )
                            }))}
                           </div>

        </div>
         
         
                        
    )
}

export {FeedPostEvent}