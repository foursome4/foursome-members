import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import logoImg from '../../assets/images/logo.png';
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import './informationsForm.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { v4 as uuidv4 } from 'uuid'
import buscaCep from '../../services/api-buscaCep';
import { toast } from 'react-toastify';
import { mask as masker, unMask } from "remask";
import apiGoogleReverse from '../../services/apiGoogleReverse';


function InformationsForm() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const {createInformationsAccount, logout} = useContext(AuthContext)
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [city2, setCity2] = useState("");
    const [uf2, setUf2] = useState("");
    const [cep, setCep] = useState("");
    const [relationship, setRelationship] = useState("");
    const [nickname, setNickname] = useState("")
    const [loadding, setLoadding] = useState(false);
    const [location, setLocation] = useState(false);
    const [textError, setTextError] = useState(false);

    const [latitude, setLatitude] = useState(false);
    const [longitude, setLongitude] = useState(false);


    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"


    useEffect(() => {
        function getLocation() {
            return window.navigator.geolocation.getCurrentPosition(success, error);
             }

        function success(position) {
            const lat  = position.coords.latitude;
            const long = position.coords.longitude;
        
            setLatitude(lat);
            setLongitude(long);

            reverseGeolocalization(lat, long);
          }

          async function reverseGeolocalization(lat, long) {
            console.log(lat, long)
            const address = await apiGoogleReverse.get(`json?latlng=${lat},${long}&key=AIzaSyABASerjYyootb_nxj7evIFsZLOiqcnQm4`);
            console.log(address.data.results[0])
            setCity2(address.data.results[0].address_components[3].long_name)
            setUf2(address.data.results[0].address_components[4].short_name) 
            return
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

                
        if(avatarUrl === null ) {
            toast.error("Favor adicionar foto de perfil");
            return
        }

        if(city === "" && city2 === "" ) {
            toast.error("Busque seu CEP para preencher Cidade e Estado");
            return
        }
        if(nickname === "" || relationship === "" ) {
            toast.error("Favor preencher, todos os campos");
            return
        }

          
        if(avatarUrl !== null && nickname !== "" && relationship !== "") {
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
        createInformationsAccount({id, idAccount: user.id, avatar: avatar, cover: linkCover,
        city: cep === "" ? city2 : city,
       uf: cep === "" ? uf2 : uf, relationship, nickname, cep, latitude, longitude,
       username: user.username, role: user.role, status: user.status, type: user.type, email: user.email, phone: user.phone, online: user.online, patron: user.patron});

        console.log({id, idAccount: user.id, avatar: avatar, cover: linkCover,
            city: cep === "" ? city2 : city,
           uf: cep === "" ? uf2 : uf, relationship, nickname, cep, latitude, longitude,
           username: user.username, role: user.role, status: user.status, type: user.type, email: user.email, phone: user.phone, online: user.online, patron: user.patron});
           
    } else {
        toast.error("Ainda há, campos em branco. Favor revisar");
        return
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
                console.log(res.data);
                console.log(res.data.uf);
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
                        <input type="text" placeholder='Digite seu cep' value={cep} onChange={ChangeMaskCEP}/>
                        {/* <button onClick={handleSearchCep}>Buscar Cep</button> */}
                        </div>
                        <div className="digiteCep">
                        <button onClick={handleHabiliteLocation}>Não sei meu CEP</button>
                        </div>
                    <div className="data"> 

                    {cep === "" ?
                    <div className="location">
                            <br />
                            <h5>Localização automática</h5>
                            <input type="text" placeholder='UF (Sigla. Ex.: RJ)' value={uf2.toUpperCase()} onChange={ChangeMask}  required/>
                            <input type="text" placeholder='Cidade' value={city2} onChange={(e) => setCity(e.target.value)} required/>
                        </div>    
                        : <div className="location">
                        <br />
                        <h5>Localização pelo cep</h5>
                        <input type="text" placeholder='UF (Sigla. Ex.: RJ)' value={uf.toUpperCase()} onChange={ChangeMask}  required/>
                        <input type="text" placeholder='Cidade' value={city} onChange={(e) => setCity(e.target.value)} required/>
                    </div> }



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
                        <button className="delete" onClick={handleLogout}>Continuar depois</button>
                        </div>
                    </div>
                        </form>
            </div>
    )
}

export {InformationsForm}