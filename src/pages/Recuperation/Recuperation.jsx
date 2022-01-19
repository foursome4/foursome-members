import { useContext, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';

import './recuperation.css';

function Recuperation() {
  const  {loginSession} = useContext(AuthContext)
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  // const number = "21971684632"

  function handleCreateAccount(e) {
    e.preventDefault();
    loginSession({login: login, password:password})
  }

  return (
    <div className="content">
      <div className="signIn">
      <div className="logo">
        <img src={logoImg} alt="Logo Foursome" />
        <h2>Seja bem-vindo de volta!</h2>
        <h2>Entre, a diversão está te esperando.</h2>
        </div>
        <div className="form">
          <div className="title">
            <h3>RECUPERAR SENHA</h3>
          </div>
          <input type="text" placeholder="Nome de usuário ou E-mail" value={login} onChange={(e) => setLogin(e.target.value)}/>
          <input type="text" placeholder="Telefone" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <div className="buttons">
          <button onClick={handleCreateAccount}> Recuperar </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export { Recuperation }