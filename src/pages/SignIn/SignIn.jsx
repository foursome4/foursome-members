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
            <p>ESQUECI MINHA SENHA</p>
            <p>ESQUECI MEU NOME DE USUÁRIO</p>
          </div>
          <div className="buttons">
          <button onClick={handleCreateAccount}> Entrar </button>
          {/* <a href={`https://api.whatsapp.com/send?phone=55${number}&text=Parabens!!

Você foi convidado a fazer parte de uma rede de relacionamento, exclusivo para casais, solteiros e solteiras. FOURSOME foi criado com o objetivo de aproximar pessoas com o mesmo pensamento de relacionamento de forma livre, segura e respeitosa.

Esse convite é valido por 10 dias e intransferível.

Para criar seu perfil agora, acesse:
bitly.abt56.com
Em caso de dúvida, fale conosco.
Contato@foursome.com.br -- 
FOURSOME https://www.foursome.com.br`} target="_blank">Convidar</a> */}

          </div>
        </div>
      </div>
    </div>
  )
}

export { SignIn }