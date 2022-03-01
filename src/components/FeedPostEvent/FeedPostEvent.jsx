import { FiTrash2, FiEdit, FiMessageCircle } from 'react-icons/fi'
import './feedPostEvent.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { parseISO, format} from 'date-fns';


    function FeedPostEvent({idEvent}) {

    const [data, setData] = useState([]);
    const [comment, setComment] = useState(false);
   

    const {user} = useContext(AuthContext);
    useEffect(() => {
          async function findPosts() {
    
            const res = await api.get(`/posts/events/${idEvent}`);
            const dataPosts = (res.data)
            setData(dataPosts)
        }
        findPosts()

    }, [user, data.sort()])

    function handleHabiliteComment () {
        if(comment === false) {
            setComment(true)
        } else {
            setComment(false) 
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
                                    <div className="post-user" >
                                        <img src={postsData.avatar} alt="" />
                                        <div className="info-data">
                                        <div className="name-data">
                                        <h4 className="selected">{postsData.nickname}</h4>
                                        </div>
                                        <div className="time-data">
                                            <h5>{dateFormated}</h5>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="post-data" >
                                        <p>{postsData.text}</p>
                                    </div>
                                    <div className="reactions-individual" >
                                        {postsData.idAccount === user.id ?
                                        <>
                                            <button> <FiEdit />  </button>
                                            <button> <FiTrash2 />  </button>
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