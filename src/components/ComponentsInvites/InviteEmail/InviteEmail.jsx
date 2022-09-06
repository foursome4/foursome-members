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
    const [type, setType] = useState("");



    function handleSetectType(e) {
        setType(e.target.value)
        console.log(e.target.value)
      }
    
    
    function createInvite(e) {
        e.preventDefault();
        toast.info("Enviando convite. Aguarde...")

      const inviteCode = uuidv4()
       
        const code = inviteCode.substring(0, 4)


        if(name === "") {
            toast.error("Preencha o nome")
        }
        if(email === "") {
            toast.error("Preencha o e-mail")
        }
        if(type === "") {
            toast.error("Preencha o tipo de conta")
        }

        console.log(`Code: ${code}, Nome: ${name}, Email: ${email},
        isAccount: ${user.id}, username: ${user.username}, nickname: ${userInformation.nickname}, avatar: ${userInformation.avatar}`);


       CreateInviteMail({code, name, email, phone: "Undefined", username: user.username, idAccount: user.id, patron: user.id, patronNickname:userInformation.nickname, type })

        setEmail("")
        setName("")
        setType("")
    }

    let never1 = false
    if(email.includes(" ")) {
      never1 = true
    }

    const letra = email.substring(0, 1)

 return (   <>
       <form action="">
            <span>Envie um convite por e-mail</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            {never1 === true ?
            <div className="alert2">
                <h5>Favor remover os espaços vazios no campo login</h5> 
                </div>
                : ""}
                
            {email.includes('@') ? "" :
                            <div className="alert">
                                <h5>Seu Email deve conter o @</h5>
                            </div>
          }
          {  letra === "" ? "" : letra === letra.toUpperCase() && never1 === false ? 
           <div className="alert2">
           <h5>A primeira letra do seu e-mail está maiúscula. Isso está certo? <br /> Caso esteja correto prossiga tranquilamente. Este é apenas um alerta</h5>
       </div>:
        email === email.toUpperCase() && never1 === false ? 
        <div className="alert2">
        <h5>Seu e-mail contém letra maiúscula. Isso está certo?</h5>
    </div> :
                           ""
          }
            
            <select className={type === "" ? "" : "active"} value={type} onChange={handleSetectType}>
                <option value="">Tipo de conta</option>
                <option value="Homem">Homem </option>
                <option value="Mulher">Mulher </option>
                <option value="Casal">Casal </option>
                <option value="Trisal">Trisal </option>
                <option value="Transex">Transex </option>
                <option value="Travestis">Travestis </option>
            </select>

            <button onClick={createInvite}> Enviar Convite</button>
            <br />
            <br />
            <br />
        </form>  
    </>
    )
}

export {InviteEmail}