 
import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { FiEye, FiEyeOff} from 'react-icons/fi';
import { IoLogoWhatsapp} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


import './signIn.css';

function SignIn() {

  const  {loginSession} = useContext(AuthContext)
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordView, setPasswordView] = useState(false)
  const [never, setNever] = useState(false)
  const navigate = useNavigate();

  const text = `Olá, queremos saber mais sobre como ingressar em sua rede social`
  const phone = "22997910510"

  useEffect(() => {
      if(localStorage.getItem("foursome") !== null) {
        navigate("/feed")
      }
    },[navigate])


  function handleCreateAccount(e) {
    e.preventDefault();
   loginSession({login: login, password:password})
   console.log({login: login, password:password});
  }

  function handlePasswordView() {
    if(passwordView === false) {
      setPasswordView(true)
    } else {
      setPasswordView(false)
    }
  }

  function handleInviteWhatsapp() {
    window.open("/signup", "_self")
  }

  let never1 = false
  if(login.includes(" ")) {
    never1 = true
  }

  return (
    <div className="content-Login1">
      <div className="signIn">
      <div className="logo">
        <img src={logoImg} alt="Logo Foursome" />
        </div>
        <div className="form">
          <input type="text" placeholder="E-mail ou Nome de usuário" value={login} onChange={(e) => setLogin(e.target.value)}/>
          {never1 === true ? <h6>Favor remover os espaços vazios no campo login</h6> : ""}
          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>
          <div className="buttons">
            <button onClick={handleCreateAccount}> Entrar </button>

          </div>
          <div className="links">
          <a href="/recuperation"><p> ESQUECI MINHA SENHA</p></a>
            <a href="/recuperationuser"><p> ESQUECI MEU USUÁRIO</p></a>
          </div>

          <div className="whatsapp" onClick={handleInviteWhatsapp}>
             <h4><b>Não tem conta? </b> <a href="/signup">Clique aqui e cadastre-se</a></h4>
          </div>
          {/* <div className="whatsapp" onClick={handleInviteWhatsapp}>
            <h4> Família Foursome! <br />Nosso site estará de volta à partir das 13h desta segunda-feira 18/07/2022. </h4>
          </div> */}
          {/* <div className="register">
          <h4><b>Não tem conta? </b> <a href="/signup">Clique aqui e cadastre-se</a></h4>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export { SignIn }