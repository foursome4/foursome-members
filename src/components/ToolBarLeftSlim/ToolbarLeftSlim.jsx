import { FiCalendar, FiHome, FiList, FiRadio, FiUserCheck, FiUsers, FiInfo } from "react-icons/fi"
import avatarImg from '../../assets/images/avatar.png';
import './toolbarLeftSlim.css'

function ToolbarLeftSlim () {
    const Local = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(Local);


    return (
        <div className="content-toolbar">
            <div className="ToolBarLeftSlim">
                <div className="image">
                <a href="/profile" >
                    <img src={userInformation !== null ? userInformation.avatar :avatarImg} alt="" />
                    </a>
                </div>
                <div className="tools">

                <a href="/feed" >
                 <button className="toolIcon" >
                        <FiHome size={20}/>Feed
                    </button>
                    </a>

                    <a href="/profile" >
                    <button className="toolIcon" >
                        <FiUserCheck size={20}/>Perfil
                    </button>
                    </a>
          
                    {/* <a href="/messages" >
                    <button className="toolIcon" >
                        <FiMail size={20}/>
                       Recados
                    </button>
                    </a> */}

                    {/* <a href="/ranking" >
                    <button className="toolIcon" >
                        <FiTrendingUp size={20}/>
                       Ranking
                    </button>
                    </a> */}

                    <a href="/groups" >
                    <button className="toolIcon" >
                        <FiUsers size={20}/>
                       Grupos
                    </button>
                    </a>

                    <a href="/foruns" >
                    <button className="toolIcon" >
                        <FiList size={20}/>
                       Fóruns
                    </button>
                    </a>

                    <a href="/events" >
                    <button className="toolIcon" >
                        <FiCalendar size={20}/>
                       Eventos
                    </button>
                    </a>
                    
                    <a href="/radar" >
                    <button className="toolIcon" >
                        <FiRadio size={20}/>
                       Radar
                    </button>
                    </a>
{/* 
                    <a href="/locals" >
                    <button className="toolIcon" >
                        <FiMapPin size={20}/>Locais
                    </button>
                    </a> */}

                    <a href="/infos" >
                    <button className="toolIcon" >
                        <FiInfo size={20}/>Infos
                    </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export {ToolbarLeftSlim}