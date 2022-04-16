import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import logoImg from '../../assets/images/logo.png';
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
    const user = JSON.parse(Local);
    const {createInformationsAccount} = useContext(AuthContext)
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [cep, setCep] = useState("");
    const [relationship, setRelationship] = useState("");
    const [nickname, setNickname] = useState("")
    const [loadding, setLoadding] = useState(false);
    const [location, setLocation] = useState(false);


    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"


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
    
    async function handleUploadAccount(e) {
        e.preventDefault();

                
        if(avatarUrl === null ) {
            toast.error("Favor adicionar foto de perfil")
        }

        if(city === "" && uf === "" ) {
            toast.error("Busque seu CEP para preencher Cidade e Estado")
        }

          
        if(avatarUrl !== null && nickname !== "" && city !== "" && uf !== "" && relationship !== "") {
       toast.info("Salvando as informações. Aguarde...")
                //Avatar
        setLoadding(true);
        console.log(loadding);
        const uuid = uuidv4();

        let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
            
        console.log(uploadAvatar.ref.name, photoUrlAvatar);

        


        const linkProfile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
        const avatar = photoUrlAvatar === "" || photoUrlAvatar === undefined || photoUrlAvatar === null ? linkProfile : photoUrlAvatar

        const linkCover = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/capa%20foursome2.png?alt=media&token=6124db20-1954-47d4-9444-73b3fee41ce0"
        
        const id = uuidv4();
        //Salvando no banco de dados
       createInformationsAccount({id, idAccount: user.id, avatar: avatar, cover: linkCover, city, uf, relationship, nickname});
        console.log({id, idAccount: user.id, avatar: photoUrlAvatar, cover: linkCover, city, uf, relationship, nickname});
        console.log(loadding);
           
    } 
        
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


    function handleHabiliteLocation(e) {
        e.preventDefault();
        if(location === false) {
            setLocation(true)
        } else {
            setLocation(false)
        }
    }


    return (
            <div className="complete-informations">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Informações Complementares</h2>
                    </div>
                        <form onSubmit={handleUploadAccount}>
                            <p>Avatar</p>
                        <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile} required/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={100} width={100}/>
                        </label>

                        <br />
                        <div className="SearchCep">
                        <input type="text" placeholder='Digite seu cep' value={cep} onChange={(e) => setCep(e.target.value)}/>
                        <button onClick={handleSearchCep}>Buscar Cep</button>
                        </div>
                        <div className="digiteCep">
                        <button onClick={handleHabiliteLocation}>Não sei meu CEP</button>
                        </div>
                    <div className="data"> 

                    {location === true || uf !== "" ?
                    <div className="location">
                            <input type="text" placeholder='UF (Sigla. Ex.: RJ)' value={uf} onChange={(e) => setUf(e.target.value)} required/>
                            <input type="text" placeholder='Cidade' value={city} onChange={(e) => setCity(e.target.value)} required/>
                        </div>    
                        :  "" }



                        <div className="dataUser">
                            <input type="text" placeholder='Nome de Exibição' value={nickname} onChange={(e) => setNickname(e.target.value)} required/>
                            <select className={relationship === "" ? "" : "active"} value={relationship} onChange={handleRelationship} required>
                                <option value="">Status de Relacionamento</option>
                                <option value="Solteir@">Solteir@ </option>
                                <option value="Casad@">Casad@</option>
                                <option value="Enrolad@">Enrolad@</option>
                                <option value="Relacionamento Aberto">Relacionamento Aberto</option>
                            </select>
                            </div>             

                    </div>

                    <div className='confirmation'>
                        <div className='buttonsInformation'>
                        <button onClick={handleUploadAccount}> Salvar e avançar</button>
                        </div>
                    </div>
                        </form>
            </div>
    )
}

export {InformationsForm}