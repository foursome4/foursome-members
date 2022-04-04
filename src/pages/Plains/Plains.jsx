import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import './plains.css'

function Plains() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    return(
        <div className="plains">
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
                 <TopBar />
            <div className="plains-page">

                    <h1>Meu Plano</h1>
        </div>
        <ChatSlim />
        </div>
    )
}


export {Plains}