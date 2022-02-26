import './groupsCreated.css'
import capaGrupo from '../../assets/images/capaGrupo.png'
import perfilGrupo from '../../assets/images/perfilGrupo.png'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { ListMembersGroup } from '../ListMembersGroup/ListMembersGroup';

function GroupsCreated() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const LocalInformations = localStorage.getItem("informations-foursome");
    const userInformations= JSON.parse(LocalInformations);

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function loadGroups(){
            await api.get("/groups").then((result) => {
                console.log(result.data);
                setGroups(result.data)
            })
        }

        loadGroups()
    }, []);



    const myGroups = groups.filter((groupsMy) => (groupsMy.idAccount === user.id))
    return (
        <div className="listGroups">
             <div className="groups-all">
             {myGroups.map((group) => {
                                    return(
                                        group.idAccount === user.id ?
                                <div className="group-unic">
                                    <img src={group.avatar} alt="" className="cover"/>
                                    <img src={group.cover} alt="" className="profile"/>
                                    <h4>{group.name}</h4>
                                    <h6>Grupo {group.privacity} / <ListMembersGroup idGroup={group.id}/> Membros</h6>
                                    <button>Entrar no grupo</button>
                                    <button className='Deletar'>Deletar no grupo</button>
                                </div>
                                     :
                                     ""
                                     )
                                })}
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
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />

                            </div>
        </div>
    )
}

export { GroupsCreated }