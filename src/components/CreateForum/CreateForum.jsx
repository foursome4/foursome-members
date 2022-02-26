import "./createForum.css"
import { FiUpload } from "react-icons/fi";
import { useContext, useState } from "react";
import avatar from  "../../assets/images/avatar.png"
import cover from  "../../assets/images/cover.jpg"
import { AuthContext } from "../../contexts/Auth";
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'


function CreateForum() {
    const {creategroup}= useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const LocalInformations = localStorage.getItem("informations-foursome");
    const userInformations= JSON.parse(LocalInformations);


    const [avatarUrl, setAvatarUrl] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [theme, setTheme] = useState("");
    const [privacity, setPrivacity] = useState("");
    const [imageAvatar, setImageAvatar] = useState("");
    const [imageCover, setImageCover] = useState("");
    const [loadding, setLoadding] = useState(false);
    



    function handleFile(e) {
        console.log(e.target.files[0])

       if(e.target.files[0]){
           const image = e.target.files[0];

           if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
               setImageAvatar(image);
               setAvatarUrl(URL.createObjectURL(e.target.files[0]));
               console.log(avatarUrl);
            } else {
                console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
                setImageAvatar(null);
                return null;
            }
        }
    }
    
    
    function handleFileCover(e) {
        console.log(e.target.files[0])
        console.log(loadding);

       if(e.target.files[0]){
           const image = e.target.files[0];

           if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
            setImageCover(image);
               setCoverUrl(URL.createObjectURL(e.target.files[0]));
               console.log(coverUrl)
           } else {
               console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
               setImageCover(null);
               return null;
           }
       }
    }

    async function handleCreateGroup(e) {
        e.preventDefault();
        //Avatar
        setLoadding(true);
        console.log(loadding);
        const uuid = uuidv4();

        let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let avatar = await getDownloadURL(uploadAvatar.ref);
            
        console.log(uploadAvatar.ref.name, avatar);

        

        // Cover
        const uuid2 = uuidv4();

        let newCoverUrlFirebase = ref(storage, `images/cover/${uuid2}`);
        let upload = await uploadBytes(newCoverUrlFirebase, imageCover);
        let cover = await getDownloadURL(upload.ref);

        console.log(upload.ref.name, cover);

            let idAccount = user.id;
            let username = user.username;
            let avatarUser = userInformations.avatar;
            let nickname = userInformations.nickname;
        

        console.log(loadding);
        setLoadding(false);
 

    creategroup(
        name, description, theme, privacity, cover, avatar, idAccount, username, avatarUser, nickname
        )
        
    }

   

    function handleTheme(e) {
        setTheme(e.target.value)
    }
    function handlePrivacity(e) {
        setPrivacity(e.target.value)
    }




    return (
        <div className="createGroup">
        <form action="">
    <label className="label-avatar">
                    <span><FiUpload color="#f65" size={25} /></span>
                    <input type="file" accept="image/*" onChange={handleFile}/><br />
                    <img src={avatarUrl === null ? avatar : avatarUrl } alt="Avatar" height={100} width={100}/>
                </label>

            <div className="data">                      
                    <input type="text" placeholder='Nome do Grupo' value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="text" placeholder='Descrição' value={description} onChange={(e) => setDescription(e.target.value)}/>
                  
                    <select value={theme} onChange={handleTheme}>
                        <option value="">Tema do grupo</option>
                        <option value="Entreteinimento">Entreteinimento </option>
                        <option value="Discussão">Discussão</option>
                        <option value="Dicas">Dicas</option>
                        <option value="Informativos">Informativos</option>
                    </select>
                    <select value={privacity} onChange={handlePrivacity}>
                        <option value="">Privacidade</option>
                        <option value="Open">Aberto </option>
                        <option value="Private">Privado</option>
                    </select>

            </div>

            <label className="label-cover">
                    <span><FiUpload color="#f65" size={25} /></span>
                    <input type="file" accept="image/*" onChange={handleFileCover}/><br />
                    <img src={coverUrl === null ? cover : coverUrl } alt="Avatar"/>
                </label>

                <button onClick={handleCreateGroup}>Criar Grupo</button>
    </form>
    </div>
    )
}

export {CreateForum}