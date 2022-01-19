import { FiImage, FiVideo, FiUsers, FiList, FiMenu, FiTrash2, FiEdit, FiMessageCircle, FiThumbsUp, FiMinus } from 'react-icons/fi'
import './feedPost.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import avatar from '../../assets/images/avatar.png'

function FeedPost() {
    const [post, setPost] = useState("text");

    const {user} = useContext(AuthContext);
    useEffect((user) => {
       function loadUser(user) {

            if(user) {
                console.log(user)
                return user
            }
        }

        loadUser(user)

    }, [user])


    function postText() {
        setPost("text")
    }

    function postPhoto(){
        setPost("photo")
    }

    function postVideo(){
        setPost("video")
    }

    function postGroup(){
        setPost("group")
    }

    function postForum(){
        setPost("forum")
    }
    return (
        <div className="feedPost">
            <div className="posts-feed">
                                <div className="buttons">
                                <button className={post === "text" ? 'selected' : ""} onClick={postText}> <FiMenu /> Texto </button>
                                <button className={post === "photo" ? 'selected' : ""} onClick={postPhoto}> <FiImage /> Foto </button>
                                <button className={post === "video" ? 'selected' : ""} onClick={postVideo}> <FiVideo /> Vídeo </button>
                                <button className={post === "group" ? 'selected' : ""} onClick={postGroup}> <FiUsers /> Grupo </button>
                                <button className={post === "forum" ? 'selected' : ""} onClick={postForum}> <FiList /> Fórum </button>
                                </div>
                            
                                
                                <div className="feed-post">
                                    <div className="post-user">
                                        <img src={user !== null ?user.avatar: avatar} alt="" />
                                        <div className="info-data">
                                        <div className="name-data">
                                        <h4 className="selected">Jeferson Macedo</h4>
                                            <h4> <FiMinus /> </h4>
                                            <h4>Festas a dois</h4>
                                        </div>
                                        <div className="time-data">
                                            <h5>3 Horas e 24 Minutos</h5>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="post-data">
                                        <p>
                                            Vamos curtir o fim de semana na presença de nossos melhores amigos.
                                        </p>
                                    </div>

                                    <div className="reactions">
                                        <button className="selected">
                                            <FiThumbsUp />
                                            Curtir
                                        </button>
                                        <button>
                                            <FiMessageCircle />
                                            Comentar
                                        </button>
                                        <button>
                                            <FiEdit />
                                            Editar
                                        </button>
                                        <button>
                                            <FiTrash2 />
                                            Apagar
                                        </button>
                                    </div>
                                </div>
            </div>
        </div>
         
         
                        
    )
}

export {FeedPost}