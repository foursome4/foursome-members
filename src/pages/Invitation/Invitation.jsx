
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import './invitation.css'
import logo from '../../assets/images/logo.png'
import { v4 as uuidv4} from 'uuid'
import { FiCheckCircle } from 'react-icons/fi'
import { set } from 'date-fns'

function Invitation() {
    const {logout, CreateInviteNewUsew} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


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


       CreateInviteNewUsew({code, name, email, phone:newPhone, username: user.username, idAccount: user.id, patron: user.id, patronNikcname:userInformation.nickname })

       

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
   

    return (
        <div className="content">
            <div className="invitation">
                <div className="title">
                    <img src={logo} alt="" />
                    <h2>Convide um novo amigo! </h2>

                    <h3>Enquanto não lançamos, traga seus amigos e se divirta com a gente!</h3>
                    </div>
                    <form action="">

                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                    <input type="text" id="telefone" onKeyUp={mascaraFone} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(XX)XXXXX-XXXX"/>

                    </form>

                <div className="button">
                <button className="convite" onClick={createInvite}>Convidar!</button>
                <button  onClick={logout}>Sair</button>
                </div>    
            </div>
        </div>
    )
}

export {Invitation}