import './suspenseAccount.css'
import logo from '../../assets/images/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';

function SuspenseAccount() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    function Tologout(e) {
        e.preventDefault();
        logout(user.id)
    }

    function handleRedirectToActivate(e) {
        e.preventDefault();
    
        window.open("/activeplain", "_self")
    }
    function HandleRedirectFeed(e) {
        e.preventDefault();
    
        window.open("/feed", "_self")
    }

    return (
        <div className="content-SuspenseAccount">
            <div className="SuspenseAccount">
            <br />
                    <br />
                <div className="title">
                    <img src={logo} alt="" />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h2>Olá, {user.username}</h2>
                    <h2>Sua conta está suspensa</h2>
                    <h3>Seu acesso foi bloqueado. aguarde 24h para acessar novamente <br /> Ou Assine nosso plano e tenha acesso total a nosso site</h3>
                    <br />
                    <br />
                    <br />
                    <div className="orientations">
                    <br /><br />
                    <h4><b>Qualquer problema ou dúvida. Entra em conato:</b></h4>
                    <h4><b>Whatsapp</b> (22)99791-0510</h4>
                    <h4><b>E-mail:</b> contato@foursome.com.br</h4>
                    </div>
                </div> 
                <div className="buttons">
                <button className="btn1" onClick={handleRedirectToActivate}>Ativar meu plano</button>
                <button onClick={Tologout}>Sair</button>
                </div>
                    <br />
                    <br />
                <br />
                    <br />           
                <br />
                    <br />                    <br />
                    <br />
            </div>
        </div>
    )
}

export {SuspenseAccount}


