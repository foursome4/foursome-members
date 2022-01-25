import { TopBar } from "../../components/TopBar/TopBar"
import { FiSearch} from 'react-icons/fi'
import capaGrupo from '../../assets/images/capaGrupo.png'
import perfilGrupo from '../../assets/images/perfilGrupo.png'
import './foruns.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"

function Foruns2() {
    return (
        <div className="content">
     <ToolbarLeftSlim />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="groups">
                            <div className="groups-selected">
                                <button className="selected">Todos os Foruns</button>
                                <button>Foruns que participo</button>
                            </div>
                            <div className="groups-search">
                                <input type="text" />
                                <button><FiSearch size={20}/></button>
                            </div>
                            <div className="groups-all">
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h3>Dicas de lazer em Arraial</h3>
                                    <h4>Criado a 3 meses</h4>
                                    <button>Entrar no grupo</button>
                                </div>
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h3>Curtição em Arraial</h3>
                                    <h4>Criado a 3 meses</h4>
                                    <button>Entrar no grupo</button>
                                </div>
                            </div>
                    </div>
                <ChatSlim />
                </div>
            </div>
        </div>
    )
}

export { Foruns2 }