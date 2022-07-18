import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { TopBar } from "../../components/TopBar/TopBar";
import { useFetch } from "../../hooks/useFetch";
import './pricing.css'

function Pricing() {

    const {data} = useFetch(`/plains`)
    
    return(
        <div className="Pricing">
                 <TopBar />
            <div className="Pricing-page">

                    <h1>Planos</h1>

                    <div className="payments">
                        {data?.map((payment) => {
                            return (
                                <div className="unic" key={payment.id}>
                                        <h4>Plano</h4>
                                        <h3>{payment.name}</h3>
                                        <h4>Valor</h4>
                                        <h3>R$ {payment.value}</h3>
                                        <h4>Período</h4>
                                        <h3>{payment.period} Dias</h3>

                                        <a href={`/selectplain/${payment.id}`}>Assinar</a>
                                </div>
                              )
                        })}

                    </div>


 
        </div>
        <BarBottomMenu />
        </div>
    )
}


export {Pricing}