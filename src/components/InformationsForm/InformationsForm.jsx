import { FiUpload } from 'react-icons/fi';
import logoImg from '../../assets/images/logo2.png';
import profile from '../../assets/images/profile.jpg';
import cover from '../../assets/images/cover.jpg';

import './informationsForm.css'

function InformationsForm() {
    const avatarUrl = null;

    return (
            <div className="informations">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Informações Complementares</h2>
                    </div>
                        <form action="">
                        <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" /><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={100} width={100}/>
                        </label>

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

                    <label className="label-cover">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" /><br />
                            <img src={avatarUrl === null ? cover : avatarUrl} alt="Avatar" height={200} width={850}/>
                        </label>
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