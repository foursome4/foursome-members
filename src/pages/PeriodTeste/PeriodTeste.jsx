import './periodTeste.css'
import { parseISO, format} from 'date-fns';
import logo from '../../assets/images/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';

function PeriodTeste() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    function handleRedirectTo(e) {
        e.preventDefault();
        window.open("/feed","_self");
    }

    const time = `${new Date().getDate()}/${new Date().getMonth() +1}/${new Date().getFullYear()} - ${new Date().getHours()}:${new Date().getMinutes()}`;
    const timeLimit = `${new Date().getDate()}/${new Date().getMonth() +1}/${new Date().getFullYear()} - ${new Date().getHours()}:${new Date().getMinutes() +15}`;
    const meuHorário = "11/8/2022 - 20:45"
    console.log(time)
    console.log(timeLimit)
    console.log(time < timeLimit ? "Ainda pode usar" : "Tempo esgotado")

    return (
        <div className="content-PeriodTeste">
            <div className="PeriodTeste">
            <br />
                    <br />
                <div className="title">
                    <img src={logo} alt="" />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h2>Bem vindo a Foursome.</h2>
                    <br />
                    <h3>Você está no período de utilização diário de 5 minutos para utilizar o nosso site com limites,<br />
                    após este período você deverá aguardar 24h para ter novamente o acesso ou <br /> assine um de nossos planos para utilizar todas as funcionalidades do site</h3>
                    <br />
                    <div className="text">
                    <h3>No período de teste você pode:</h3>
                    <h4>- Ver apenas o feed</h4>
                    <h4>- Ver os recados</h4>
                    <h4>- Postar uma foto</h4>
                    <h4>- Curtir fotos</h4>
                    </div>
                    <br />
                    <br />
                    <div className="orientations">
                    <br /><br />
                    <h4><b>Qualquer problema ou dúvida. Entre em conato:</b></h4>
                    <h4><b>Whatsapp</b> (22)99791-0510</h4>
                    <h4><b>E-mail:</b> contato@foursome.com.br</h4>
                    </div>
                </div> 
                <br />
                <button onClick={handleRedirectTo}>Iniciar meu teste</button>
                    <br />
                    <br />
                <br />
                    <br />
                <br />

            </div>
        </div>
    )
}

export {PeriodTeste}