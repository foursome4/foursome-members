import { FiImage, FiVideo, FiUsers, FiList, FiMenu, FiTrash2, FiEdit, FiMessageCircle } from 'react-icons/fi'
import './feedPostIndividual2.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { FeedComments } from '../FeedComments/FeedComments';
import { ListReactions } from '../ListReactions/ListReactions';
import { NewComment } from '../NewComment/NewComment';
import { UsersPosts } from '../UsersPosts/UsersPosts';
import { EditPost } from '../EditPost/EditPost';

    function FeedPostIndividual2(idAccount) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const [myPosts, setMyPosts] = useState("");
    const [data, setData] = useState([]);
    const [comment, setComment] = useState(false);
    const [edit, setEdit] = useState(false);

    const { deletePost} = useContext(AuthContext);
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
        findPosts();


    }, [idAccount.idAccount, myPosts])

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
        <div className="feedPostIndividual2">
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
                                     return (                    
                                <div className="feed-post" key={postsData.id}>
                                <UsersPosts idAccount={postsData.idAccount} username={postsData.username} date={postsData.created_at} />

                                    <div className="post-data" >
                                        <p>{postsData.text}</p>
                                    </div>

                                    <div className={edit === true ? "edit" : "editHidden"}>
                                    {postsData.idAccount === userData.id ? 
                                         <EditPost data={postsData.text} id={postsData.id} />
                                         : ""
                                        }
                                    </div>

                                    {postsData.type === "post-photo" ?
                                  
                                        <div className="post-data-media" >
                                              <div className='image'>
                                            <img src={postsData.link} alt={postsData.link} width={500}/>
                                            </div> 
                                        </div> :
                                    postsData.type === "post-video" ?
                                        <div className="post-data-media" >
                                                   <div className='image-video'>
                                        <video controls controlsList="nofullscreen nodownload">
                                            <source src={postsData.link} type="video/mp4"/>
                                            </video>
                                            </div>
                                        </div> :
                                    ""
                                      }

                                    <div className="reactions2-individual" >

                                        <ListReactions idPost={postsData.id} idAccount={postsData.idAccount}/>
                                        <button onClick={handleHabiliteComment}>
                                            <FiMessageCircle />
                                            
                                        </button>
                                        {postsData.idAccount === userData.id ?
                                        <>
                                              <button onClick={handleHabiliteEdit}> <FiEdit /> </button>
                                            <button onClick={() => {handleDeletePost(postsData.id)}}> <FiTrash2 />  </button>
                                            </>
                                        : ""}
                                    </div>

                                    <div className={comment === true ? "comment" : "commentHidden"}>
                                    <NewComment postData={postsData.id}/>
                                    </div>

                            <FeedComments idPost={postsData.id} />
                                </div>
                                )
                            }))}
                           </div>
        </div>
    )
}

export {FeedPostIndividual2}