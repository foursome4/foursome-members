import "./plainSelected.css"
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { TopBar } from "../../../components/TopBar/TopBar";
import { ChatSlim } from "../../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { BarBottomMenu } from "../../../components/BarBottomMenu/BarBottomMenu";

function PlainSelected() {
    const {name} = useParams();

    
    return  (
        <div className="PlainSelected">
            <TopBar />
            <div className="plains-informations">
            <h2>Plano selecionado</h2>

            <div className="plain">
            <div className="text">
            <h3> <b>Plano:</b>  Essencial</h3>
            <h3> <b>Ativação:</b>  26/07/2022</h3>
                </div>

            <div className="link">
            <a href="/pricing">Alterar plano</a>
            </div>
            </div>

            <div className="optionsPayment">
                <div className="optionUnic">
                    <div className="title">
                    <h3>MENSAL</h3>
                    </div>
                <h4> <b>Período:</b>  30 Dias</h4>
                <h4> <b>Valor:</b>  R$ 9,90</h4>
                <h4> <b>Pagamento:</b>  PIX</h4>
                </div>
                <div className="optionUnic">
                <div className="title">
                    <h3>TRIMESTRAL</h3>
                    <h5>Economize: 10%</h5>
                    </div>
                <h4> <b>Período:</b>  90 Dias</h4>
                <h4> <b>Valor:</b>  R$ 26,73</h4>
                <h4> <b>Expira em:</b>  90 Dias</h4>
                </div>
                <div className="optionUnic">
                <div className="title">
                    <h3>SEMESTRAL</h3>
                    <h5>Economize: 15%</h5>
                    </div>
                <h4> <b>Período:</b>  180 Dias</h4>
                <h4> <b>Valor:</b>  R$ 50,49</h4>
                <h4> <b>Pagamento:</b>  PIX</h4>
                </div>
                <div className="optionUnic">
                <div className="title">
                    <h3>ANUAL</h3>
                    <h5>Economize: 20%</h5>
                    </div>
                <h4> <b>Período:</b>  365 Dias</h4>
                <h4> <b>Valor:</b>  R$ 95,04</h4>
                <h4> <b>Pagamento:</b>  PIX</h4>
                </div>
            </div>

            <a href={`/payment/`}>Prossegir para Pagamento</a>
            </div>

        </div>
    )
}

export { PlainSelected }