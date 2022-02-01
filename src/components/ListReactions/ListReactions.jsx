import { useEffect, useState } from "react"
import api from "../../services/api"
import "./listReactions.css"
function ListReactions({idPost}) {
    const [like, setLike] = useState([])

    useEffect(() => {
        async function loadReactions() {
           const res =  await api.get(`/reactions/${idPost}`)
                setLike(res.data);
        }

        loadReactions()
    }, [])
    return (
        <div className="reactionsList">
            <h5>({like.length})</h5>
        </div>
    )
}


export {ListReactions}