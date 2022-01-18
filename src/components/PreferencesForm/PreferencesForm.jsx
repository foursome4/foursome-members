import logoImg from '../../assets/images/logo2.png';
import './preferencesForm.css'

function PreferencesForm() {
    return (
            <div className="informations">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Preferências</h2>
                    </div>
                        <form action="">
                    <div className="data">                      
                    <select name="" id="">
                                <option value="uf">O que Busca?</option>
                                <option value="uf">Estado </option>
                                <option value="Estado ">Homem</option>
                                <option value="Estado ">Mulher</option>
                                <option value="Estado ">Casal</option>
                            </select>
                            <select name="" id="">
                                <option value="uf">Orientação Sexual</option>
                                <option value="uf">Estado </option>
                                <option value="Estado ">Hetero</option>
                                <option value="Estado ">Gay</option>
                                <option value="Estado ">Bi</option>
                                <option value="Estado ">Trans</option>
                            </select>
                            <select name="" id="">
                                <option value="uf">Status de Relacionamento</option>
                                <option value="uf">Solteiro(@) </option>
                                <option value="Estado ">Casado(@)</option>
                                <option value="Estado ">Enrolado(@)</option>
                                <option value="Estado ">Relacionamento Aberto</option>
                            </select>
                            <select name="" id="">
                                <option value="uf">Tipo de relacionamento que busca?</option>
                                <option value="uf">Uma noite </option>
                                <option value="Estado ">Relacionamento</option>
                                <option value="Estado ">Sem compromisso</option>
                            </select>
                            <select name="" id="">
                                <option value="uf">Humor</option>
                                <option value="uf">Introvertido(@) </option>
                                <option value="Estado ">Extrovertido(@)</option>
                                <option value="Estado ">Sério(@) </option>
                                <option value="Estado ">Mais aberto(@) </option>
                            </select>
                            <select name="" id="">
                                <option value="uf">Atividades / Hobies</option>
                                <option value="uf">Cinema </option>
                                <option value="Estado ">Atividades físicas / Esportes</option>
                                <option value="Estado ">Balada </option>
                                <option value="Estado ">Praia / Cachoeira </option>
                            </select>
         
  
                    </div>
                    <div className='confirmation'>
                        <div className="confirmation_informations">
                        <input type="checkbox"/>
                        <span>Minhas informações estão corretas!</span>
                        </div>
                        <button>Salvar e Avançar</button>
                    </div>
                        </form>
            </div>
    )
}

export {PreferencesForm}