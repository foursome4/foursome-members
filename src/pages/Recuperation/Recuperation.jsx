import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';

import './recuperation.css';

function Recuperation() {
  const  {loginSession} = useContext(AuthContext)
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  // const number = "21971684632"

  const navigate = useNavigate();

  useEffect(() => {
      if(localStorage.getItem("foursome") !== null) {
        navigate("/feed")
      }
  })


  function handleCreateAccount(e) {
    e.preventDefault();
    loginSession({login: login, password:password})
  }

  return (
    <div className="content">
      <div className="signIn">
      <div className="logo">
        <img src={logoImg} alt="Logo Foursome" />
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