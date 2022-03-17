import { TopBar } from "../../components/TopBar/TopBar"
import './invite.css'
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/Auth"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { FiCheck, FiMail, FiSend} from "react-icons/fi"
import { v4 as uuidv4} from 'uuid'
import { FaWhatsapp } from "react-icons/fa"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import api from "../../services/api"
import { toast } from "react-toastify"


function Invite() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [typeInvite, setTypeInvite] = useState("Email");
    const [myInvites, setMyInvites] = useState([])


    const {CreateInviteNewUsew, CreateInviteMail} = useContext(AuthContext);


    useEffect(() => {
      const idAccount = user.id
      async function loadInvites() {
        await api.get(`/invites/${idAccount}`).then((result) => {
          const data = result.data;
          console.log(result.data)
          setMyInvites(data)
        })
      }
      loadInvites()
    }, [user.id])

    function createInvite(e) {
        e.preventDefault();
        toast.info("Enviando convite. Aguarde...")

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


       CreateInviteMail({code, name, email, phone:newPhone, username: user.username, idAccount: user.id, patron: user.id, patronNickname:userInformation.nickname })

        setEmail("")
        setPhone("")
        setName("")
    }

    function createInviteWhatsapp(e) {
        e.preventDefault();
        toast.info("Enviando convite. Aguarde...")

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
      function handleInviteMyInvites(){
        setTypeInvite("Invites")
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
                                       </div>
                                    </div>

                                    <div className="buttons">
                                      <button onClick={handleInviteForEmail}>E-mail <FiMail /></button>
                                      <button onClick={handleInviteForWhatsapp}>Whatsapp <FaWhatsapp /></button>
                                      <button onClick={handleInviteMyInvites}>Enviados <FiSend /> </button>
                                    </div>
                                    <br />
                                    { typeInvite === "Email" ?
                                    <form action="">
                                      <span>Convite por e-mail</span>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                    <button onClick={createInvite}> Enviar Convite</button>
                                    <br />
                                    <br />
                                    <br />
                               </form>  
                                  :
                                  typeInvite === "Whatsapp" ?
                                    <form action="">
                                      <span>Convite por whatsapp</span>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                                     <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                    <input type="text" id="telefone" onKeyUp={mascaraFone} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(XX)XXXXX-XXXX"/>

                                    <button onClick={createInviteWhatsapp}> Enviar Convite</button>

                                    <br />
                                    <br />
                                    <br />
                               </form>  
                                :
                                typeInvite === "Invites" ?
                                myInvites.map((invite) => {
                                  return (
                                    <div className="inviteUnic" key={invite.email}>
                                      <h5><b>{invite.name}</b></h5>
                                      <h5>{invite.email !== "" ? invite.email : ""} </h5>
                                      <h5>{invite.phone !== "" ? invite.phone : ""}</h5>
                                      <button>Deletar</button> 
                                    
                                    </div>
                                  )
                                })
                                  :""
                                  
                                  }
                                   
                                
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