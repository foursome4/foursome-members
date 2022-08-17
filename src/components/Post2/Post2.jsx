import { FiImage, FiVideo, FiMenu, FiSend, FiUpload, FiRefreshCcw} from 'react-icons/fi'
import './post2.css';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { v4 as uuidv4} from 'uuid'
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import {toast} from 'react-toastify';
import api from '../../services/api'

function Post2() {
    const {newPost, logout} = useContext(AuthContext)
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);

    const id = user.id

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
    
    const [loading, setLoading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState(''); 
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoAvatar, setVideoAvatar] = useState(''); 
    const [post2, setPost] = useState("text");
    const [text, setText] = useState("");
    const [dataPhoto, setDataPhoto] = useState(false);
    const [dataVideo, setDataVideo] = useState(false);
    const [videos, setVideos] = useState([])
    const [photos, setPhotos] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        async function searchAccount() {
          const res =  await api.get(`accounts/filter/${id}`);
            console.log(res.data)
            if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                logout(id)
            } else {
                console.log("Conta encontrada")
            } 
        }
        async function searchInformations() {
          const res =  await api.get(`informations${id}`);
            console.log(res.data)
            if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                logout(id)
            } else {
                console.log("Informações encontradas")
            } 
        }
        async function searchCharacteristcs() {
          const res =  await api.get(`characteristics${id}`);
            console.log(res.data)
            if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                logout(id)
            } else {
                console.log("Caracteristicas encontradas")
            } 
        }
        async function searchPreferences() {
          const res =  await api.get(`preferences${id}`);
            console.log(res.data)
            if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                logout(id)
            } else {
                console.log("Preferencias encontradas")
            } 
        }

        searchAccount()
        searchInformations()
        searchCharacteristcs()
        searchPreferences()
       }, [])


       function handleSelectContent(e) {
        setContent(e.target.value);
      }


    useEffect(() => {
        async function findPostsPhoto() {
          const idAccount = user.id;
          const res = await api.get(`/post2s/filter/${idAccount}/post2-photo`);
          setPhotos(res.data)
          console.log(res.data)
      
      }
        async function findPostsVideo() {
          const idAccount = user.id;
          const res = await api.get(`/post2s/filter/${idAccount}/post2-video`);
          setVideos(res.data)
          console.log(res.data)
      
      }
      findPostsPhoto()
      findPostsVideo()

  }, [user.id]);

  const allPosts = photos.concat(videos);

  const dailyPost = allPosts.filter((post2s) => (
    new Date(post2s.created_at).getDate() + "/" + new Date(post2s.created_at).getMonth() + "/" + new Date(post2s.created_at).getFullYear() === new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()));
 
//     const dailyPhoto = photos.filter((photo) => (
//     new Date(photo.created_at).getDate() + "/" + new Date(photo.created_at).getMonth() + "/" + new Date(photo.created_at).getFullYear() === new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()));

//   const dailyVideo = videos.filter((video) => (
//     new Date(video.created_at).getDate() + "/" + new Date(video.created_at).getMonth() + "/" + new Date(video.created_at).getFullYear() === new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()));

//     console.log(dailyPhoto)
//     console.log(dailyPhoto.length)
//     console.log(dailyVideo)
//     console.log(dailyVideo.length)
   
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
               toast.success('Imagem carregada com sucesso. Publique sua post2agem!');
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
                video.type === 'video/quicktime' || 
                video.type === 'video/mp4' || 
                video.type === 'video/MOV' || 
                video.type === 'video/wmv' || 
                video.type === 'video/flv' || 
                video.type === 'video/avi' || 
                video.type === 'video/avchd' || 
                video.type === 'video/webm' || 
                video.type === 'video/mkv' || 
                video.type === 'video/mpeg' || 
                video.type === 'video/mpeg4' || 
                video.type === 'video/mpeg-4' || 
                video.type === 'video/ogg' || 
                video.type === 'video/HEIF' || 
                video.type === 'video/HEVC'
                ) {
                    setVideoAvatar(video);
                    setVideoUrl(URL.createObjectURL(e.target.files[0]));
                    console.log(videoUrl);
                    toast.success('Vídeo carregado com sucesso. Publique sua post2agem!');
                    
            } else {
                console.log('Tipo dearquivo não aceito. Envie video do tipo: .mp4 ou MOV');
                toast.error('Tipo dearquivo não aceito. Envie video do tipo: .mp4 ou MOV');
                setVideoAvatar("");
                return null;
            }
        }
    }
    
    
    async function handleMessage(e) {
        e.preventDefault();
        toast.error("Não é possível enviar um post2 vazio")
    }

    async function handlePost() {
        const res =  await api.get(`accounts/filter/${user.id}`);
          console.log(res.data)
          if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
              logout(user.id)
          } else {
            console.log("Pode post2ar")
            handlePostNew()
          } 
      }


    async function handlePostNew() {
        setLoading(true)

       
        if(post2 === "photo") {
            toast.info("Salvando a foto. Aguarde...")
            const uuid = uuidv4();
            let newAvatarUrlFirebase = ref(storage, `images/post2s/${uuid}`);
            
            let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
            let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
            
            console.log(uploadAvatar.ref.name, photoUrlAvatar);
            
            newPost({
                idAccount: user.id,
                link: photoUrlAvatar !== null ? photoUrlAvatar : "",
                username: user.username,
                typeAccount: user.sex,
                nameGroup: "",
                nameForum: "",
                nameEvent: "",
                idEvent: "",
                idGroup: "",
                idForum: "",
                type: "post2-photo",
                text,
                iidPatrono: null,
                ufAccount:user.país === "Portugal" ? user.país : user.uf,
                content
            })
            setDataPhoto(true)
            setPost("text")
            reset()
        } else if(post2 === "video" ){
            toast.info("Salvando o vídeo. Aguarde...")
                const uuid = uuidv4();
                let newVideoUrlFirebase = ref(storage, `videos/post2s/${uuid}`);
                
                let uploadVideo = await uploadBytes(newVideoUrlFirebase, videoAvatar);
                let videoUrl = await getDownloadURL(uploadVideo.ref);
                
                console.log(uploadVideo.ref.name, videoUrl);
                
                newPost({
                    idAccount: user.id,
                    link: videoUrl !== null ? videoUrl : "",
                    username: user.username,
                    typeAccount: user.sex,
                    nameGroup: "",
                    nameForum: "",
                    nameEvent: "",
                    idEvent: "",
                    idGroup: "",
                    idForum: "",
                    type: "post2-video",
                    text,
                    iidPatrono: null,
                    ufAccount:user.país === "Portugal" ? user.país : user.uf,
                    cityAccount: user.city,
                    content
                })
                setDataVideo(true)
                setPost("text")
                reset()
                

            } else if(post2 === "text") {
                if(text === "" ) {
                    return
                }
                    newPost({
                        idAccount: user.id,
                        link: "",
                        username: user.username,
                        typeAccount: user.sex,
                        nameGroup: "",
                        nameForum: "",
                        nameEvent: "",
                        idEvent: "",
                        idGroup: "",
                        idForum: "",
                        type: "post2-text",
                        text,
                        iidPatrono: null,
                        ufAccount:user.país === "Portugal" ? user.país : user.uf,
                        cityAccount: user.city,
                        content
                    })
                    setPost("text")
                    reset()
                
                }
        else {
            console.log("Escolha um tipo de post2agem")
        }   
    
        setLoading(false)
    }
    function reset() {
        setAvatarUrl(null)
        setVideoUrl(null)
        setText("");
        setPost("")
    }
        

    function post2Text() {
        if(post2 !== "text") {
            setPost("text")
            setText("")     
        }
    }

    function post2Photo(){
        if(post2 !== "photo") {
            setPost("photo")
            setText("")  
        }

    }
    
    function post2Video(){
        if(post2 !== "video") {
            setPost("video")
            setText("")
        }

    }


    return (
        <div className="post2">
             <div className="post2-data">
            <div className="post2-type">
                <div className="inputs">
                {post2 === "text" ?
                <textarea name="" id="" cols={30} rows={10} placeholder="O que deseja compatilhar?"
                onChange={(e) => setText(e.target.value)}></textarea> :
                post2 === "photo" ?
                <div className='post2-file'>
               <textarea name="" id="" cols={30} rows={10} placeholder="O que deseja compatilhar?"
                onChange={(e) => setText(e.target.value)}></textarea>
              
              
                 <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile}/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={80} width={80}/>
                        </label>

                </div>:
               post2 === "video" ?
               <div className='post2-file'>
               <textarea name="" id="" cols={30} rows={10} placeholder="O que deseja compatilhar?"
                onChange={(e) => setText(e.target.value)}></textarea>
               
                 <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="video/*" onChange={handleFileVideo}/><br />
                            <img src={videoUrl === null ? profile : videoUrl} alt="Video" height={80} width={80}/>
                        </label>
                </div> :" "
            }
  
                </div>
                <div className="buttons">
                    <button className={post2 === "text" ? 'selected' : ""} onClick={post2Text}> <FiMenu /> Texto </button>
                  {dailyPost.length === 1 || dataPhoto === true ? "" : <button className={post2 === "photo" ? 'selected' : ""} onClick={post2Photo}> <FiImage /> Foto </button> } 
                  {dailyPost.length === 1 || dataVideo === true ? "" :  <button className={post2 === "video" ? 'selected' : ""} onClick={post2Video}> <FiVideo /> Vídeo </button> } 
                </div>


                <div className="select">
                    <select value={content} onChange={handleSelectContent}>
                    <option value="">Tipo de conteúdo</option>
                    <option value="livre">Conteúdo livre</option>
                    <option value="sensible">Conteúdo sensível</option>
                    </select>
                    <div className="text">
                        <h6>{content === "livre" ? "Seu conteúdo será mostrado a todos"  : content === "sensible" ? "Seu conteúdo receberá uma proteção: Conteúdo sensível, violência ou +18" : "Escolha um tipo de conteúdo. Conteúdo diferente do selecionado será excluído"}</h6>
                    </div>
                </div>

                { post2 === "text" ?                  
                        <button className="public" onClick={ text !== ""? handlePost : handleMessage}>
                            {loading === true ? <FiRefreshCcw /> : <FiSend />}
                        </button>
                        : 
                        post2 === "photo" ?                  
                        <button className="public" onClick={avatarUrl !== null ? handlePost : handleMessage}>
                            {loading === true ? <FiRefreshCcw /> : <FiSend />}
                        </button>
                        : post2 === "video" ?                  
                        <button className="public" onClick={videoUrl !== null ? handlePost : handleMessage}>
                            {loading === true ? <FiRefreshCcw /> : <FiSend />}
                        </button>
                        : ""
                    }
            </div>      
            </div>
            <div className="counter">
            <h5>{dailyPost.length === 0 ? "Você pode postar 1 foto ou video"
                : dailyPost.length === 1 ? "Você ja efetuou suas postagens diárias"
                : ""  }</h5>
                </div>

                
        </div>
         
         
                        
    )
}

export {Post2}