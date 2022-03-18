
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

    function createInviteWhatsapp(e) {
        e.preventDefault();
        if(phone.length !== 11) {
            console.log(phone)
            toast.error("Telefone incorreto. siga a instrução DDD + Número")
            return
        }
        toast.info("Enviando convite. Aguarde...")
        const inviteCode = uuidv4();     
        const code = inviteCode.substring(0, 4)

       CreateInviteNewUsew({code, name, email, phone, username: user.username, idAccount: user.id, patron: user.id, patronNickname:userInformation.nickname })

        setEmail("")
        setPhone("")
        setName("")
    }
    return (
        <>
        <form action="">
                <span>Convite por whatsapp</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                <input type="text" id="telefone"  value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ex.: 21999888899"/>

                <button onClick={createInviteWhatsapp}> Enviar Convite</button>

                <br />
                <br />
                <br />
        </form> 
        </>
    )
}

export { InviteWhatsapp }