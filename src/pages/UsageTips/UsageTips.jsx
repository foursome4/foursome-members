import './usageTips.css'
import logo from '../../assets/images/logo.png';

function UsageTips() {
    function handleRedirectFeed(e) {
        e.preventDefault();
        window.open("/feed","_self")
    }
    return (
        <div className="content-UsageTips">
            <div className="UsageTips">
                <div className="title">
                    <img src={logo} alt="" />
                    <h2>Dicas de uso!</h2>
                    <h3>Siga as seguintes orientações para aproveitar melhor o nosso site:</h3>
                    <br />
                    <div className="orientations">
                    <h4><b> Ao finalizar seu uso. Clique sempre no botão na barra /Botão de sair Icon/ superior</b></h4><br />
                    <h4><b> Para convidar um amigo clique neste ícone</b></h4> <br />
                    <h4><b> Clique neste ícone, para ver os convites enviados</b></h4> <br />
                    <h4><b> Utilizar suas fotos reais em Perfil/Capa. Não sendo permitido fotos de sites, revistas, plantas e/ou animais.</b></h4> <br />
                    <h4><b> Sugerimos não postar fotos/videos mostrando o rosto, seja em postagens, capa ou perfil.</b></h4> <br />
                    <h4><b> Sugerimos não por seu nome verdadeiro como nome de exibição, a fim de preservar seu sigilo e identidade.</b></h4>
                    <h4>- Vocês podem trocar informações pessoais pelo chat.</h4> <br />
                    <h4><b> Não postar seu número de telefone, id, usuário ou link de qualquer outro aplicativo.</b></h4>
                    <h4>- Vocês podem trocar essas informações pelo chat.</h4> <br />
                    <h4><b> Ao convidar um amigo, saiba que:</b></h4>
                    <h4> - Você se torna amplamente responsável pelos atos de seu convidado dentro do site.</h4>
                    <h4> - Em caso de má conduta de seu convidado, as punições impostas a ele, também são impostas a você.</h4> <br />
                    <h4><b> Não é permitido postar imagens de Flyers de eventos no Feed. Todos os eventos devem ser criados na aba eventos.</b></h4>

                    <br /><br />
                    <h4><b>Qualquer problema ou dúvida. Entra em conato:</b></h4>
                    <h4><b>Whatsapp</b> (22)99791-0510</h4>
                    <h4><b>E-mail:</b> contato@foursome.com.br</h4>
                   
                    </div>
                </div> 
                                
                <button onClick={handleRedirectFeed}>Ir para o Feed</button>
            </div>
        </div>
    )
}

export {UsageTips}