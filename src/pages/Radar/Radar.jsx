import { ChatBar } from "../../components/ChatBar/ChatBar"
import { ToolBarLeft } from "../../components/ToolBarLeft/ToolBarLeft"
import { TopBar } from "../../components/TopBar/TopBar"
import avatarImg2 from '../../assets/images/avatar2.png'
import avatarImg3 from '../../assets/images/avatar3.png'
import avatarImg4 from '../../assets/images/avatar4.png'
import avatarImg5 from '../../assets/images/avatar5.png'
import avatarImg6 from '../../assets/images/avatar6.png'
import './radar.css'

function Radar() {
    return (
        <div className="content">
            <ToolBarLeft />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="foruns">
                            <div className="foruns-selected">
                                <button className="selected">Radar</button>
                            </div>
                            <div className="foruns-range">
                                <h4>0 km</h4>
                                <input type="range" />
                                <h4>1.000 km</h4>
                            </div>
                            <div className="foruns-all">
                                <div className="forun-unic">
                                    <img src={avatarImg2} alt="" className="profile"/>
                                    <h5>Juliana Morena</h5>
                                    <h6>+ 1km de você</h6>
                                    <button>Ver perfil</button>
                                </div>
                                <div className="forun-unic">
                                    <img src={avatarImg3} alt="" className="profile"/>
                                    <h5>Fábio Maromba</h5>
                                    <h6>+ 2km de você</h6>
                                    <button>Ver perfil</button>
                                </div>
                                <div className="forun-unic">
                                    <img src={avatarImg4} alt="" className="profile"/>
                                    <h5>Bela Mia</h5>
                                    <h6>+ 20km de você</h6>
                                    <button>Ver perfil</button>
                                </div>
                                <div className="forun-unic">
                                    <img src={avatarImg5} alt="" className="profile"/>
                                    <h5>Juliana Morena</h5>
                                    <h6>+ 25km de você</h6>
                                    <button>Ver perfil</button>
                                </div>
                                <div className="forun-unic">
                                    <img src={avatarImg6} alt="" className="profile"/>
                                    <h5>Fábio Maromba</h5>
                                    <h6>+ 31km de você</h6>
                                    <button>Ver perfil</button>
                                </div>
                            </div>
                    </div>
                <ChatBar />
                </div>
            </div>
        </div>
    )
}

export { Radar }