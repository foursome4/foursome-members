import { FiImage, FiVideo, FiUsers, FiList, FiMenu, FiTrash2, FiEdit, FiMessageCircle, FiThumbsUp, FiMinus, FiSend, FiChevronDown } from 'react-icons/fi'
import './feedPostIndividual2.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { parseISO, format} from 'date-fns';
import { FeedComments } from '../FeedComments/FeedComments';
import { ListReactions } from '../ListReactions/ListReactions';

    function FeedPostIndividual2(idAccount) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);


    const [myPosts, setMyPosts] = useState("");
    const [data, setData] = useState([]);
    const [comment, setComment] = useState(false);
    const [textComment, setTextComment] = useState("");

    const {user, newComment, likePost} = useContext(AuthContext);
    useEffect(() => {
          async function findPosts() {
            if(myPosts === "") {
            const res = await api.get(`/posts/filter/accounts/${idAccount.idAccount}`);
            const dataPosts = (res.data)
            setData(dataPosts)
        } else {
            const type = myPosts;
            const res = await api.get(`/posts/filter/${idAccount.idAccount}/${type}`);
            const dataPosts = (res.data)
            setData(dataPosts)
        }
        }
        findPosts()

    }, [myPosts])

    function postAll() {
        setMyPosts("")
    }

    function postText() {
        setMyPosts("post-text")
    }

    function postPhoto(){
        setMyPosts("post-photo")
    }

    function postVideo(){
        setMyPosts("post-video")
    }

    function postGroup(){
        setMyPosts("post-group")
    }

    function postForum(){
        setMyPosts("post-forum")
    }

    function handleHabiliteComment () {
        if(comment === false) {
            setComment(true)
        } else {
            setComment(false) 
        }
    }


    function handleComment(idPost) {
    newComment({text: textComment, idPost, idAccount: idAccount.idAccount, avatar:idAccount.avatar, nickname: idAccount.nickname, username: userData.username})
    setTextComment("");
    setComment(false) 
    }

    function handleLikePost( idPost) {
        likePost({idAccount: idAccount.idAccount, username: idAccount.username, idPost})
    }


    return (
        <div className="feedPostIndividual">
            <div className="posts-feed">
            <div className="buttons">
            <button className={myPosts === "" ? 'selected' : ""} onClick={postAll}> <FiMenu /> Todos </button>
            <button className={myPosts === "post-text" ? 'selected' : ""} onClick={postText}> <FiMenu /> Texto </button>
            <button className={myPosts === "post-photo" ? 'selected' : ""} onClick={postPhoto}> <FiImage /> Foto </button>
            <button className={myPosts === "post-video" ? 'selected' : ""} onClick={postVideo}> <FiVideo /> Vídeo </button>
            <button className={myPosts === "post-group" ? 'selected' : ""} onClick={postGroup}> <FiUsers /> Grupo </button>
            <button className={myPosts === "post-forum" ? 'selected' : ""} onClick={postForum}> <FiList /> Fórum </button>
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
                                    <div className="post-user" key={postsData.id} >
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
                                            <img src={postsData.link} alt={"Post Image"} width={500}/>
                                        </div> :
                                    postsData.type === "post-video" ?
                                        <div className="post-data-media" >
                                        <video controls >
                                            <source src={postsData.link} type="video/mp4"/>
                                            </video>
                                        </div> :
                                    ""
                                      }

                                    <div className="reactions" >
                                        <button className="selected"  onClick={() => {handleLikePost(postsData.id)}}>
                                            <FiThumbsUp />
                                            Curtir
                                        </button>
                                        <ListReactions idPost={postsData.id} idAccount={idAccount.idAccount}/>
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

export {FeedPostIndividual2}