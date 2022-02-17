import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png';
import { AuthContext } from '../../contexts/Auth';
import api from '../../services/api';
import './settingsPreferences.css'

function SettingsPreferences() {
    const {preferencesAccount} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const [homem, setHomem] = useState("");
    const [mulher, setMulher] = useState("");
    const [casal, setCasal] = useState("");
    const [trisal, setTrisal] = useState("");
    const [travestis, setTravestis] = useState("");
    const [transexuais, setTransexuais] = useState("");
    const [grupos, setGrupos] = useState("");
    const [proposal, setProposal] = useState("");
    const [preferences, setPreferences] = useState([])

    useEffect(() => {
        async function loadPreferences() {
            const idAccount = user.id;
            await api.get(`/preferences/${idAccount}`)
            .then((res) => {
              console.log(res.data[0])
              setPreferences(res.data[0])

              setHomem(preferences.men)
            }).catch(error => {
              console.log("Erro ao buscar dados" + error)
          })
          }

          loadPreferences() 
    }, [])

    
    function handlePreferences(e) {
        e.preventDefault();
        console.log({idAccount: user.id, homem, mulher, casal, trisal, travestis, transexuais, grupos, proposal})

        preferencesAccount({idAccount: user.id, men:homem, woman:mulher, couple:casal, trisal:trisal, transvestites:travestis, transsexuals:transexuais, groups:grupos, proposal:proposal})
    }

    function handleSelectHomem(e) {
        if(homem === "") {
            setHomem(e.target.value);
        } else {
            setHomem("");
        }
    }
    function handleSelectMulher(e) {
        if(mulher === "") {
            setMulher(e.target.value);
        } else {
            setMulher("");
        }
    }
    function handleSelectCasal(e) {
        if(casal === "") {
            setCasal(e.target.value);
        } else {
            setCasal("");
        }
    }
    function handleSelectTrisal(e) {
        if(trisal === "") {
            setTrisal(e.target.value);
        } else {
            setTrisal("");
        }
    }
    function handleSelectTravestis(e) {
        if(travestis === "") {
            setTravestis(e.target.value);
        } else {
            setTravestis(e.target.value);
        }
    }
    function handleSelectTransexuais(e) {
        if(transexuais === "") {
            setTransexuais(e.target.value);
        } else {
            setTransexuais("");
        }
    }
    function handleSelectGrupos(e) {
        if(grupos === "") {
            setGrupos(e.target.value);
        } else {
            setGrupos("");
        }
    }


    return (

            <div className="settingsPreferences">
                <div className="title">
                    </div>
                        <form action="">
                    <div className="data">                      
                   
                    <div className="search">
                        <input type="checkbox" checked={preferences.men !== "" ? true : ""} value="Homem" onChange={handleSelectHomem}/><span>Homem</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" checked={preferences.woman !== "" ? true : ""} value="Mulher" onChange={handleSelectMulher}/><span>Mulher</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" checked={preferences.couple !== "" ? true : ""} value="Casal" onChange={handleSelectCasal}/><span>Casal</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" checked={preferences.trisal !== "" ? true : ""} value="Trisal" onChange={handleSelectTrisal}/><span>Trisal</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" checked={preferences.transvestites !== "" ? true : ""} value="Travestis" onChange={handleSelectTravestis}/><span>Travestis</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" checked={preferences.transsexuals !== "" ? true : ""} value="Transexuais" onChange={handleSelectTransexuais}/><span>Transexuais</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" checked={preferences.groups !== "" ? true : ""} value="Grupos" onChange={handleSelectGrupos}/><span>Grupos</span>
                    </div>
                    </div>
                    <div className="proposal">
                        <textarea name="" id="" cols="100" rows="3" placeholder="proposta" value={preferences.proposal} onChange={(e) => setProposal((e.target.value))}></textarea>
                    </div>
                    <div className='confirmation'>
                        <button onClick={handlePreferences}>Atualizar</button>
                    </div>
                        </form>
            </div>
    )
}

export {SettingsPreferences}