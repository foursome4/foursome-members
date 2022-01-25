import { TopBar } from "../../components/TopBar/TopBar"
import { FiSearch} from 'react-icons/fi'
import avatarImg5 from '../../assets/images/avatar5.png'
import avatarImg6 from '../../assets/images/avatar6.png'
import './friends.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"

function Friends() {
    return (
        <div className="content">
     <ToolbarLeftSlim />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="foruns">
                            <div className="foruns-selected">
                                <button >Meus Amigos</button>
                                <button className="selected">Solicitações de amizade</button>
                            </div>
                            <div className="foruns-search">
                                <input type="text" />
                                <button><FiSearch size={20}/></button>
                            </div>
                            <div className="foruns-all">
                                <div className="forun-unic">
                                    <img src={avatarImg5} alt="" className="profile"/>
                                    <h3>Juliana Morena</h3>
                                    <h4>@morenaju</h4>
                                    <button>Aceitar</button>
                                    <button>Apenas me seguir</button>
                                </div>
                                <div className="forun-unic">
                                    <img src={avatarImg6} alt="" className="profile"/>
                                    <h3>Fábio Maromba</h3>
                                    <h4>@marombaf</h4>
                                    <button>Aceitar</button>
                                    <button>Apenas me seguir</button>
                                </div>
                            </div>
                    </div>
                    <ChatSlim />
                </div>
            </div>
        </div>
    )
}

export { Friends }