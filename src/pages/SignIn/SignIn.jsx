 
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
    window.open("https://wa.me/55"+ phone + "?text=" + text,
    '_blank')
  }

  function handleSignUp() {
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
          {never1 === true ? <h5>Favor remover os espaços vazios no campo login</h5> : ""}
          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>

          <div className="infoavatar">
                            <h5><b>Verifique seu e-mail e senha!</b></h5>
                            <h6><b>Certifique-se que está escrevendo conforme cadastrado:</b> </h6>
                            <h6>- 70% dos erros de login são por e-mail e senha com letras maiúsculas incorratente.</h6>
                        </div>


          <div className="buttons">
            <button onClick={handleCreateAccount}> Entrar </button>

          </div>
          <div className="links">
          <a href="/recuperation"><p> ESQUECI MINHA SENHA</p></a>
            <a href="/recuperationuser"><p> ESQUECI MEU USUÁRIO</p></a>
          </div>

          {/* <div className="whatsapp" onClick={handleSignUp}>
             <h4><b>Não tem conta? </b> Clique aqui e cadastre-se</h4>
          </div> */}
          <div className="whatsapp2" onClick={handleInviteWhatsapp}>
            <h4> Entre em contato <IoLogoWhatsapp /></h4>
          </div>
          {/* <div className="register">
          <h4><b>Não tem conta? </b> <a href="/signup">Clique aqui e cadastre-se</a></h4>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export { SignIn }