import logoFoursome from '../../assets/images/logo2.png'
import { FiSearch, FiMessageSquare, FiUserPlus, FiBell, FiMail, FiLogOut } from 'react-icons/fi'
import avatarImg from '../../assets/images/avatar.png'
import './topBar.css'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';

function TopBar() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);
  

    function Tologout(e) {
        e.preventDefault();
        logout()
    }

    return (
        <div className="topBar">
            <div className="logo">
                <img src={logoFoursome} alt="" />
            </div>
            <div className="search">
                <FiSearch />
                <input type="text" />
            </div>
            <div className="links">
                <div className="link">
                    <FiUserPlus />
                </div>
                <div className="link">
                    <FiBell />
                </div>
                <div className="link">
                    <FiMail />
                </div>
                <div className="link">
                    <FiLogOut onClick={Tologout} />
                </div>
                <div className="account">
                    <img src={userInformation !== null ? userInformation.avatar : avatarImg} alt="" />
                        <h4>@{user !== null ? user.username : "Usuário não encontrado"}</h4>
                </div>
            </div>
            <div className="chat">
                <FiMessageSquare />
            </div>

        </div>
    )
}

export {TopBar}