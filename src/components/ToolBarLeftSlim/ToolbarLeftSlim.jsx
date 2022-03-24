import { IoCalendarOutline, IoList, IoRadio, IoPersonOutline, IoPeopleOutline, IoBusinessOutline,
    IoInformationCircleOutline, IoNewspaperOutline, IoMailOpenOutline } from "react-icons/io5"

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
                        <IoNewspaperOutline size={20}/>Feed
                    </button>
                    </a>

                    <a href="/profile" >
                    <button className="toolIcon" >
                        <IoPersonOutline size={20}/>Perfil
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
                        <IoPeopleOutline size={20}/>
                       Grupos
                    </button>
                    </a>

                    <a href="/foruns" >
                    <button className="toolIcon" >
                        <IoList size={20}/>
                       Fóruns
                    </button>
                    </a>

                    <a href="/events" >
                    <button className="toolIcon" >
                        <IoCalendarOutline size={20}/>
                       Eventos
                    </button>
                    </a>
                    
                    <a href="/radar" >
                    <button className="toolIcon" >
                        <IoRadio size={20}/>
                       Radar
                    </button>
                    </a>
                    <a href="/invitelist" >
                    <button className="toolIcon" >
                        <IoMailOpenOutline size={20}/>
                       Enviados
                    </button>
                    </a>

                    <a href="/locals" >
                    <button className="toolIcon" >
                        <IoBusinessOutline size={20}/>Locais
                    </button>
                    </a>

                    <a href="/infos" >
                    <button className="toolIcon" >
                        <IoInformationCircleOutline size={20}/>Infos
                    </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export {ToolbarLeftSlim}