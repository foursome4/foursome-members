import { FiImage, FiVideo, FiMenu, FiTrash2, FiEdit, FiMessageCircle } from 'react-icons/fi'
import './feedPost.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { parseISO, format} from 'date-fns';
import { FeedComments } from '../FeedComments/FeedComments';
import { ListReactions } from '../ListReactions/ListReactions';
import { NewComment } from '../NewComment/NewComment';
import { Link } from 'react-router-dom';
import { EditPost } from '../EditPost/EditPost';
import { UsersPosts } from '../UsersPosts/UsersPosts';
import { Player, BigPlayButton } from 'video-react';

function FeedPost() {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const [post, setPost] = useState("");
    const [data, setData] = useState([]);
    const [comment, setComment] = useState(false);
    const [edit, setEdit] = useState(false);
    const {deletePost} = useContext(AuthContext);


    
    useEffect(() => {
        async function findPosts() {
            if(post === "") {
              const res = await api.get(`/posts/all`);
              const dataPosts = (res.data)
              setData(dataPosts)
            } else {
            const res = await api.get(`/posts/filter/${post}`);
            const dataPosts = (res.data)
            setData(dataPosts)
        }
    }

        findPosts()

    }, [post, data])

    

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

    function handleHabiliteComment () {
        if(comment === false) {
            setComment(true)
            setEdit(false) 
        } else {
            setComment(false) 
        }
    }

    function handleHabiliteEdit () {
        if(edit === false) {
            setEdit(true)
            setComment(false) 
        } else {
            setEdit(false) 
        }
    }

    function handleDeletePost(id) {
    const deletar = window.confirm("Deseja deletar a postagem?");

    if(deletar === true) {
       deletePost(id);
        } 
    }

    return (

        <div className="feedPost">
            <div className="posts-feed">
            <div className="buttons">
            <button className={post === "" ? 'selected' : ""} onClick={postAll}> <FiMenu /> Todos </button>
            <button className={post === "post-text" ? 'selected' : ""} onClick={postText}> <FiMenu /> Texto </button>
            <button className={post === "post-photo" ? 'selected' : ""} onClick={postPhoto}> <FiImage /> Foto </button>
            <button className={post === "post-video" ? 'selected' : ""} onClick={postVideo}> <FiVideo /> Vídeo </button>
            </div>
                                {data.map((postsData => {

                                const date = parseISO(postsData.created_at);
                                const dateFormated = format(
                                    date, 
                                "dd'/'MM'/'yyyy' às 'HH:mm'h'"
                                );
                                    return (   
                                        <>   
                             {postsData.type === "post-text" ||
                             postsData.type === "post-text-group" ||
                             postsData.type === "post-photo" ||
                             postsData.type === "post-video" ||                  
                             postsData.type === "post-photo-group" ||                   
                             postsData.type === "post-video-group" ?                   
                                <div className="feed-post" key={postsData.id} >
                           <UsersPosts idAccount={postsData.idAccount} username={postsData.username} date={dateFormated} />
                                        <Link to={``} ><h5>{postsData.nameGroup !== "" ? postsData.nameGroup : postsData.nameForum  !== "" ? postsData.nameForum : ""  } </h5></Link>

                                    <div className="post-data" >
                                        <p>{postsData.text}</p>
                                    </div>
                                    
                                    
                                    <div className={edit === true ? "edit" : "editHidden"}>
                                    {postsData.idAccount === userData.id ? 
                                         <EditPost data={postsData.text} id={postsData.id} />
                                         : ""
                                        }
                                    </div>

                                    {postsData.type === "post-photo"  ?
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
                                    postsData.type === "post-video"  ?
                                    <div className="post-data-media"  >
                                         <div className='image-video'>
                                        
                                            <div className="markTop">
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
      

                                                </div>


                                                <div className="markBottom">
                                                <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                                            <h4 className='black'>{userData.id}</h4>
                                            <h4 className='white'>{userData.id}</h4>
                    
                                                </div>
                                                {/* <div className="videoReact">
                                                <Player
                                                fluid={true}
                                                    playsInline 
                                                    src={postsData.link}
                                                    />
                                                </div> */}
                                         <video controls controlsList="nofullscreen nodownload" playsInline type='video/mp4' >
                                            <source src={postsData.link} type="video/mp4"/>
                                            <source src={postsData.link}  type="video/ogg"/>
                                            <source src={postsData.link}  type="video/webm"/>
                                            </video>
                                        </div>
                                        </div> :
                                         postsData.type === "post-photo-group"  ?
                                         <div className="post-data-media"  >
                                       
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
                                              postsData.type === "post-video-group"  ?
                                              <div className="post-data-media" >
                                                   <div className='image-video'>
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
                                                   <video controls controlsList="nofullscreen nodownload" >
                                                      <source src={postsData.link} type="video/mp4"/>
                                                      </video>
                                                      </div>
                                                  </div> :
                                    ""
                                      }

                                    <div className="reactions" >
                                     <ListReactions idPost={postsData.id} />
                                        <button onClick={handleHabiliteComment}>
                                            <FiMessageCircle />
                                        </button>
                                        {postsData.idAccount === userData.id ?
                                        <>
                                            <button onClick={handleHabiliteEdit}> <FiEdit /> </button>
                                            <button onClick={() => {handleDeletePost(postsData.id)}}> <FiTrash2 /> </button>
                                            </>
                                        : ""}
                                    </div>

                                    <div className={comment === true ? "comment" : "commentHidden"}>
                                         <NewComment postData={postsData.id}/>
                                    </div>
                                   

                                <FeedComments idPost={postsData.id} />
                                </div>
                                : "" }
                                </>
                                )
                            }))}
                           </div>
        </div>   
      
                        
    )
}

export {FeedPost}