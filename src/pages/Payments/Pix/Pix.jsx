import "./pix.css"
import imagePìx from '../../../assets/pix/29.jpeg';
import { useParams } from "react-router-dom";
import { TopBar } from "../../../components/TopBar/TopBar";
import { ChatSlim } from "../../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { BarBottomMenu } from "../../../components/BarBottomMenu/BarBottomMenu";


function Pix() {
    const {id} = useParams();

    return (
        <div className="Pix">
            <TopBar />
            <div className="pix-page">
            <h2>Realize o pagamento pelo QR-Code</h2>

            <div className="image">
                <img src={imagePìx} alt={id} />
            </div>

            <h3>Ou realize o pagamento via chave pix</h3>
            <div className="chave">
                <h4>contato@foursome.com.br</h4>
            </div>

            <a href={`/voucher/${id}`}>Enviar comprovante</a>
            </div>
            
        </div>
    )
}

export { Pix }