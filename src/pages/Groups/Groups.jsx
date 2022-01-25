import { ChatBar } from "../../components/ChatBar/ChatBar"
import { TopBar } from "../../components/TopBar/TopBar"
import { FiSearch} from 'react-icons/fi'
import capaGrupo from '../../assets/images/capaGrupo.png'
import perfilGrupo from '../../assets/images/perfilGrupo.png'
import membersImg from '../../assets/images/members.png'
import './groups.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"

function Groups() {
    return (
        <div className="content">
     <ToolbarLeftSlim />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="groups">
                            <div className="groups-selected">
                                <button className="selected">Todos os Grupos</button>
                                <button>Meus grupos</button>
                            </div>
                            <div className="groups-search">
                                <input type="text" />
                                <button><FiSearch size={20}/></button>
                            </div>
                            <div className="groups-all">
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h3>Curtição em Arraial</h3>
                                    <h4>Criado a 3 meses</h4>
                                    <img src={membersImg} alt="" className="members"/>
                                    <h4>Grupo público / 20 Membros</h4>
                                    <button>Entrar no grupo</button>
                                </div>
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h3>Curtição em Arraial</h3>
                                    <h4>Criado a 3 meses</h4>
                                    <img src={membersImg} alt="" className="members"/>
                                    <h4>Grupo público / 20 Membros</h4>
                                    <button>Entrar no grupo</button>
                                </div>
                            </div>
                    </div>
                <ChatBar />
                </div>
            </div>
        </div>
    )
}

export { Groups }