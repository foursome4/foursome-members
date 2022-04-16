import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import './informations.css'

function Informations() {

    return(
        <div className="informations">
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
                 <TopBar />
            <div className="informations-page">
                <div className="selections">
                    <button>Sobre a Foursome</button>
                    <button>Regras e sugestões</button>
                    <button>Dicas e tutoriais</button>
                    <button>Informações de pagamento</button>
                    <button>Desenvolvimento</button>

                </div>
                <div className="informationsSelected">

                </div>
                
        </div>
        <ChatSlim />
        </div>
    )
}


export {Informations}



{/* <h1>Informações sobre a Foursome</h1>
                                        
<h3>O que é a Foursome?</h3>
<p>Somos uma rede social adulta de origem brasileira voltada para swing, concontro causais e sexuais, sexo virtual e exibicionismo. <br />
Nosso objetivo é aproximar pessoas com o mesmo objetivo, trazendo uma experiência de relacionamento mais acertiva e direta.</p>

<h3>Nossas regras e sugestões</h3>
<p> Não utilizar termos ofensivos em:</p>
<p> - Em conversas, postagens e comentários.</p>
<p> Seja gentil e faça sempre novas amizades</p>
<p> Você pode postar 1 foto e 1 vídeo a cada dia.</p>
<p> Sugerimos não postar fotos/videos mostrando o rosto, seja em postagens, capa ou perfil.</p>
<p> Sugerimos não por seu nome verdadeiro como nome de exibição, afim de preservar seu sigilo e identidade.</p>
<p> - Vocês podem trocar informações pessoais pelo chat.</p>
<p> Não postar seu numero de telefone ou id, usuário ou link de qualquer outro aplicativo.</p>
<p> - Vocês podem trocar essas informações pelo chat.</p>
<p> Ao convidar um amigo, saiba que:</p>
<p> - Você se torna amplamente responsável pelos atos de seu convidado dentro do site.</p>
<p> - Em caso de má conduta de seu convidado, as punições impostas a ele, também são impostas a você.</p> */}