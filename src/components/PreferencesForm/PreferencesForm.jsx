import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import logoImg from '../../assets/images/logo.png';
import { AuthContext } from '../../contexts/Auth';
import './preferencesForm.css'

function PreferencesForm() {
    const LocalPreferences = localStorage.getItem("preferences-foursome");
    const {preferencesAccount, logout} = useContext(AuthContext);
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


    useEffect(() => {
        function redirectToPage() {
            if(LocalPreferences !== "undefined") {
                logout(user.id)
            }
        }
        redirectToPage()
    },[])

    
    function handlePreferences(e) {
        e.preventDefault();
        toast.info("Salvando Preferências. Aguarde...")
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
            <div className="content-Login">
            <div className="preferencesForm">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Preferências</h2>
                    </div>
                        <form action="">
                    <div className="data">                      
                   
                    <div className="search">
                        <input type="checkbox" value="Homem" onChange={handleSelectHomem}/><span>Homem</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value="Mulher" onChange={handleSelectMulher}/><span>Mulher</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value="Casal" onChange={handleSelectCasal}/><span>Casal</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value="Trisal" onChange={handleSelectTrisal}/><span>Trisal</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value="Travestis" onChange={handleSelectTravestis}/><span>Travestis</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value="Transexuais" onChange={handleSelectTransexuais}/><span>Transexuais</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value="Grupos" onChange={handleSelectGrupos}/><span>Grupos</span>
                    </div>
                    </div>
                    <div className="proposal">
                        <textarea name="" id="" cols="100" rows="3" placeholder="proposta" value={proposal} onChange={(e) => setProposal((e.target.value))}></textarea>
                    </div>
                    <div className='confirmation'>
                        <div className="confirmation_preferencesForm">
                        <input type="checkbox"/>
                        <span>Minhas informações estão corretas!</span>
                        </div>
                        <button onClick={handlePreferences}>Salvar e Avançar</button>
                    </div>
                        </form>
            </div>
            <br />
            <br />
            <br />
            <br />
            </div>
    )
}

export {PreferencesForm}