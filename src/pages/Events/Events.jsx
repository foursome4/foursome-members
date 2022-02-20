import { TopBar } from "../../components/TopBar/TopBar"
import { FiSearch, FiCalendar, FiMapPin} from 'react-icons/fi'
import capaGrupo from '../../assets/images/capaGrupo.png'
import perfilGrupo from '../../assets/images/perfilGrupo.png'
import membersImg from '../../assets/images/members.png'
import './event.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"

function Events() {
    return (
        <div className="content">
     <ToolbarLeftSlim />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="events">
                            <div className="events-selected">
                                <button className="selected">Todos os Eventos</button>
                                <button>Presença Confirmada</button>
                            </div>
                            <div className="events-search">
                                <input type="text" />
                                <button><FiSearch size={20}/></button>
                            </div>
                            <div className="events-all">
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h3>Pré Carnaval 2022</h3>
                                    <h4>+ Mais informações</h4>
                                    <img src={membersImg} alt="" className="members"/>
                                    <h4><FiCalendar /> 25 de Janeiro</h4>
                                    <h5><FiMapPin /> Sítio Arena Texas - Cabo Frio - RJ</h5>
                                    <button>Participar</button>
                                </div>
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h3>Balada Chopp 10</h3>
                                    <h4>+ Mais informações</h4>
                                    <img src={membersImg} alt="" className="members"/>
                                    <h4><FiCalendar /> 20 de Janeiro</h4>
                                    <h5><FiMapPin /> Boate Black Night - Búzios - RJ</h5>
                                    <button>Participar</button>
                                </div>
                            </div>
                    </div>
                    <ChatSlim />
                </div>
            </div>
        </div>
    )
}

export { Events }