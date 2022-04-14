import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { FiEye, FiEyeOff} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './signIn.css';

function SignIn() {

  const  {loginSession} = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordView, setPasswordView] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
      if(localStorage.getItem("foursome") !== null) {
        navigate("/feed")
      }
    },[navigate])

  function handleCreateAccount(e) {
    e.preventDefault();

    if(username === "") {
      toast.error("Favor preencher seu nome de usuário!")
    }
    if(password === "") {
      toast.error("Favor preencher sua senha!")
    }
    if(username.includes("@")) {
      toast.error("Favor utilizar seu nome de usuário!")
    }
   loginSession({username, password})
   console.log(username, password);
  }

  function handlePasswordView() {
    if(passwordView === false) {
      setPasswordView(true)
    } else {
      setPasswordView(false)
    }
  }

  return (
    <div className="content-Login">
      <div className="signIn">
      <div className="logo">
        <img src={logoImg} alt="Logo Foursome" />
        </div>
        <div className="form">
          <input type="text" placeholder="Nome de usuário" value={username.toLocaleLowerCase()} onChange={(e) => setUsername(e.target.value)}/>
          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>
          <div className="buttons">
          <button onClick={handleCreateAccount}> Entrar </button>
          </div>
          <div className="buttons">
            <a href="/recuperation"><p>ESQUECEI MINHA SENHA?</p></a>
            <a href="/recuperationuser"><p>ESQUECI MEU USUÁRIO</p></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export { SignIn }