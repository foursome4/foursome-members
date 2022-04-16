import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';

import './recoverPassword.css';

function RecoverPassword() {
  const  {} = useContext(AuthContext)
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
      if(localStorage.getItem("foursome") !== null) {
        navigate("/loader")
      }
    },[navigate])


  function handleCreateAccount(e) {
    e.preventDefault();
    
  }

  return (
    <div className="content-Login">
      <div className="signIn">
      <div className="logo">
        <img src={logoImg} alt="Logo Foursome" />
        <br />
        </div>
        <div className="form">
          <div className="title">
            <h3>ALTERAR SENHA</h3>
          </div>
          <input type="text" placeholder="Nova senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type="text" placeholder="Confirme a nova senha" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>

          <div className="buttons">
          <button onClick={handleCreateAccount}> Alterar senha </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export { RecoverPassword }