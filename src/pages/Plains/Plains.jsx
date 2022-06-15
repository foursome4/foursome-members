import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import { useFetch } from "../../hooks/useFetch";
import './plains.css'

function Plains() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/payments/${user.id}`)



    return(
        <div className="plains">
                 <TopBar />
            <div className="plains-page">
            <div className="myPlain">
            <h2>Meu plano</h2>
            <h4>Plano: {data?.[0].namePlain}</h4>
            <h4>Valor: R${data?.[0].value}</h4>
            <h4>Período: {data?.[0].period}</h4>
            <h4>Ativação: {data?.[0].created_at}</h4>
            <h4>Expira em: {data?.[0].created_at} Dias</h4>


            <a href="/pricing">Renovar plano</a>
            </div>   

            <div className="myPayment">
                    <h2>Histórico de pagamentos</h2>
                        {data?.map((payment) => {
                            return (
                                <div className="unic" key={payment.id}>
                                    <h5> <b>Id Pagamento:</b>  {payment.id}</h5>
                                    <div className="dadosList">
                                    <div className="dados">
                                        <h5><b>Data</b></h5>
                                        <h5>{payment.created_at}</h5>
                                    </div>
                                    <div className="dados">
                                        <h5><b>Plano</b></h5>
                                        <h5>{payment.namePlain}</h5>
                                    </div>
                                    <div className="dados">
                                        <h5><b>Valor</b></h5>
                                        <h5>R$ {payment.value}</h5>
                                    </div>
                                    <div className="dados">
                                        <h5><b>Período</b></h5>
                                        <h5>{payment.period} Dias</h5>
                                    </div>
                                    <div className="dados">
                                        <h5><b>Comprovante</b></h5>
                                        <h5>{payment.data}</h5>
                                    </div>
                                    </div>
                                    <hr />
                                </div>
                                
                              )
                        })}
                    </div>

           

        </div>
        <ChatSlim />
        <ToolbarLeftSlim />
        <BarBottomMenu />
        </div>
    )
}


export {Plains}