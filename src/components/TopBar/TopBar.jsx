import logoFoursome from '../../assets/images/logo2.png'
import { FiSearch, FiMessageSquare, FiUserPlus, FiBell, FiMail, FiLogOut } from 'react-icons/fi'
import avatarImg from '../../assets/images/avatar.png'
import './topBar.css'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/Auth';

function TopBar() {
    const {user} = useContext(AuthContext);
    useEffect((user) => {
       function loadUser(user) {

            if(user) {
                console.log(user)
                return user
            }
        }

        loadUser(user)

    }, [user])
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
                    <FiLogOut />
                </div>
                <div className="account">
                    <img src={user !== null ? user.avatar : avatarImg} alt="" />
                        <h4>@{user !== null ? user.username : "Usuário não identificado"}</h4>
                </div>
            </div>
            <div className="chat">
                <FiMessageSquare />
            </div>

        </div>
    )
}

export {TopBar}