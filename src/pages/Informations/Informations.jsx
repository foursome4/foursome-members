import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import './informations.css'
import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth"

function Informations() {

    const {inactivityTime} = useContext(AuthContext);

    inactivityTime()

    return(
        <div className="informations">
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
                 <TopBar />
            <div className="informations-page">
                <div className="selections">
                    <button>Sobre a Foursome</button>
                    <button>Regras e sugestões</button>
                    <button>Dicas e tutoriais</button>
                    <button>Informações de pagamento</button>
                    <button>Desenvolvimento</button>

                </div>
                <div className="informationsSelected">

                </div>
                
        </div>
        <ChatSlim />
        </div>
    )
}


export {Informations}

