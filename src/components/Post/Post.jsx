import avatarImg from '../../assets/images/avatar.png'
import { FiImage, FiVideo, FiUsers, FiList, FiMenu, FiTrash2, FiEdit, FiMessageCircle, FiThumbsUp, FiMinus, FiSend } from 'react-icons/fi'
import './post.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import avatar from '../../assets/images/avatar.png'

function Post() {
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
        <div className="post">
             <div className="post-data">
            <div className="avatar">
            <img src={avatarImg} alt="" />
            </div>
            <div className="post-type">
                <div className="inputs">
                <textarea name="" id="" cols={30} rows={10}></textarea>
                    <button className="public"> <FiSend /> </button>
                </div>
                <div className="buttons">
                    <button className={post === "text" ? 'selected' : ""} onClick={postText}> <FiMenu /> Texto </button>
                    <button className={post === "photo" ? 'selected' : ""} onClick={postPhoto}> <FiImage /> Foto </button>
                    <button className={post === "video" ? 'selected' : ""} onClick={postVideo}> <FiVideo /> Vídeo </button>
                    <button className={post === "group" ? 'selected' : ""} onClick={postGroup}> <FiUsers /> Grupo </button>
                    <button className={post === "forum" ? 'selected' : ""} onClick={postForum}> <FiList /> Fórum </button>
                </div>
            </div>      
            </div>
        </div>
         
         
                        
    )
}

export {Post}