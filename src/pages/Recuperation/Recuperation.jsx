import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

import './recuperation.css';

function Recuperation() {
  const  {gerateCodeRecuperation} = useContext(AuthContext)
  const [email, setEmail] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
      if(localStorage.getItem("foursome") !== null) {
        navigate("/loader")
      }
    },[navigate])


  function handleCreateCodeRecuperation(e) {
    e.preventDefault();
    const generateCode = uuidv4()
    const code = generateCode.substring(0, 6)
   gerateCodeRecuperation(email, code)
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
            <h3>DIGITE SEU E-MAIL DE CADASTRO</h3>
          </div>
          <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <div className="buttons">
          <button onClick={handleCreateCodeRecuperation}> Gerar código </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export { Recuperation }