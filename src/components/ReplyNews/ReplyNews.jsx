import { useFetch } from "../../hooks/useFetch"

function ReplyNews({id, reply}) {
    console.log(id)
    const {data} = useFetch(`/newsreply/${id}`)
    if(data) {
        console.log(data)
    }
    return (
        <div className="ReplyNews">

            {data?.map((replyNew) => {
                return (
                    <div className="replyNewsUnic" key={replyNew.id}>
                        <h4>{replyNew.nickname}</h4>
                        <h5>{replyNew.text}</h5>
                        
                        {replyNew.link === "" ? "" :
                        <img src={replyNew.link} alt={replyNew.title} />
                        }
                    </div>
                )
            })}


        {reply === "Não" ? "" :
            <div className="reply">
                <textarea name="" id="" cols="30" rows="5" placeholder="Digite sua resposta">
                </textarea>
                <button>Responder</button>
            </div>
            }

        </div>
    )
}

export {ReplyNews}