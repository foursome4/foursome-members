import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './signUp.css';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { v4 as uuidv4} from 'uuid'
import { mask as masker, unMask } from "remask";
 
function SignUp() {
  const {email, code, patron, type} = useParams()
  const  {createAccount} = useContext(AuthContext)
  const [usernameNative, setUsernameNative] = useState("");
  const [newPhone, setPhone] = useState("");
  const [passwordNative, setPasswordNative] = useState("");
  const [passwordConfirmNative, setPasswordConfirmNative] = useState("");
  const [passwordView, setPasswordView] = useState(true)
  const [checked, setChecked] = useState(false);



  const navigate = useNavigate();

  useEffect(() => {
      if(localStorage.getItem("foursome") !== null) {
        navigate("/feed")
      }
  },[navigate])


  function handleCreateAccount(e) {
    e.preventDefault();

    const status = "active"; // Test = 7 Dias -- Active = Palno Ativo/Pago -- Bloqued = Plano Bloqueado/ Não pago-expirado -- Banned 
    const role = "Membro";
    const online = false;


    const remove1Paranteses = newPhone.replace('(', '')
    const remove2Paranteses = remove1Paranteses.replace(')', '')
    const removeSpace = remove2Paranteses.replace(' ', '')
    const removeTrace = removeSpace.replace('-', '')
    const phone = removeTrace;

   if(newPhone === "") {
    toast.error("Favor preencher o telefone")
   }
   if(type === "") {
    toast.error("Favor selecionar o tipo de conta")
   }
   if(usernameNative === "") {
    toast.error("Favor preencher o nome de usuário")
   }
   if(passwordNative === "") {
    toast.error("Favor preencher a senha")
   }

    if(checked) {
      if(passwordConfirmNative === passwordNative) {
        toast.info("Salvando informações. Aguarde...")
          const username = usernameNative.replace(/( )+/g, "")
          const password = passwordNative.replace(/( )+/g, "");

          const idGenerate = uuidv4();
          const id = idGenerate.substring(0, 6);

         createAccount(id, username.toLowerCase(), email, phone, type, password, status, role, code, online, patron)
          console.log( id, username.toLowerCase(), email, phone, type, password, status, role, code, online, patron)
        } else {
          toast.error("As senhas não combinam!")
        }
    } else {
      toast.error("Favor, confirmar a leitura do termo de uso")
    }
  }

  function handleChange(e) {
    setChecked(true)
  }

  function handlePasswordView() {
    if(passwordView === false) {
      setPasswordView(true)
    } else {
      setPasswordView(false)
    }
  }


  function ChangeMask(e) {
    const originalValue = unMask(e.target.value);
    const maskedValue = masker(originalValue, [
      "S",
      "SS",
      "SSS",
      "SSSS",
      "SSSSS",
      "SSSSSS",
      "SSSSSSS",
      "SSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSSS",
      "SSSSSSSSSSSS",
      "SSSSSSSSSSSSS",
      "SSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    ]);

    setUsernameNative(maskedValue)
  }
  function ChangeMaskPhone(e) {
    const originalValue = unMask(e.target.value);
    const maskedValue = masker(originalValue, [
      "(99)99999-9999",
      "(99)99999-999",
    ]);

    setPhone(maskedValue)
  }
  function ChangeMaskPassword(e) {
    const originalValue = unMask(e.target.value);
    const maskedValue = masker(originalValue, [
      "S",
      "SS",
      "SSS",
      "SSSS",
      "SSSSS",
      "SSSSSS",
      "SSSSSSS",
      "SSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSSS",
      "SSSSSSSSSSSS",
      "SSSSSSSSSSSSS",
      "SSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    ]);

    setPasswordNative(maskedValue)
  }
  function ChangeMaskConfirmPassword(e) {
    const originalValue = unMask(e.target.value);
    const maskedValue = masker(originalValue, [
      "S",
      "SS",
      "SSS",
      "SSSS",
      "SSSSS",
      "SSSSSS",
      "SSSSSSS",
      "SSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSSS",
      "SSSSSSSSSSSS",
      "SSSSSSSSSSSSS",
      "SSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    ]);

    setPasswordConfirmNative(maskedValue)
  }



  return (
    <div className="content-Login">
      <div className="signUp">
        <div className="logo">
        <img src={logoImg} alt="Logo Foursome" />
        <h2>Seja bem-vindo!</h2>
        <h3>Realize seu cadastro e aproveite tudo que preparamos.</h3>
        </div>
        <div className="form">
        <div className="title">
            <h3>CADASTRE-SE</h3>
          </div>
          <div className="titleInput">
          <p>Meu email:</p>
          </div>
          <input type="text" placeholder="E-mail" value={email} disabled/>

          <div className="titleInput">        
          <p>Código do patrono:</p>
            </div>
          <input type="text" placeholder="Id do Patrono" value={patron} disabled/>


          <div className="titleInput">
          <p>Tipo de conta:</p>
          </div>
          <input type="text" placeholder="Tipo de conta" value={type} disabled/>

          <div className="titleInput">
          <p>O nome de usuário deve ser todo junto, minúsculo e sem espaço.</p>
          </div>
          <input type="text" placeholder="Nome de usuário (Junto e sem espaço)" value={usernameNative.toLowerCase()} onChange={ChangeMask}/>
         
          <div className="titleInput">
          <p>Telefone:</p>
          </div>
          <input type="text" value={newPhone} onChange={ChangeMaskPhone} placeholder="(XX)XXXXX-XXXX"/>

          <div className="titleInput">
          <p>Senha:</p>
          </div>
          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Senha" value={passwordNative} onChange={ChangeMaskPassword}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>

          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Confirmar senha" value={passwordConfirmNative} onChange={ChangeMaskConfirmPassword}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>


          <div className="terms">
          <input type="checkbox" checked={checked} onChange={handleChange}/>
          <p>Li e concordo com os<b><a href="/lgpd" target="_blank">Termos de uso</a></b></p>
          </div>

          <div className="buttons">
          <button onClick={handleCreateAccount}> Cadastrar </button>
          </div>
        </div>

        
      </div>
    </div>
  )
}


export { SignUp }

       