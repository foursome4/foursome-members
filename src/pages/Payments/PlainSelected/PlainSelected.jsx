import "./plainSelected.css"
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { TopBar } from "../../../components/TopBar/TopBar";
import { ChatSlim } from "../../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { BarBottomMenu } from "../../../components/BarBottomMenu/BarBottomMenu";

function PlainSelected() {
    const {id} = useParams();

    const {data} = useFetch(`/plains/unic/${id}`);

    
    return  (
        <div className="PlainSelected">
            <TopBar />
            <div className="plains-informations">
            <h2>Plano selecionado</h2>

            <div className="plain">
            <h4>Plano: {data?.[0].name}</h4>
            <h4>Valor: R${data?.[0].value}</h4>
            <h4>Período: {data?.[0].period}</h4>
            <h4>Ativação: {data?.[0].created_at}</h4>
            <h4>Expira em: {data?.[0].created_at} Dias</h4>

            <a href="/pricing">Alterar plano</a>
            </div>

            <a href={`/payment/${data?.[0].id}`}>Prossegir para Pagamento</a>
            </div>

        </div>
    )
}

export { PlainSelected }