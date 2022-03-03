import './listForuns.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'

function ListForuns() {

    const [foruns, setForuns] = useState([])


    useEffect(() => {
        async function loadGroups(){
            await api.get("/foruns").then((result) => {
                console.log(result.data);
                setForuns(result.data)
            })
        }

        loadGroups()
    }, []);


    return (
        <div className="listForuns">
             <div className="foruns-all">
                             {foruns.map((forum) => {
                                 return(
                                    <div className="foruns-unic" key={forum.id}>
                                        <div className="imageCover"> 
                                    <img src={forum.cover} alt="" className="cover"/>
                                        </div>
                                    <img src={forum.avatar} alt="" className="profile"/>
                                    <h4>{forum.name}</h4>
                                    <a href={`/forum/${forum.id}`}>Entrar</a>
                                </div>
                           
                                 )
                             })}
                               
                            </div>
                                 <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                         
        </div>
    )
}

export { ListForuns }