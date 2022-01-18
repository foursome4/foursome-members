import logoFoursome from '../../assets/images/logo2.png'
import { FiSearch, FiMessageSquare, FiUserPlus, FiBell, FiMail } from 'react-icons/fi'
import avatarImg from '../../assets/images/avatar.png'
import './topBar.css'

function TopBar() {
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
                <div className="account">
                    <img src={avatarImg} alt="" />
                    <h4>@jefersonmmacedo</h4>
                </div>
            </div>
            <div className="chat">
                <FiMessageSquare />
            </div>

        </div>
    )
}

export {TopBar}