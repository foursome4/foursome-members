import { useContext, useState } from 'react';
import logoImg from '../../assets/images/logo.png';
import { AuthContext } from '../../contexts/Auth';
import './preferencesForm.css'

function PreferencesForm() {
    const {preferencesAccount} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const [search, setSearch] = useState();
    const [relationship, setRelationship] = useState();
    const [humor, setHumor] = useState();
    const [activities, setActivities] = useState();
    
    function handlePreferences(e) {
        e.preventDefault();
        console.log({idAccount: user.id, search, relationship, humor, activities})

        preferencesAccount({idAccount: user.id, search, relationship, humor, activities})
    }

    function handleSelectSearch(e) {
        setSearch(e.target.value)
    }

    function handleSelectRelationship(e) {
        setRelationship(e.target.value)
    }

    function handleSelectHumor(e) {
        setHumor(e.target.value)
    }

    function handleSelectActivities(e) {
        setActivities(e.target.value)
    }

    return (

            <div className="preferencesForm">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Preferências</h2>
                    </div>
                        <form action="">
                    <div className="data">                      
                    <select value={search} onChange={handleSelectSearch}>
                                <option value="">O que Busca?</option>
                                <option value="Homem">Homem</option>
                                <option value="Mulher">Mulher</option>
                                <option value="Casal">Casal</option>
                                <option value="Trisal">Trisal</option>
                                <option value="Travestis">Travestis</option>
                                <option value="Transexuais">Transexuais</option>
                                <option value="Grupos">Grupos</option>
                            </select>
                            <select value={relationship} onChange={handleSelectRelationship}>
                                <option value="">Tipo de relacionamento que busca?</option>
                                <option value="Uma noite">Uma noite</option>
                                <option value="Relacionamento sério">Relacionamento sério</option>
                                <option value="Sem compromisso">Sem compromisso</option>
                                <option value="Novas amizades">Novas amizades</option>
                                <option value="Apenas companhia">Apenas companhia</option>
                            </select>
                            <select value={humor} onChange={handleSelectHumor}>
                                <option value="">Humor</option>
                                <option value="Introvertid@">Introvertid@</option>
                                <option value="Extrovertid@">Extrovertid@</option>
                                <option value="Séri@">Séri@</option>
                                <option value="Mais abert@">Mais abert@</option>
                            </select>
                            <select value={activities} onChange={handleSelectActivities}>
                                <option value="Atividades / Hobies">Atividades / Hobies</option>
                                <option value="Cinema / Netflix em casa">Cinema / Netflix em casa</option>
                                <option value="Atividades físicas / Esportes">Atividades físicas / Esportes</option>
                                <option value="Balada / Barzinho">Balada / Barzinho</option>
                                <option value="Praia / Cachoeira">Praia / Cachoeira </option>
                            </select>
         
  
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
    )
}

export {PreferencesForm}