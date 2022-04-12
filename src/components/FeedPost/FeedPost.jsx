import { FiImage, FiVideo, FiMenu } from 'react-icons/fi'
import './feedPost.css';
import { useState, memo, } from 'react';
import { ItemFeed } from '../ItemFeed/ItemFeed';
import { useFetch } from '../../hooks/useFetch';

function FeedPostComponent() {
    const [post, setPost] = useState("");

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


    // const {data} = useFetch(`https://api-foursome.herokuapp.com/posts/all`);
    const {data} = useFetch(post === "" ? `https://api-foursome.herokuapp.com/posts/all` : `https://api-foursome.herokuapp.com/posts/filter/${post}`);

    if(!data) {
        return (
            <div className="load">
                <h3>Carregando...</h3>
            </div>
        )
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
                                {data?.map((postsData => {
                                    return (   
                                        <div className="preItem" key={postsData.id}>
                             {postsData.type === "post-text" ||
                             postsData.type === "post-text-group" ||
                             postsData.type === "post-photo" ||
                             postsData.type === "post-video" ||                  
                             postsData.type === "post-photo-group" ||                   
                             postsData.type === "post-video-group" ?   
                                 <ItemFeed idAccount={postsData.idAccount} link={postsData.link}
                                           date={postsData.created_at} text={postsData.text}
                                           type={postsData.type} id={postsData.id}
                                           username={postsData.username} group={postsData.nameGroup}
                                           forum={postsData.nameForum}/>
                                           : "" }
   
                                           </div>               
                                )
                            }))}
                           </div>
        </div>   
      
                                    
    )
}

export const FeedPost = memo(FeedPostComponent)