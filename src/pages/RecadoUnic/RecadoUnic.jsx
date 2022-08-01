import { useParams } from "react-router-dom";
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import { useFetch } from "../../hooks/useFetch";
import "./recadoUnic.css"

function RecadoUnic() {
    const {id} = useParams();

    const {data} = useFetch(`/news/${id}`);


    return (
        <div className="RecadoUnic">
            <TopBar />
            <div className="listRecadoUnic">
                <div className={data?.[0].priority === "Normal" ? "title": data?.[0].priority === "Alta" ? "title2" : "title3"} >
            <h3>{data?.[0].title}</h3>
            <h5><b>Para:</b> Todos. <b>Prioridade:</b>{data?.[0].priority}</h5>     
                </div>
            <br />
            <h5>{data?.[0].text}</h5>  
            <br />
            <h5>Atenciosamente, <br />Equipe FOURSOME</h5>   

            {data?.[0].reply === "Não" ? "" :
            <div className="reply">
                <textarea name="" id="" cols="30" rows="5" placeholder="Digite sua resposta">

                </textarea>
                <button>Responder</button>
            </div>
            }

            </div>
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
        </div>
    )
}

export { RecadoUnic }