import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import './informations.css'

function Informations() {

    return(
        <div className="informations">
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
                 <TopBar />
            <div className="informations-page">

                    <h1>Informações sobre a Foursome</h1>
        </div>
        <ChatSlim />
        </div>
    )
}


export {Informations}