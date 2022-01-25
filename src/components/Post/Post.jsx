import { FiImage, FiVideo, FiUsers, FiList, FiMenu, FiSend, FiUpload} from 'react-icons/fi'
import './post.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import profile from '../../assets/images/profile.jpg';
import { v4 as uuidv4} from 'uuid'
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

function Post() {
    const {newPost} = useContext(AuthContext)
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);
 
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState(''); 
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoAvatar, setVideoAvatar] = useState(''); 
    const [post, setPost] = useState("text");
    const [text, setText] = useState("");
    const [type, setType] = useState("");
      
    
    
    async function handleFile(e) {
        console.log(e.target.files[0])
        
        if(e.target.files[0]){
            const image = e.target.files[0];
            
            if(image.type === 'image/jpeg' ||
            image.type === 'image/jpg' ||
            image.type === 'image/png'
            ) {
                setImageAvatar(image);
               setAvatarUrl(URL.createObjectURL(e.target.files[0]));
               console.log(avatarUrl);
            } else {
                console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
                setImageAvatar("");
                return null;
            }
        }
    }

    function handleFileVideo(e) {
        console.log(e.target.files[0])
        
        if(e.target.files[0]){
            const video = e.target.files[0];
            
            if(
                video.type === 'video/mp4' 
                ) {
                    setVideoAvatar(video);
                    setVideoUrl(URL.createObjectURL(e.target.files[0]));
                    console.log(videoUrl);
                    
                    
            } else {
                console.log('Tipo dearquivo não aceito. Envie video do tipo: .mp4');
                setVideoAvatar("");
                return null;
            }
        }
    }
    
    
    async function handlePost(e) {
        e.preventDefault();
        
        if(post === "photo") {
            const uuid = uuidv4();
            let newAvatarUrlFirebase = ref(storage, `images/posts/${uuid}`);
            
            let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
            let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
            
            console.log(uploadAvatar.ref.name, photoUrlAvatar);
            
            newPost({
                idAccount: user.id,
                link: photoUrlAvatar !== null ? photoUrlAvatar : "",
                avatar: userInformation.avatar,
                nickname: userInformation.nickname,
                username: user.username,
                nameGroup: "",
                nameForum: "",
                idGroup: "",
                idForum: "",
                type: "post-photo",
                text,
            })
            window.location.reload(false)
        } else if(post === "video"){
                const uuid = uuidv4();
                let newVideoUrlFirebase = ref(storage, `videos/posts/${uuid}`);
                
                let uploadVideo = await uploadBytes(newVideoUrlFirebase, videoAvatar);
                let videoUrl = await getDownloadURL(uploadVideo.ref);
                
                console.log(uploadVideo.ref.name, videoUrl);
                
                newPost({
                    idAccount: user.id,
                    link: videoUrl !== null ? videoUrl : "",
                    avatar: userInformation.avatar,
                    nickname: userInformation.nickname,
                    username: user.username,
                    nameGroup: "",
                    nameForum: "",
                    idGroup: "",
                    idForum: "",
                    type: "post-video",
                    text,
                })
                window.location.reload(false)
            } else if(post === "text") {
            newPost({
                idAccount: user.id,
                link: "",
                avatar: userInformation.avatar,
                nickname: userInformation.nickname,
                username: user.username,
                nameGroup: "",
                nameForum: "",
                idGroup: "",
                idForum: "",
                type: "post-text",
                text,
            })
            window.location.reload(false)

            console.log({
                idAccount: user.id,
                link: "",
                avatar: userInformation.avatar,
                nickname: userInformation.nickname,
                username: user.username,
                nameGroup: "",
                nameForum: "",
                idGroup: "",
                idForum: "",
                type,
                text,
            })
            window.location.reload(false)
            
        } else if(post === "group"){
            newPost({
                idAccount: user.id,
                link: "",
                avatar: userInformation.avatar,
                nickname: userInformation.nickname,
                username: user.username,
                nameGroup: "",
                nameForum: "",
                idGroup: "",
                idForum: "",
                type: "post-group",
                text,
            })
            window.location.reload(false)
            
        } else if(post === "forum") {
            newPost({
                idAccount: user.id,
                link: "",
                avatar: userInformation.avatar,
                nickname: userInformation.nickname,
                username: user.username,
                nameGroup: "",
                nameForum: "",
                idGroup: "",
                idForum: "",
                type: "post-forum",
                text,
            })
            
            window.location.reload(false)
            
        }
        else {
            console.log("Escolha um tipo de postagem")
        }    }
        
        
        
        
        
        function postText() {
            setPost("text")
        setType("post-text")
    }

    function postPhoto(){
        setPost("photo")
        setType("post-photo")
    }
    
    function postVideo(){
        setPost("video")
        setType("post-video")
    }
    
    function postGroup(){
        setPost("group")
        setType("post-group")
    }
    
    function postForum(){
        setPost("forum")
        setType("post-forum")
    }

    return (
        <div className="post">
             <div className="post-data">
            <div className="avatar">
            <img src={userInformation.avatar} alt="" />
            </div>
            <div className="post-type">
                <div className="inputs">
                {post === "text" ?
                <textarea name="" id="" cols={30} rows={10}
                onChange={(e) => setText(e.target.value)}></textarea> :
                post === "photo" ?
                <div className='post-file'>
               <textarea name="" id="" cols={30} rows={10}
                onChange={(e) => setText(e.target.value)}></textarea>
              
              
                 <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile}/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={80} width={80}/>
                        </label>


                </div>:
               post === "video" ?
               <div className='post-file'>
               <textarea name="" id="" cols={30} rows={10}
                onChange={(e) => setText(e.target.value)}></textarea>
               
               
                 <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="video/*" onChange={handleFileVideo}/><br />
                            <img src={videoUrl === null ? profile : videoUrl} alt="Video" height={80} width={80}/>
                        </label>


                </div> :
               post === "group" ?
               <div className='post-file'>
               <textarea name="" id="" cols={30} rows={10}
                onChange={(e) => setText(e.target.value)}></textarea>
               
               
                 <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile}/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={80} width={80}/>
                        </label>


                </div> :
               post === "forum" ?
               <textarea name="" id="" cols={30} rows={10}
               onChange={(e) => setText(e.target.value)}></textarea> :
               <textarea name="" id="" cols={30} rows={10}
               onChange={(e) => setText(e.target.value)}></textarea>
            }
                    <button className="public" onClick={handlePost}> <FiSend /> </button>
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