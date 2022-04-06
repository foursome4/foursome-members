import { FiImage, FiVideo, FiUsers, FiList, FiMenu} from 'react-icons/fi'
import './feedPostIndividual2.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { useFetch } from '../../hooks/useFetch';
import { ItemFeed } from '../ItemFeed/ItemFeed';

    function FeedPostIndividual2(idAccount) {
    const [myPosts, setMyPosts] = useState("");
    const [comment, setComment] = useState(false);
    const [edit, setEdit] = useState(false);

    const { deletePost} = useContext(AuthContext);

      const type = myPosts;
    const {data} = useFetch(type === "" ? `/posts/filter/accounts/${idAccount.idAccount}` : `/posts/filter/${idAccount.idAccount}/${type}`);
    console.log(data)

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
                            
                                {data?.map((postsData => {
                                     return (                    
                                        <div className="preItem" key={postsData.id}>
                                        <ItemFeed idAccount={postsData.idAccount} link={postsData.link}
                                               date={postsData.created_at} text={postsData.text}
                                               type={postsData.type} id={postsData.id}
                                               username={postsData.username} group={postsData.nameGroup}
                                               forum={postsData.nameForum}/>
                                    </div>
                                )
                            }))}
                           </div>
        </div>
    )
}

export {FeedPostIndividual2}