import { EditPost } from '../EditPost/EditPost'
import { FeedComments } from '../FeedComments/FeedComments'
import { ListReactions } from '../ListReactions/ListReactions'
import { NewComment } from '../NewComment/NewComment'
import { UsersPosts } from '../UsersPosts/UsersPosts'
import { Link } from 'react-router-dom';
import { FiTrash2, FiEdit, FiMessageCircle } from 'react-icons/fi'
import { useState, useContext, memo } from 'react'
import './itemFeed.css'
import { AuthContext } from '../../contexts/Auth'


function ItemFeedComponent({idAccount, link, date, text, type, id, username, group, forum, key}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const [comment, setComment] = useState(false);
    const [edit, setEdit] = useState(false);
    const {deletePost} = useContext(AuthContext);

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
    //     let deletePostActual = dataComments.filter(post => post.id !== id);
    //     setDataComments(deletePostActual)
    //   console.log(deletePostActual)
        } 
    }
    
   return (
         <div className="feed-post" key={id} >
    <UsersPosts idAccount={idAccount} username={username} date={date} keyId={id}/>
    <Link to={``} ><h5>{group !== "" ? group : forum  !== "" ? forum : ""  } </h5></Link>

             <div className="post-data" >
                 <p>{text}</p>
             </div>
             
             
             <div className={edit === true ? "edit" : "editHidden"}>
             {idAccount === userData.id ? 
                  <EditPost data={text} id={id} />
                  : ""
                 }
             </div>

             {type === "post-photo"  ?
                 <div className="post-data-media" >
                  <div className='image'>
                     <img src={link} alt={link} width={500}/>
                  </div>
                 </div> :
             type === "post-video"  ?
             <div className="post-data-media"  >
                  <div className='image-video'>
                  <video playsInline controls controlsList="nofullscreen nodownload"  type='video/mp4' >
                     <source playsInline src={link} type="video/mp4"/>
                     <source playsInline src={link}  type="video/ogg"/>
                     <source playsInline src={link}  type="video/webm"/>
                     </video>
                 </div>
                 </div> :
             ""
               }

             <div className="reactions" >
              <ListReactions idPost={id} />
                 <button onClick={handleHabiliteComment}>
                     <FiMessageCircle />
                 </button>
                 {idAccount === userData.id ?
                 <>
                     <button onClick={handleHabiliteEdit}> <FiEdit /> </button>
                     <button onClick={() => {handleDeletePost(id)}}> <FiTrash2 /> </button>
                     </>
                 : ""}
             </div>

             <div className={comment === true ? "comment" : "commentHidden"}>
                  <NewComment postData={id}/>
             </div>
            

         <FeedComments idPost={id}/>
         </div>
         )
}

export const ItemFeed = memo(ItemFeedComponent)