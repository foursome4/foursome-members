import { TopBar } from "../../components/TopBar/TopBar"
import './invite.css'
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { Footer } from "../../components/Footer/Footer"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { FiCheck, } from "react-icons/fi"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import { InviteEmail } from "../../components/ComponentsInvites/InviteEmail/InviteEmail"


function Invite() {
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);


  
    return (
        <div className="content-invite">
            <ToolbarLeftSlim />
            <BarBottomMenu />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="invites">
                            <div className="invites-selected">
                                <button className="selected">Enviar convite</button>
                            </div>
                            <div className="invites-all">

                                <div className="invites-unic">
                                    <div className="informationInvite">
                                        <h4>Olá, {userInformation.nickname}.<br />Antes de enviar um convite, verifique as seguintes informações</h4>
                                       <div className="roles">
                                       <p><FiCheck /> Certifique-se se seu convidado não faz parte de nossa rede.</p>
                                        <p><FiCheck /> O convite enviado é único, intransferível e válido por 10 dias.</p>
                                        <p><FiCheck /> Você se torna amplamente responsável pelos atos de seu convidado, podendo sofrer as mesmas punições que ele, em caso de má conduta.</p>
                                       </div>
                                    </div>

                                 <InviteEmail />       
                                
                                </div>

                            </div>

                    </div>
                <ChatSlim />
                </div>
            <Footer />
            </div>
        </div>
    )
}

export { Invite }