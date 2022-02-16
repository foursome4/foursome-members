import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import logoImg from '../../assets/images/logo.png';
import profile from '../../assets/images/profile.jpg';
import cover from '../../assets/images/cover.jpg';
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import './informationsForm.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { v4 as uuidv4 } from 'uuid'
import buscaCep from '../../services/api-buscaCep';
import { toast } from 'react-toastify';


function InformationsForm() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const {logout} = useContext(AuthContext)
    const {updateInformationsAccount} = useContext(AuthContext)
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const [imageCover, setImageCover] = useState('');
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [cep, setCep] = useState("");
    const [relationship, setRelationship] = useState("");
    const [nickname, setNickname] = useState("")
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

    async function handleUploadAccount(e) {
        e.preventDefault();
        //Avatar
        setLoadding(true);
        console.log(loadding);
        const uuid = uuidv4();

        let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
            
        console.log(uploadAvatar.ref.name, photoUrlAvatar);

        

        // Cover
        const uuid2 = uuidv4();

        let newCoverUrlFirebase = ref(storage, `images/cover/${uuid2}`);
        let upload = await uploadBytes(newCoverUrlFirebase, imageCover);
        let photoUrl = await getDownloadURL(upload.ref);

        console.log(upload.ref.name, photoUrl);


        
        //Salvando no banco de dados
       updateInformationsAccount({idAccount: user.id, avatar: photoUrlAvatar, cover: photoUrl, city, uf, relationship, nickname});
        console.log({idAccount: user.id, avatar: photoUrlAvatar, cover: photoUrl, city, uf, relationship, nickname});
        console.log(loadding);
        setLoadding(false);
        
    }

    async function handleSearchCep(e) {
        e.preventDefault();
        try {
            const res = await buscaCep.get(`${cep}/json`);
            console.log(res.data);
            console.log(res.data.uf);
            setUf(res.data.uf)
            setCity(res.data.localidade)
        }catch{
            console.log("error")
            toast.error("CEP não encontrado. Por favor, digite sua cidade e seu Estado(UF) - Sigla")
        }
    }

    function handleRelationship(e) {
        setRelationship(e.target.value)
    }


    return (
            <div className="informations">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Informações Complementares</h2>
                    </div>
                        <form action="">
                        <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile}/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={100} width={100}/>
                        </label>


                        <div className="SearchCep">
                        <input type="text" placeholder='Digite seu cep' value={cep} onChange={(e) => setCep(e.target.value)}/>
                        <button onClick={handleSearchCep}>Buscar Cep</button>
                        </div>
                    <div className="data">                      
                            <input type="text" placeholder='UF' value={uf} onChange={(e) => setUf(e.target.value)}/>
                            <input type="text" placeholder='Cidade' value={city} onChange={(e) => setCity(e.target.value)}/>
                            <input type="text" placeholder='Nome de Exibição' value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                            <select value={relationship} onChange={handleRelationship}>
                                <option value="">Status de Relacionamento</option>
                                <option value="Solteir@">Solteir@ </option>
                                <option value="Casad@">Casad@</option>
                                <option value="Enrolad@">Enrolad@</option>
                                <option value="Relacionamento Aberto">Relacionamento Aberto</option>
                            </select>

                    </div>

                    <label className="label-cover">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFileCover}/><br />
                            <img src={coverUrl === null ? cover : coverUrl} alt="Avatar"/>
                        </label>
                    <div className='confirmation'>
                        <div className="confirmation_informations">
                        <input type="checkbox"/>
                        <span>Minhas informações estão corretas!</span>
                        </div>
                        <div className='buttonsInformation'>
                        <button onClick={handleUploadAccount}>{loadding === true ? <FiRefreshCcw /> : "Salvar e avançar"}</button>
                        <button onClick={logout}>Sair</button>
                        </div>
                    </div>
                        </form>
            </div>
    )
}

export {InformationsForm}