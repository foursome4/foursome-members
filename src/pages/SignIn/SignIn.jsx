import { useContext, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';

import './signIn.css';

function SignIn() {
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
            <h3>LOGIN</h3>
          </div>
          <input type="text" placeholder="E-mail ou Nome de usuário" value={login} onChange={(e) => setLogin(e.target.value)}/>
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <div className="recuperation">
            <a href="/recuperation"><p> ESQUECI MINHA SENHA</p></a>
            <a href="/forgotit"><p>ESQUECI MEU NOME DE USUÁRIO</p></a>
          </div>
          <div className="buttons">
          <button onClick={handleCreateAccount}> Entrar </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export { SignIn }