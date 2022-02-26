import './listGroups.css'
import { useContext, useEffect, useState } from 'react'
import api from '../../services/api'
import { AuthContext } from '../../contexts/Auth'
import { ListMembersGroup } from '../ListMembersGroup/ListMembersGroup';

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


    function handleCreateMemberGroup(id, privacity) {

        let idAccount = user.id
        let idGroup = id
        let role = "Member"
        let status = privacity === "Open" ? "Aproved" : "Pending"
        let avatar = userInformations.avatar
        let username = user.username
        let nickname = userInformations.nickname


           createMemberGroup(
                idAccount,
                idGroup,
                role,
                status,
                avatar,
                username,
                nickname
        )


    }


    return (
        <div className="listGroups">
             <div className="groups-all">
                             {groups.map((group) => {
                                 return(
                                    <div className="group-unic" key={group.id}>
                                    <img src={group.cover} alt="" className="cover"/>
                                    <img src={group.avatar} alt="" className="profile"/>
                                    <h4>{group.name}</h4>
                                    <h6>Grupo {group.privacity} / <ListMembersGroup idGroup={group.id}/> Membros</h6>
                                    <button onClick={() => {handleCreateMemberGroup(group.id, group.privacity)}}>Entrar no grupo</button>
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

export { ListGroups }