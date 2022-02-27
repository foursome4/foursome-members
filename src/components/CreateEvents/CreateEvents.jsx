import "./createEvents.css"
import { FiSearch, FiUpload } from "react-icons/fi";
import { useContext, useState } from "react";
import avatar from  "../../assets/images/avatar.png"
import cover from  "../../assets/images/cover.jpg"
import { AuthContext } from "../../contexts/Auth";
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import buscaCep from '../../services/api-buscaCep'


function CreateEvents() {
    const {createEvents}= useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const LocalInformations = localStorage.getItem("informations-foursome");
    const userInformations= JSON.parse(LocalInformations);


    const [avatarUrl, setAvatarUrl] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState("");
    const [imageCover, setImageCover] = useState("");
    const [loadding, setLoadding] = useState(false);
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [theme, setTheme] = useState("");
    const [date, setDate] = useState("");
    const [street, setStreet] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [reference, setReferencee] = useState("");
    const [complement, setComplement] = useState("");
    const [cep, setCep] = useState("");
    const [number, setNumber] = useState("")



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

    async function handleCreateEvent(e) {
        e.preventDefault();
        //Avatar
        setLoadding(true);
        console.log(loadding);
        const uuid = uuidv4();
        let newAvatarUrlFirebase = ref(storage, `images/folderEvents/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let avatar = await getDownloadURL(uploadAvatar.ref);
            
        console.log(uploadAvatar.ref.name, avatar);

        

        // Cover
        const uuid2 = uuidv4();
        let newCoverUrlFirebase = ref(storage, `images/coverEvents/${uuid2}`);
        let upload = await uploadBytes(newCoverUrlFirebase, imageCover);
        let cover = await getDownloadURL(upload.ref);

        console.log(upload.ref.name, cover);

            let idAccount = user.id;
            let username = user.username;
            let avatarUser = userInformations.avatar;
            let nickname = userInformations.nickname;
            let status = "pending"
        

        console.log(loadding);
        setLoadding(false);
 

        createEvents(
        avatar, name, description, date, street, district, city, uf, complement, reference, number, theme, cover, status, idAccount, username, avatarUser, nickname
        )
        
    }


    async function handleSearchCep(e) {
        e.preventDefault();
        try {
            const res = await buscaCep.get(`${cep}/json`);
            console.log(res.data);
            console.log(res.data.uf);
            setUf(res.data.uf)
            setCity(res.data.localidade)
            setDistrict(res.data.bairro);
            setStreet(res.data.logradouro);
        }catch{
            console.log("eRRO")
        }
    }

   

    function handleTheme(e) {
        setTheme(e.target.value)
    }





    return (
        <div className="createEvent">
        <form action="">
            <h5><b>Folder do Evento</b></h5>
    <label className="label-avatar">
                    <span><FiUpload color="#f65" size={25} /></span>
                    <input type="file" accept="image/*" onChange={handleFile}/><br />
                    <img src={avatarUrl === null ? avatar : avatarUrl } alt="Avatar" height={100} width={100}/>
                </label>

            <div className="data">                      
                    <input type="text" placeholder='Nome Evento' value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="text" placeholder='Descrição' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <input type="date" placeholder='Descrição' value={date} onChange={(e) => setDate(e.target.value)}/>
                    <div className="SearchCep">
                <input type="text" placeholder='Digite seu cep' value={cep} onChange={(e) => setCep(e.target.value)}/>
                <button onClick={handleSearchCep}><FiSearch /> Cep </button>
                </div>
                <input type="text" placeholder='Rua' value={street} onChange={(e) => setStreet(e.target.value)}/>
                <input type="text" placeholder='Bairro' value={district} onChange={(e) => setDistrict(e.target.value)}/>
                <input type="number" placeholder='Número' value={number} onChange={(e) => setNumber(e.target.value)}/>
                <input type="text" placeholder='Cidade' value={city} onChange={(e) => setCity(e.target.value)}/>
                <input type="text" placeholder='Estado' value={uf} onChange={(e) => setUf(e.target.value)}/>
                <input type="text" placeholder='Complemento' value={complement} onChange={(e) => setComplement(e.target.value)}/>
                <input type="text" placeholder='Ponto de Referênca' value={reference} onChange={(e) => setReferencee(e.target.value)}/>
                <br />
                  
                    <select value={theme} onChange={handleTheme}>
                        <option value="">Tema do evento</option>
                        <option value="Balada">Balada </option>
                        <option value="Palada sertaneja">Palada sertaneja</option>
                        <option value="Pagode">Pagode</option>
                        <option value="Festa privativa">Festa privativa</option>
                        <option value="Festa no Sítio">Festa no Sítio</option>
                    </select>

            </div>
            <h5><b>Capa da página do Evento</b></h5>
            <label className="label-cover">
                    <span><FiUpload color="#f65" size={25} /></span>
                    <input type="file" accept="image/*" onChange={handleFileCover}/><br />
                    <img src={coverUrl === null ? cover : coverUrl } alt="Avatar"/>
                </label>

                <button onClick={handleCreateEvent}>Criar Evento</button>
    </form>
    </div>
    )
}

export {CreateEvents}