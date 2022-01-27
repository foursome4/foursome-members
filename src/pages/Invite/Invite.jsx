import { TopBar } from "../../components/TopBar/TopBar"
import './invite.css'
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/Auth"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
// import { useShortenUrl } from 'react-shorten-url';


function Invite() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("rt54t5-o89");


    const {CreateInviteNewUsew} = useContext(AuthContext);

    function createInvite(e) {
        e.preventDefault();

        const text = `Parabens ${name}! %0AVocê foi convidado a fazer parte de uma rede de relacionamento, exclusivo para casais, solteiros e solteiras. FOURSOME foi criado com o objetivo de aproximar pessoas com o mesmo pensamento de relacionamento de forma livre, segura e respeitosa. %0A%0AEsse convite é valido por 10 dias e intransferível. %0A%0APara criar seu perfil agora, acesse: %0A e Utilize o Código: ${code} %0A%0AEm caso de dúvida, fale conosco. %0AContato@foursome.com.br %0A%0AFOURSOME https://www.foursome.com.br`

        //setCode(user.id.substring(0, 6))

        console.log(`Code: ${user.id.substring(0, 6)}, Nome: ${name}, Email: ${email}, Telefone: ${phone},
        isAccount: ${user.id}, username: ${user.username}, nickname: ${userInformation.nickname}, avatar: ${userInformation.avatar}`);


        //CreateInviteNewUsew({inviteCode: code, name, email, phone})

        window.open("https://api.whatsapp.com/send?phone=55"+ phone + "&text=" + text,
        '_blank')

    }
       async function handleGenerateUrl (e) {

        e.preventDefault();
           await fetch(`https://cutt.ly/api/api.php?key=024da38b6a7d96441616ae8290d93ba0ef9ff&short=https://localhost:3000/signup/${email}&name=foursome`)
           .then(async res => {
               const link = await res.json();
               console.log(link)
           })
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
                                   <form action="">
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefone"/>

                                        <button onClick={handleGenerateUrl}> Enviar Convite</button>
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