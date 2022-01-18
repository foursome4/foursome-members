import logoImg from '../../assets/images/logo2.png';
import avatarDefault from '../../assets/images/avatarDefault.png';
import './informationsForm.css'

function InformationsForm() {
    return (
            <div className="informations">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Informações Complementares</h2>
                    </div>
                        <form action="">
                    <img src={avatarDefault} alt="" />
                    <div className="data">                      
   
                            <select name="" id="">
                                <option value="">Status de Relacionamento</option>
                                <option value="uf">Solteiro(@) </option>
                                <option value="Estado ">Casado(@)</option>
                                <option value="Estado ">Enrolado(@)</option>
                                <option value="Estado ">Relacionamento Aberto</option>
                            </select>

                            <select name="" id="">
                                <option value="">UF</option>
                                <option value="Estado ">Estado 1</option>
                                <option value="Estado ">Estado 2</option>
                                <option value="Estado ">Estado 3</option>
                                <option value="Estado ">Estado 4</option>
                            </select>

                            <select name="" id="">
                                <option value="">Cidade</option>
                                <option value="Cidade">Cidade 1</option>
                                <option value="Cidade">Cidade 2</option>
                                <option value="Cidade">Cidade 3</option>
                                <option value="Cidade">Cidade 4</option>
                                <option value="Cidade">Cidade 5</option>
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

export {InformationsForm}