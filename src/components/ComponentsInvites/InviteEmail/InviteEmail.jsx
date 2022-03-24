import './inviteEmail.css'
import { toast } from "react-toastify"
import { v4 as uuidv4} from 'uuid'
import { AuthContext } from "../../../contexts/Auth"
import {useContext, useState} from 'react'

function InviteEmail() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);


    const {CreateInviteMail} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
    function createInvite(e) {
        e.preventDefault();
        toast.info("Enviando convite. Aguarde...")

      const inviteCode = uuidv4()
       
        const code = inviteCode.substring(0, 4)

        console.log(`Code: ${code}, Nome: ${name}, Email: ${email},
        isAccount: ${user.id}, username: ${user.username}, nickname: ${userInformation.nickname}, avatar: ${userInformation.avatar}`);


       CreateInviteMail({code, name, email, phone: "Undefined", username: user.username, idAccount: user.id, patron: user.id, patronNickname:userInformation.nickname })

        setEmail("")
        setName("")
    }

 return (   <>
       <form action="">
            <span>Envie um convite por e-mail</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            <button onClick={createInvite}> Enviar Convite</button>
            <br />
            <br />
            <br />
        </form>  
    </>
    )
}

export {InviteEmail}