
import './inviteWhatsapp.css'
import { v4 as uuidv4} from 'uuid'
import { toast } from "react-toastify"
import { AuthContext } from "../../../contexts/Auth"
import {useContext, useState} from 'react'

function InviteWhatsapp() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);


    const {CreateInviteNewUsew} = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [type, setType] = useState("");


    function handleSetectType(e) {
      setType(e.target.value)
      console.log(e.target.value)
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

       CreateInviteNewUsew({code, name, email, phone:newPhone, username: user.username, idAccount: user.id, patron: user.id, patronNickname:userInformation.nickname, type })

        setEmail("")
        setPhone("")
        setName("")
        setType("")
    }
    return (
        <>
        <form action="">
                <span>Convite por whatsapp</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>

                <select className={type === "" ? "" : "active"} value={type} onChange={handleSetectType}>
                <option value="">Tipo de conta</option>
                <option value="Homem">Homem </option>
                <option value="Mulher">Mulher </option>
                <option value="Casal">Casal </option>
                <option value="Trisal">Trisal </option>
                <option value="Transex">Transex </option>
                <option value="Travestis">Travestis </option>
            </select>

                <input type="text" id="telefone"  onKeyUp={mascaraFone} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ex.: 21999888899"/>

                <button onClick={createInviteWhatsapp}> Enviar Convite</button>

                <br />
                <br />
                <br />
        </form> 
        </>
    )
}

export { InviteWhatsapp }