import { FiImage, FiVideo, FiMenu, FiRefreshCw } from 'react-icons/fi'
import './feedPost.css';
import { useEffect, useState, memo, useCallback, useMemo} from 'react';
import api from "../../services/api";
import { toast } from 'react-toastify';
import { ItemFeed } from '../ItemFeed/ItemFeed';
import { useFetch } from '../../hooks/useFetch';

function FeedPostComponent({}) {
    const [post, setPost] = useState("");
    // const [datas, setDatas] = useState([]);
 
   
    // const  findPosts = useCallback(async () => {
    //     const res = await api.get(`/posts/all`);
    //     const dataPosts = (res.data)
    //     setDatas(dataPosts)
    // }, [])

    
    // useEffect(() => {
    //     findPosts()
    // }, [findPosts])

  
    // const filterPosts = useMemo(() => {
    //     return data.filter(postData => post !== "" ? postData.type === post : postData)
    // }, [data, post]);


    function postUpdate() {
        setPost("")
        toast.info("Atualizando posts...")
        // findPosts()
    }
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


    const {data} = useFetch(post === "" ? `https://api-foursome.herokuapp.com/posts/all` : `https://api-foursome.herokuapp.com/posts/filter/${post}`);
    console.log(data)

   
    return (

        <div className="feedPost">
            <div className="posts-feed">
            <div className="buttons">
            <button className={""} onClick={postUpdate}> <FiRefreshCw /> Atualizar </button>
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