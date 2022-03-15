import logoFoursomemini from '../../assets/images/logo-mini2.png';
import logoFoursome from '../../assets/images/logo2.png';
import {FiMail, FiLogOut, FiInfo} from 'react-icons/fi';
import avatarImg from '../../assets/images/avatar.png';
import './topBar.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';
import ReactTooltip from 'react-tooltip';


import { SearchUsers } from '../ButtonsTopBar/SearchUsers/SearchUsers';
import { SolicitationsFriend } from '../ButtonsTopBar/SolicitationsFriend/SolicitationsFriend';
import { Notifications } from '../ButtonsTopBar/Notifications/Notifications';
import { MyMessages } from '../ButtonsTopBar/MyMessages/MyMessages';

function TopBar() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);

    function Tologout(e) {
        e.preventDefault();
        logout(user.id)
    }


     return (
        <div className="topBar">
            <div className="logo">
                <a href="/feed">
                <img src={logoFoursome} alt="" />
                </a>
            </div>
            <div className="logo2">
                  <a href="/feed">
                <img src={logoFoursomemini} alt="" />
                </a>
            </div>

            <SearchUsers />
  
            <div className="links">


                <SolicitationsFriend />
                <Notifications /> 

                <a href="/invite">
                <div className="link" data-tip data-for='Convidar'>
                    <FiMail />
                </div>
                </ a>
                <ReactTooltip id='Convidar' place="bottom" type="dark" effect="solid">
                     <span>Convidar</span>
                </ReactTooltip>


                <MyMessages />


                <div className="link" data-tip data-for='Sair'>
                    <FiLogOut onClick={Tologout} />
                </div>
                <ReactTooltip id='Sair' place="bottom" type="dark" effect="solid">
                     <span>Sair</span>
                </ReactTooltip>
                <div className="account">
                    <a href="/profile">
                        <div className="avatar">
                    <img src={userInformation !== null ? userInformation.avatar : avatarImg} alt="" />
                    </div>
                    </a>
                    <a href="/profile">
                    <h4>@{user !== null ? user.username : "Usuário não encontrado"}</h4>
                    </a>
                </div>
                <a href="/invite">
                <div className="link" data-tip data-for='Informações'>
                    <FiInfo />
                </div>
                </a>
                <ReactTooltip id='Informações' place="bottom" type="dark" effect="solid">
                     <span>Informações</span>
                </ReactTooltip>
                
            </div>
           

        </div>


    )
}

export {TopBar}