import { FiImage, FiVideo, FiUsers, FiList, FiMenu, FiTrash2, FiEdit, FiMessageCircle, FiThumbsUp, FiMinus, FiSend, FiChevronDown } from 'react-icons/fi'
import './feedPostEvent.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { parseISO, format} from 'date-fns';
import { FeedComments } from '../FeedComments/FeedComments';
import { ListReactions } from '../ListReactions/ListReactions';
import { NewComment } from '../NewComment/NewComment';

    function FeedPostEvent({idEvent}) {

    const [data, setData] = useState([]);
   

    const {user} = useContext(AuthContext);
    useEffect(() => {
          async function findPosts() {
    
            const res = await api.get(`/posts/groups/${idEvent}`);
            const dataPosts = (res.data)
            setData(dataPosts)
        }
        findPosts()

    }, [user, data.sort()])




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
                                        <ListReactions idPost={postsData.id} />
                                        <button onClick={handleHabiliteComment}>
                                            <FiMessageCircle />
                                            Comentar
                                        </button>
                                        {postsData.idAccount === user.id ?
                                        <>
                                            <button> <FiEdit /> Editar </button>
                                            <button> <FiTrash2 /> Apagar </button>
                                            </>
                                        : ""}
                                    </div>

                                    <div className={comment === true ? "comment" : "commentHidden"}>
                                    <NewComment postData={postsData.id}/>
                                    </div>

                            <FeedComments idPost={postsData.id} />
                                </div>
                                </>
                                )
                            }))}
                           </div>

        </div>
         
         
                        
    )
}

export {FeedPostEvent}