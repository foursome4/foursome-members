
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import './registrationEnd.css'
import logo from '../../assets/images/logo.png';

function RegistrationEnd() {
    const {logout} = useContext(AuthContext)
    return (
        <div className="content-registration">
            <div className="registrationEnd">
                <div className="title">
                    <img src={logo} alt="" />
                    <h2>Parabéns! <br /> Você concluiu a etapa do cadastro com sucesso.</h2>
                    <h3>Siga as seguintes orientações para aproveitar melhor o nosso site:</h3>
                    <br />
                    <div className="orientations">
                    <h4><b> Não utilizar termos ofensivos em:</b></h4>
                    <h4> - Em conversas, postagens e comentários.</h4> <br />
                    <h4><b> Seja gentil e faça sempre novas amizades</b></h4> <br />
                    <h4><b> Você pode postar 1 foto e 1 vídeo a cada dia.</b></h4> <br />
                    <h4><b> Sugerimos não postar fotos/videos mostrando o rosto, seja em postagens, capa ou perfil.</b></h4> <br />
                    <h4><b> Sugerimos não por seu nome verdadeiro como nome de exibição, a fim de preservar seu sigilo e identidade.</b></h4>
                    <h4>- Vocês podem trocar informações pessoais pelo chat.</h4> <br />
                    <h4><b> Não postar seu número de telefone ou id, usuário ou link de qualquer outro aplicativo.</b></h4>
                    <h4>- Vocês podem trocar essas informações pelo chat.</h4> <br />
                    {/* <h4><b> Não postar fotos/videos mostrando o rosto, seja em postagens, capa ou perfil.</h4> */}
                    <h4><b> Ao convidar um amigo, saiba que:</b></h4>
                    <h4> - Você se torna amplamente responsável pelos atos de seu convidado dentro do site.</h4>
                    <h4> - Em caso de má conduta de seu convidado, as punições impostas a ele, também são impostas a você.</h4> <br />
                   

                    {/* <div className="informations">
                        <h3>Informações sobre uso do site e funcionalidades</h3>
                        <h4>Usuários de iPhone, em caso de dificuldades de acessar o nosso site. Recomendamos:</h4>
                        <h4>- Verificar as versões do IOS e Safari</h4>
                        <h4>- Em caso de não sucesso na etapa anterior: Baixar o Google Chrome</h4>
                        <h4><a href="https://apps.apple.com/br/app/google-chrome/id535886823"> Clique aqui</a> </h4>
                    </div> */}
                    </div>
                </div> 
                                
                <button onClick={logout}>Voltar para o login</button>
            </div>
        </div>
    )
}

export {RegistrationEnd}