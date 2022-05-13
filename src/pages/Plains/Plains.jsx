import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { Footer } from "../../components/Footer/Footer";
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
        <Footer />
        </div>
    )
}


export {Plains}