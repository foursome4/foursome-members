import logoFoursomemini from '../../assets/images/logo-mini2.png'
import logoFoursome from '../../assets/images/logo2.png'
import { FiSearch, FiMessageSquare, FiUserPlus, FiBell, FiMail, FiLogOut } from 'react-icons/fi'
import avatarImg from '../../assets/images/avatar.png'
import './topBar.css'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { Link } from 'react-router-dom';

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
                <Link to="/feed">
                <img src={logoFoursome} alt="" />
                </Link>
            </div>
            <div className="logo2">
                  <Link to="/feed">
                <img src={logoFoursomemini} alt="" />
                </Link>
            </div>
            <div className="search">
                <FiSearch />
                <input type="text" />
            </div>
            <div className="links">
                <Link to="/invite">
                <div className="link">
                    <FiUserPlus />
                </div>
                </ Link>
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
                    <Link to="/profile">
                        <div className="avatar">
                    <img src={userInformation !== null ? userInformation.avatar : avatarImg} alt="" />
                    </div>
                    </Link>
                    <Link to="/profile">
                    <h4>@{user !== null ? user.username : "Usuário não encontrado"}</h4>
                    </Link>
                </div>
            </div>
            <div className="chat">
                <FiMessageSquare />
            </div>
 

        </div>
    )
}

export {TopBar}