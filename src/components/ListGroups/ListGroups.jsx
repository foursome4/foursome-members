import './listGroups.css'
import capaGrupo from '../../assets/images/capaGrupo.png'
import perfilGrupo from '../../assets/images/perfilGrupo.png'
import { useEffect, useState } from 'react'
import api from '../../services/api'

function ListGroups() {
    const [groups, setGroups] = useState([])
    useEffect(() => {
        async function loadGroups(){
            await api.get("/groups").then((result) => {
                console.log(result.data);
                setGroups(result.data)
            })
        }

        loadGroups()
    }, [])
    return (
        <div className="listGroups">
             <div className="groups-all">
                             {groups.map((group) => {
                                 return(
                                    <div className="group-unic" key={group.id}>
                                    <img src={group.cover} alt="" className="cover"/>
                                    <img src={group.avatar} alt="" className="profile"/>
                                    <h4>{group.name}</h4>
                                    <h6><b>Criado a 3 meses</b></h6>
                                    <h6>Grupo {group.privacity} / 0 Membros</h6>
                                    <button>Entrar no grupo</button>
                                </div>
                           
                                 )
                             })}
                            </div>
        </div>
    )
}

export { ListGroups }