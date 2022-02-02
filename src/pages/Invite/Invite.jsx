import { TopBar } from "../../components/TopBar/TopBar"
import './invite.css'
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/Auth"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { FiCheck} from "react-icons/fi"
import { v4 as uuidv4} from 'uuid'


function Invite() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    const {CreateInviteNewUsew} = useContext(AuthContext);

    function createInvite(e) {
        e.preventDefault();

        const inviteCode = uuidv4()
       
        const code = inviteCode.substring(0, 4)

        console.log(`Code: ${code}, Nome: ${name}, Email: ${email}, Telefone: ${phone},
        isAccount: ${user.id}, username: ${user.username}, nickname: ${userInformation.nickname}, avatar: ${userInformation.avatar}`);


        CreateInviteNewUsew({code, name, email, phone, username: user.username, idAccount: user.id})

       

        setEmail("")
        setPhone("")
        setName("")
    }
   
    return (
        <div className="content">
            <ToolbarLeftSlim />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="invites">
                            <div className="invites-selected">
                                <button className="selected">Enviar convite</button>
                                <button>Convites enviados</button>
                            </div>
                            <div className="invites-all">
                                <div className="invites-unic">
                                    <div className="informationInvite">
                                        <h3>Olá, {userInformation.nickname}<br />antes de enviar um convite, verifique as seguintes informações</h3>
                                       <div className="roles">
                                       <p><FiCheck /> Certifique-se se seu convidado ja faz parte de nossa rede.</p>
                                        <p><FiCheck /> O convite enviado é único, intransferível e válido por 10 dias.</p>
                                        <p><FiCheck /> Você se torna amplamente responsável pelos atos de seu convidado, podendo sofrer as mesmas punições que ele, em caso de má conduta.</p>
                                       </div>
                                    </div>
                                   <form action="">
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefone"/>

                                        <button onClick={createInvite}> Enviar Convite</button>
                                   </form>  
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
                                   <br />
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