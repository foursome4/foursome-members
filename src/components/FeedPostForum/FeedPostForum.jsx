import { FiTrash2, FiEdit, FiMessageCircle } from 'react-icons/fi'
import './feedPostForum.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { parseISO, format} from 'date-fns';
import { FeedComments } from '../FeedComments/FeedComments';
import { ListReactions } from '../ListReactions/ListReactions';
import { NewComment } from '../NewComment/NewComment';
import { UsersPosts } from '../UsersPosts/UsersPosts';

    function FeedPostForum({idForum}) {

    const [data, setData] = useState([]);
    const [comment, setComment] = useState(false);

    const {user, deletePost} = useContext(AuthContext);
    useEffect(() => {
          async function findPosts() {
    
            const res = await api.get(`/posts/foruns/${idForum}`);
            const dataPosts = (res.data)
            setData(dataPosts)
        }
        findPosts()

    }, [user, data.sort()])


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
                                        {/* <ListReactions idPost={postsData.id} />
                                        <button onClick={handleHabiliteComment}>
                                            <FiMessageCircle />
                                            Comentar
                                        </button> */}
                                        {postsData.idAccount === user.id ?
                                        <>
                                            <button> <FiEdit />  </button>
                                            <button onClick={() => {handleDeletePost(postsData.id)}}> <FiTrash2 />  </button>
                                            </>
                                        : ""}
                                    </div>

                                    {/* <div className={comment === true ? "comment" : "commentHidden"}>
                                    <NewComment postData={postsData.id}/>
                                    </div>

                            <FeedComments idPost={postsData.id} /> */}
                                </div>
                                </>
                                )
                            }))}
                           </div>

        </div>
         
         
                        
    )
}

export {FeedPostForum}