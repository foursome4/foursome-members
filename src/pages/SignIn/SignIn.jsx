import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { FiEye, FiEyeOff} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


import './signIn.css';

function SignIn() {

  const  {loginSession} = useContext(AuthContext)
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordView, setPasswordView] = useState(false)
  const navigate = useNavigate();

  // useEffect(() => {
  //     if(localStorage.getItem("foursome") !== null) {
  //       navigate("/feed")
  //     }
  //   },[])


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


  return (
    <div className="content-Login">
      <div className="signIn">
      <div className="logo">
        <img src={logoImg} alt="Logo Foursome" />
        </div>
        <div className="form">
          <input type="text" placeholder="E-mail ou Nome de usuário" value={login.toLowerCase()} onChange={(e) => setLogin(e.target.value)}/>
          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>
          <div className="buttons">
          <button onClick={handleCreateAccount}> Entrar </button>
            <a href="/recuperation"><p> ESQUECEU SUA SENHA?</p></a>
          </div>
        </div>
        {/* <div className="footer">
          <a href="https://www.codingit.com.br" target="_blank" rel="noreferrer">
            <img src={codingIt} alt="" />
          </a>
        </div> */}
      </div>








    </div>
  )
}

export { SignIn }