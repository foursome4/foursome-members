import { useContext, useEffect } from "react";
import { FiCalendar, FiHome, FiImage, FiList, FiMessageSquare, FiRadio, FiTrendingUp, FiUser, FiUsers, FiVideo } from "react-icons/fi"
import avatarImg from '../../assets/images/avatar.png'
import { AuthContext } from "../../contexts/Auth";
import './toolbarLeftSlim.css'

function ToolbarLeftSlim () {
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
        <div className="content-toolbar">
            <div className="ToolBarLeftSlim">
                <div className="profile">
                    <img src={user !== null ? user.avatar : avatarImg} alt="" />
                </div>
                <div className="tools">
                <div className="toolIcon">
                        <FiHome size={20}/>
                        <p>Feed</p>
                    </div>
                    <div className="toolIcon">
                        <FiVideo size={20}/>
                        <p>Vídeos</p>
                    </div>
                    <div className="toolIcon">
                        <FiUsers size={20}/>
                        <p>Grupos</p>
                    </div>
                    <div className="toolIcon">
                        <FiMessageSquare size={20}/>
                        <p>Chat</p>
                    </div>
                    <div className="toolIcon">
                        <FiTrendingUp size={20}/>
                        <p>Ranking</p>
                    </div>
                    <div className="toolIcon">
                        <FiImage size={20}/>
                        <p>Fotos</p>
                    </div>
                    <div className="toolIcon">
                        <FiUser size={20}/>
                        <p>Amigos</p>
                    </div>
                    <div className="toolIcon">
                        <FiList size={20}/>
                        <p>Fóruns</p>
                    </div>
                    <div className="toolIcon">
                        <FiRadio size={20}/>
                        <p>Radar</p>
                    </div><div className="toolIcon">
                        <FiCalendar size={20}/>
                        <p>Eventos</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {ToolbarLeftSlim}