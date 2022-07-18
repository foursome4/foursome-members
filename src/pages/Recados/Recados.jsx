import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import "./recados.css"

function Recados() {
    return (
        <div className="Recados">
            <TopBar />
            <h3>Caixa de recados</h3>

            <div className="listRecados">
                <h5>Você não possúi recados</h5>           
            </div>
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
        </div>
    )
}

export { Recados }