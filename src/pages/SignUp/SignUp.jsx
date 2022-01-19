import { useContext, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { useParams } from 'react-router';

import './signUp.css';

function SignUp() {
  const {email} = useParams()
  const  {createAccount} = useContext(AuthContext)
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passordConfirm, setPassordConfirm] = useState("");
  const [checked, setChecked] = useState(false)

  function handleCreateAccount(e) {
    e.preventDefault();
    const status = "test"; // Test = 7 Dias -- Active = Palno Ativo/Pago -- Bloqued = Plano Bloqueado/ Não pago-expirado -- Banned 
    const role = "member";

    if(checked) {
      createAccount(nickname, username, emailUser, phone, passordConfirm, password, status, role)
      console.log(nickname, username, email, phone, passordConfirm, password, status, role)
    } else {
      alert("Favor, confirmar a leitura do termo de uso")
    }
  }

  function handleChange(e) {
    setChecked(true)
  }
  return (
    <div className="content">
      <div className="signUp">
        <div className="logo">
        <img src={logoImg} alt="Logo Foursome" />
        <h2>Seja bem-vindo!</h2>
        <h3>Realize seu cadastro e aproveite tudo que preparamos.</h3>
        </div>
        <div className="form">
        <div className="title">
            <h3>CADASTRE-SE</h3>
          </div>
          <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmailUser(e.target.value)} disabled/>
          <input type="text" placeholder="Código de verificação" value={code} onChange={(e) => setCode(e.target.value)} />
          <input type="text" placeholder="Nome de exibição" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="tel" placeholder="Telefone" pattern="([0-9]{2})[0-9]{5}-[0-9]{4}" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type="password" placeholder="Confirmar senha" value={passordConfirm} onChange={(e) => setPassordConfirm(e.target.value)}/>

          <div className="terms">
          <input type="checkbox" checked={checked} onChange={handleChange}/>
          <span>Li e concordo com os <strong>Termos de uso</strong></span>
          </div>

          <div className="buttons">
          <button onClick={handleCreateAccount}> Cadastrar </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export { SignUp }

       