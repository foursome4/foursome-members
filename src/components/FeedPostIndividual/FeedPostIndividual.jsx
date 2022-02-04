import { FiImage, FiVideo, FiUsers, FiList, FiMenu, FiTrash2, FiEdit, FiMessageCircle, FiThumbsUp, FiMinus, FiSend, FiChevronDown } from 'react-icons/fi'
import './feedPostIndividual.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { parseISO, format} from 'date-fns';
import { FeedComments } from '../FeedComments/FeedComments';
import { ListReactions } from '../ListReactions/ListReactions';

    function FeedPostIndividual({id}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);


    const [post, setPost] = useState("");
    const [data, setData] = useState([]);
    const [comment, setComment] = useState(false);
    const [viewComment, setViewComment] = useState(true);
    const [textComment, setTextComment] = useState("");

    const {user, newComment, likePost} = useContext(AuthContext);
    useEffect(() => {
          async function findPosts() {
            if(post === "") {
            const res = await api.get(`/posts/filter/accounts/${userData.id}`);
            const dataPosts = (res.data)
            setData(dataPosts)
        } else {
            const idAccount = userData.id;
            const type = post;
            const res = await api.get(`/posts/filter/${idAccount}/${type}`);
            const dataPosts = (res.data)
            setData(dataPosts)
        }
        }
        findPosts()

    }, [user, post])

    function postAll() {
        setPost("")
    }

    function postText() {
        setPost("post-text")
    }

    function postPhoto(){
        setPost("post-photo")
    }

    function postVideo(){
        setPost("post-video")
    }

    function postGroup(){
        setPost("post-group")
    }

    function postForum(){
        setPost("post-forum")
    }

    function handleHabiliteComment () {
        if(comment === false) {
            setComment(true)
        } else {
            setComment(false) 
        }
    }


    function handleComment(idPost) {
    newComment({text: textComment, idPost, idAccount: userData.id, avatar:userInformation.avatar, nickname: userInformation.nickname, username: userData.username})
    setTextComment("");
    setComment(false) 
    }

    function handleLikePost( idPost) {
        likePost({idAccount: userData.id, username: userData.username, idPost})
    }


    return (
        <div className="feedPostIndividual">
            <div className="posts-feed">
            <div className="buttons">
            <button className={post === "" ? 'selected' : ""} onClick={postAll}> <FiMenu /> Todos </button>
            <button className={post === "post-text" ? 'selected' : ""} onClick={postText}> <FiMenu /> Texto </button>
            <button className={post === "post-photo" ? 'selected' : ""} onClick={postPhoto}> <FiImage /> Foto </button>
            <button className={post === "post-video" ? 'selected' : ""} onClick={postVideo}> <FiVideo /> Vídeo </button>
            <button className={post === "post-group" ? 'selected' : ""} onClick={postGroup}> <FiUsers /> Grupo </button>
            <button className={post === "post-forum" ? 'selected' : ""} onClick={postForum}> <FiList /> Fórum </button>
            </div>
                            
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

                                    {postsData.type === "post-photo" ?
                                  
                                        <div className="post-data-media" >
                                               <div className='image'>
                                         <div className="mark">
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                         </div>
                                            <img src={postsData.link} alt={"Post Image"} width={500}/>
                                        </div> 
                                        </div> :
                                    postsData.type === "post-video" ?
                                        <div className="post-data-media" >
                                               <div className='image'>
                                         <div className="mark">
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                         </div>
                                        <video controls >
                                            <source src={postsData.link} type="video/mp4"/>
                                            </video>
                                        </div> 
                                        </div> :
                                    ""
                                      }

                                    <div className="reactions-individual" >
                                        <button className="selected"  onClick={() => {handleLikePost(postsData.id)}}>
                                            <FiThumbsUp />
                                            Curtir
                                        </button>
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
                                        <input type="text" placeholder='Comentar' value={textComment} onChange={(e) => setTextComment(e.target.value)}/> <button onClick={() => {handleComment(postsData.id)}}><FiSend /> Comentar</button>
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

export {FeedPostIndividual}