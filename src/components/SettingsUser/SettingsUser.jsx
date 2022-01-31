import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import buscaCep from "../../services/api-buscaCep";
import profile from '../../assets/images/profile.jpg';
import cover from '../../assets/images/cover.jpg';
import "./settingsUser.css"
import {SettingsDataAccess} from '../SettingsDataAccess/SettingsDataAccess'

function SettingsUser({idAccount}) {

    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const LocalInformations = localStorage.getItem("informations-foursome");
    const userInformations= JSON.parse(LocalInformations);
    console.log("userInformations");
    console.log(userInformations);

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
    const [informations, setInformations] = useState("informations");
    const [characteristcs, setCharacteristcs] = useState("");
    const [preferences, setPreferences] = useState("");
    const [dataAccess, setDataAccess] = useState("");


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

    async function handleSearchCep(e) {
        e.preventDefault();
        try {
            const res = await buscaCep.get(`${cep}/json`);
            console.log(res.data);
            console.log(res.data.uf);
            setUf(res.data.localidade)
            setCity(res.data.uf)
        }catch{
            console.log("eRRO")
        }
    }

    function handleRelationship(e) {
        setRelationship(e.target.value)
    }

    function handleInformations() {
        setInformations("informations")
        setCharacteristcs("")
        setPreferences("")
        setDataAccess("")
    }
    function handleCaracteristicas() {
        setCharacteristcs("characteristcs")
        setInformations("")
        setPreferences("")
        setDataAccess("")
    }
    function handlePreferencias() {
        setPreferences("preferences")
        setCharacteristcs("")
        setInformations("")
        setDataAccess("")
    }
    function handleDadosAcesso() {
        setDataAccess("dataAccess")
        setPreferences("")
        setCharacteristcs("")
        setInformations("")
    }   


    return(
        <div className="settings">
            <div className="buttons">
                <button className={informations === "informations" ? "selected" : ""} onClick={handleInformations}>Informations</button>
                <button className={characteristcs === "characteristcs" ? "selected" : ""}  onClick={handleCaracteristicas}>Caracteristicas</button>
                <button className={preferences === "preferences" ? "selected" : ""}  onClick={handlePreferencias}>Preferências</button>
                <button className={dataAccess === "dataAccess" ? "selected" : ""}  onClick={handleDadosAcesso}>Dados de Acesso</button>

            </div>
            {informations === "informations" ?
            <div className="information">
                <form action="">
            <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile}/><br />
                            <img src={avatarUrl === null ? userInformations.avatar : avatarUrl } alt="Avatar" height={100} width={100}/>
                        </label>


                        <div className="SearchCep">
                        <input type="text" placeholder='Digite seu cep' value={cep} onChange={(e) => setCep(e.target.value)}/>
                        <button onClick={handleSearchCep}>Buscar Cep</button>
                        </div>
                    <div className="data">                      
                            <input type="text" placeholder='UF' value={userInformations.uf} onChange={(e) => setUf(e.target.value)}/>
                            <input type="text" placeholder='Cidade' value={userInformations.city} onChange={(e) => setCity(e.target.value)}/>
                            <input type="text" placeholder='Nome de Exibição' value={userInformations.nickname} onChange={(e) => setNickname(e.target.value)}/>
                            <select value={userInformations.relationship} onChange={handleRelationship}>
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
                            <img src={coverUrl === null ? userInformations.cover : coverUrl } alt="Avatar"/>
                        </label>
                        {/* <button onClick={handleUploadAccount}>{loadding === true ? <FiRefreshCcw /> : "Atualizar"}</button>
                        <button onClick={logout}>Sair</button> */}
                        <button>Atualizar</button>
            </form>
            </div> :
        characteristcs === "characteristcs" ?
        "Caracteristicas serão editadas aqui"
        :
        preferences === "preferences" ?
        "Edição de Preferencias aqui"
        :
        dataAccess === "dataAccess" ?
        <SettingsDataAccess />
        :
            "Nada para mostrar ainda"
            }
        </div>
    )
}

export {SettingsUser}