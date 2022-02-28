import { TopBar } from "../../components/TopBar/TopBar"
import './invite.css'
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/Auth"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { FiCheck, FiMail} from "react-icons/fi"
import { v4 as uuidv4} from 'uuid'
import { FaWhatsapp } from "react-icons/fa"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"


function Invite() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [typeInvite, setTypeInvite] = useState("All");


    const {CreateInviteNewUsew, CreateInviteMail} = useContext(AuthContext);

    function createInvite(e) {
        e.preventDefault();

        const remove1Paranteses = phone.replace('(', '')
        const remove2Paranteses = remove1Paranteses.replace(')', '')
        const removeSpace = remove2Paranteses.replace(' ', '')
        const removeTrace = removeSpace.replace('-', '')
        const newPhone = removeTrace;

        console.log(newPhone)
        const inviteCode = uuidv4()
       
        const code = inviteCode.substring(0, 4)

        console.log(`Code: ${code}, Nome: ${name}, Email: ${email}, Telefone: ${newPhone},
        isAccount: ${user.id}, username: ${user.username}, nickname: ${userInformation.nickname}, avatar: ${userInformation.avatar}`);


       CreateInviteNewUsew({code, name, email, phone:newPhone, username: user.username, idAccount: user.id, patron: user.id, patronNickname:userInformation.nickname })
       CreateInviteMail({code, name, email, phone:newPhone, username: user.username, idAccount: user.id, patron: user.id, patronNickname:userInformation.nickname })

       

        setEmail("")
        setPhone("")
        setName("")
    }

    function mascaraFone(event) {
        var valor = document.getElementById("telefone").attributes[0].ownerElement['value'];
        var retorno = valor.replace(/\D/g,"");
        retorno = retorno.replace(/^0/,"");
        if (retorno.length > 10) {
          retorno = retorno.replace(/^(\d\d)(\d{5})(\d{4}).*/,"($1) $2-$3");
        } else if (retorno.length > 5) {
          if (retorno.length === 6 && event.code === "Backspace") { 
            // necessário pois senão o "-" fica sempre voltando ao dar backspace
            return; 
          } 
          retorno = retorno.replace(/^(\d\d)(\d{4})(\d{0,4}).*/,"($1) $2-$3");
        } else if (retorno.length > 2) {
          retorno = retorno.replace(/^(\d\d)(\d{0,5})/,"($1) $2");
        } else {
          if (retorno.length !== 0) {
            retorno = retorno.replace(/^(\d*)/,"($1");
          }
        }
        document.getElementById("telefone").attributes[0].ownerElement['value'] = retorno;
      }

      function handleInviteForEmail(){
        setTypeInvite("Email")
      }
      function handleInviteForWhatsapp(){
        setTypeInvite("Whatsapp")
      }
      function handleInviteForEmailWhatsapp(){
        setTypeInvite("All")
      }
   
    return (
        <div className="content">
            <ToolbarLeftSlim />
            <BarBottomMenu />
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
                                        <h3>Olá, {userInformation.nickname}.<br />Antes de enviar um convite, verifique as seguintes informações</h3>
                                       <div className="roles">
                                       <p><FiCheck /> Certifique-se se seu convidado não faz parte de nossa rede.</p>
                                        <p><FiCheck /> O convite enviado é único, intransferível e válido por 10 dias.</p>
                                        <p><FiCheck /> Você se torna amplamente responsável pelos atos de seu convidado, podendo sofrer as mesmas punições que ele, em caso de má conduta.</p>
                                       </div>
                                    </div>

                                    <div className="buttons">
                                      <button onClick={handleInviteForEmailWhatsapp}>E-mail <FiMail /> &nbsp; & Whatsapp <FaWhatsapp /></button>
                                      <button onClick={handleInviteForEmail}>E-mail <FiMail /></button>
                                      <button onClick={handleInviteForWhatsapp}>Whatsapp <FaWhatsapp /></button>
                                    </div>
                                    {typeInvite === "All" ?
                                    <form action="">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                    <input type="text" id="telefone" onKeyUp={mascaraFone} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(XX)XXXXX-XXXX"/>

                                    <button onClick={createInvite}> Enviar Convite</button>
                               </form>  
                                  :
                                  typeInvite === "Email" ?
                                    <form action="">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                    <input type="text" id="telefone" onKeyUp={mascaraFone} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(XX)XXXXX-XXXX"/>

                                    <button onClick={createInvite}> Enviar Convite</button>
                               </form>  
                                  :
                                  typeInvite === "Whatsapp" ?
                                    <form action="">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                    <input type="text" id="telefone" onKeyUp={mascaraFone} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(XX)XXXXX-XXXX"/>

                                    <button onClick={createInvite}> Enviar Convite</button>
                               </form>  
                                  :""
                                  
                                  }
                                   
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