import { ToolBarLeft } from "../../components/ToolBarLeft/ToolBarLeft"
import { TopBar } from "../../components/TopBar/TopBar"
import './invite.css'
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/Auth"


function Invite() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");


    const {CreateInviteNewUsew} = useContext(AuthContext);

    function createInvite(e) {
        e.preventDefault();

        setCode(user.id.substring(0, 6))

        console.log(`Code: ${code}, Nome: ${name}, Email: ${email}, Telefone: ${phone},
        isAccount: ${user.id}, username: ${user.username}, nickname: ${userInformation.nickname}, avatar: ${userInformation.avatar}`);


        CreateInviteNewUsew({inviteCode: code, name, email, phone})

        window.location.href = `https://api.whatsapp.com/send?phone=55${phone}&text=Parabens!!

        Você foi convidado a fazer parte de uma rede de relacionamento, exclusivo para casais, solteiros e solteiras. FOURSOME foi criado com o objetivo de aproximar pessoas com o mesmo pensamento de relacionamento de forma livre, segura e respeitosa.
        
        Esse convite é valido por 10 dias e intransferível.
        
        Para criar seu perfil agora, acesse:
        foursome.com.br/signup/${email} e Urilize o Código ${code}
        Em caso de dúvida, fale conosco.
        Contato@foursome.com.br -- 
        FOURSOME https://www.foursome.com.br`
    }
    return (
        <div className="content">
            <ToolBarLeft />
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
                                   <form action="">
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefone"/>

                                        <button onClick={createInvite}> Enviar Convite</button>
                                   </form>  
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