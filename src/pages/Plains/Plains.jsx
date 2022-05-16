import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import './plains.css'

function Plains() {

    return(
        <div className="plains">
                 <TopBar />
            <div className="plains-page">

                    <h1>Meu Plano</h1>

                    <div className="myPlain">
                        
                    </div>

                    <h1>Histórico de pagamentos</h1>

                    <div className="mypayments">

                    </div>
        </div>
        <ChatSlim />
        <ToolbarLeftSlim />
        <BarBottomMenu />
        </div>
    )
}


export {Plains}