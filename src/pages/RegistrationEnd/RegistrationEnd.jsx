
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import './registrationEnd.css'
import logo from '../../assets/images/logo.png'
import { FiCheckCircle } from 'react-icons/fi'

function RegistrationEnd() {
    const {logout} = useContext(AuthContext)
    return (
        <div className="content">
            <div className="registrationEnd">
                <div className="title">
                    <img src={logo} alt="" />
                    <h2>Parabéns! <br /> Você concluiu a etapa do cadastro com sucesso.</h2>
                    <h3>Siga as seguintes orientações para aproveitar melhor o nosso site:</h3>
                    <div className="orientations">
                    <h4>< FiCheckCircle/> Poste 10 fotos e/ou vídeos para conseguir ver as fotos e videos dos demais</h4>
                    <h4>< FiCheckCircle/> Não utilizar termos ofensivos em conversas, postagens e comentarios</h4>
                    <h4>< FiCheckCircle/> Seja gentil e faça sempre novas amizades</h4>
                    </div>
                </div>
                                
                <button onClick={logout}>Voltar para o login</button>
            </div>
        </div>
    )
}

export {RegistrationEnd}