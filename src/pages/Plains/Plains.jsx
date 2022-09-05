import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { DateFormat } from "../../components/DateFormat/DateFormat";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import { useFetch } from "../../hooks/useFetch";
import './plains.css'

function Plains() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/payments/${user.id}`)

    let expiração = ""
    if(!data) {
        window.open(`/pricing`, "_self")
        return
    }
    if(data) {
         expiração = parseInt(data?.[0].period) === 30 ? 2 :
                         parseInt(data?.[0].period) === 90 ? 4 :
                         parseInt(data?.[0].period) === 180 ? 7 :
                         parseInt(data?.[0].period) === 365 ? 13 : ""
    }

console.log(expiração)
    return(
        <div className="plains">
                 <TopBar />
            <div className="plains-page">
            <div className="myPlain">
            <h2>Meu plano</h2>
           {data?.length > 0 ?
           <>
            <h4>Plano: {data?.[0].referencePlain} {data?.[0].namePlain}</h4>
            <h4>Valor: R${data?.[0].value}</h4>
            <h4>Período: {data?.[0].period} Dias</h4>
            <h4>Ativação: {`${new Date(data?.[0].created_at).getDate()}/${new Date(data?.[0].created_at).getMonth() +1}/${new Date(data?.[0].created_at).getFullYear()}`}</h4>
            <h4>Expira em:  {`${new Date(data?.[0].created_at).getDate()}/${new Date(data?.[0].created_at).getMonth() +expiração}/${new Date(data?.[0].created_at).getFullYear()}`}</h4>
            </>
            
        :
        <h4>Você ainda não possui plano</h4>
        }


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
                                        <DateFormat date={payment.created_at}/>
                                    </div>
                                    <div className="dados">
                                        <h5><b>Plano</b></h5>
                                        <h5>{payment.referencePlain}</h5>
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
                                        <a href={payment.linkComprovant} target="_blank">Ver</a>
                                    </div>
                                    </div>
                                    <hr />
                                </div>
                                
                              )
                        })}
                    </div>

           

        </div>
        <ToolbarLeftSlim />
        <BarBottomMenu />
        </div>
    )
}


export {Plains}