import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import logoImg from '../../assets/images/logo.png';
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import './updateAccounts.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify';
import { mask as masker, unMask } from "remask";
import buscaCep from '../../services/api-buscaCep';


function UpdateAccounts() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformations = localStorage.getItem("informations-foursome");
    const userInformations = JSON.parse(LocalInformations);
    const {createInformationsAccount, logout} = useContext(AuthContext)
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const [city, setCity] = useState(userInformations.city);
    const [uf, setUf] = useState(userInformations.uf);
    const [cep, setCep] = useState("");
    const [relationship, setRelationship] = useState(userInformations.relationship);
    const [nickname, setNickname] = useState(userInformations.nickname)
    const [loadding, setLoadding] = useState(false);
    const [location, setLocation] = useState(false);
    const [textError, setTextError] = useState(false);
    const [latitude, setLatitude] = useState(false);
    const [longitude, setLongitude] = useState(false);




    useEffect(() => {
        function getLocation() {
            return window.navigator.geolocation.getCurrentPosition(success, error);
             }

        function success(position) {
            const lat  = position.coords.latitude;
            const long = position.coords.longitude;
        
            setLatitude(lat)
            setLongitude(long)
          }

              
      function error() {
        console.log('Unable to retrieve your location');
      }

          getLocation()
    },)
    

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

    function handleLogout() {
        logout(user.id)
    }
    
    
    async function handleUploadAccount(e) {
        e.preventDefault();

        if(cep === "" ) {
            toast.error("Favor preencher o cep");
            return;
        }

          
        if(userInformations.avatar === null || userInformations.avatar === undefined ) {
       toast.info("Salvando as informações. Aguarde...")
                //Avatar
        setLoadding(true);
        console.log(loadding);
        const uuid = uuidv4();

        let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
            
        console.log(uploadAvatar.ref.name, photoUrlAvatar); 

        const avatar = photoUrlAvatar === "" || photoUrlAvatar === undefined || photoUrlAvatar === null ? userInformations.avatar : photoUrlAvatar
        const cover = photoUrlAvatar === "" || photoUrlAvatar === undefined || photoUrlAvatar === null ? userInformations.cover : photoUrlAvatar

        const id = uuidv4();
        //Salvando no banco de dados
       //createInformationsAccount({id, idAccount: user.id, avatar: avatar, cover: linkCover, city, uf, relationship, nickname, cep: cep, latitude: latitude, longitude: longitude});
        console.log({id, avatar: avatar, cover: cover, city, uf, relationship, nickname, cep: cep, latitude: latitude, longitude: longitude});
        console.log(loadding);

    } else {
        const avatar =  userInformations.avatar
        const cover =  userInformations.cover
        console.log({id: user.id, avatar: avatar, cover: cover, city, uf, relationship, nickname, cep: cep, latitude: latitude, longitude: longitude});
        console.log(loadding);
    }
           
 
        
    }

    
    if(cep.length === 9) {
        handleSearchCep()
    } else {
        console.log("Nada")
    }

    async function handleSearchCep() {
            try {
                const res = await buscaCep.get(`${cep}/json`);
                setUf(res.data.uf)
                setCity(res.data.localidade)
            }catch{
                console.log("error")
                toast.error("CEP não encontrado. Por favor, digite sua cidade e seu Estado(UF) - Sigla")
                setLocation(true)
                setTextError(true)
            }
            return
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


    function ChangeMask(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "SS",
        ]);
    
        setUf(maskedValue)
      }
    function ChangeMaskCEP(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "99999-999",
        ]);
    
        setCep(maskedValue)
      }


    return (
        <div className="container">
        <div className="content">
            <div className="updateAccount">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Atualizando informações</h2>
                    </div>
                        <form onSubmit={handleUploadAccount}>
                            <p>Avatar</p>
                        <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile} required/><br />
                            <img src={avatarUrl === null ? userInformations.avatar : avatarUrl} alt="Avatar" height={100} width={100}/>
                        </label>

                        <br />
                        <div className="SearchCep">
                        <input type="text" placeholder='Digite seu cep' value={cep} onChange={ChangeMaskCEP}/>
                        {/* <button onClick={handleSearchCep}>Buscar Cep</button> */}
                        </div>
                        <div className="digiteCep">
                        <button onClick={handleHabiliteLocation}>Não sei meu CEP</button>
                        </div>
                    <div className="data"> 

                    {location === true || uf !== "" ?
                    <div className="location">
                        <h5>{textError === false ? "" : "CEP não encontrado, digite sua cidade e estado"}</h5>
                            <input type="text" placeholder='UF (Sigla. Ex.: RJ)' value={uf.toUpperCase()} onChange={ChangeMask}  required/>
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
            </div>
            </div>
    )
}

export {UpdateAccounts}