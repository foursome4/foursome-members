import { TopBar } from "../../components/TopBar/TopBar"
import './invite.css'
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { FiCheck,FiMail } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import { InviteEmail } from "../../components/ComponentsInvites/InviteEmail/InviteEmail"
import { useState } from "react"
import { InviteWhatsapp } from "../../components/ComponentsInvites/InviteWhatsapp/InviteWhatsapp"
import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth"


function Invite() {
    const {inactivityTime} = useContext(AuthContext);

    inactivityTime()
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);

    const [typeInvite, setTypeInvite] = useState("Email");

    function handleInviteForEmail(){
        setTypeInvite("Email")
      }
      function handleInviteForWhatsapp(){
        setTypeInvite("Whatsapp")
      }
  
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
                                        <br />
                                        <p><b>Qualquer problema ou dúvida. Entra em conato:</b></p>
                                        <p><b>Whatsapp</b> (22)99791-0510</p>
                                        <p><b>E-mail:</b> contato@foursome.com.br</p>
                                       </div>
                                    </div>

                                    <div className="buttons">
                                      <button onClick={handleInviteForEmail}>E-mail <FiMail /></button>
                                      <button onClick={handleInviteForWhatsapp}>Whatsapp <FaWhatsapp /></button>
                                    </div>

                                    { typeInvite === "Email" ?

                                 <InviteEmail />       
                                 : typeInvite === "Whatsapp" ?
                                 <InviteWhatsapp />
                                 : "" }
                                </div>

                            </div>

                    </div>
                <ChatSlim />
                </div>
            </div>
        </div>
    )
}

export { Invite }