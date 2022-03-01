import './listGroups.css'
import { useContext, useEffect, useState } from 'react'
import api from '../../services/api'
import { AuthContext } from '../../contexts/Auth'
import { ListMembersGroup } from '../ListMembersGroup/ListMembersGroup';
import { Link } from 'react-router-dom';

function ListGroups() {
    const {createMemberGroup}= useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const LocalInformations = localStorage.getItem("informations-foursome");
    const userInformations= JSON.parse(LocalInformations);
    const [groups, setGroups] = useState([])


    useEffect(() => {
        async function loadGroups(){
            await api.get("/groups").then((result) => {
                console.log(result.data);
                setGroups(result.data)
            })
        }

        loadGroups()
    }, []);



    return (
        <div className="listGroups">
             <div className="groups-all">
                             {groups.map((group) => {
                                 return(
                                    <div className="group-unic" key={group.id}>
                                        <div className="cover">
                                    <img src={group.cover} alt="" className="cover"/>
                                        </div>
                                    <img src={group.avatar} alt="" className="profile"/>
                                    <h4>{group.name}</h4>
                                    <h6>Grupo {group.privacity} / <ListMembersGroup idGroup={group.id}/> Membros</h6>
                                    <Link to={`/group/${group.id}`}>Entrar no grupo</Link>
                                </div>
                           
                                 )
                             })}
                               
                            </div>

                         
        </div>
    )
}

export { ListGroups }