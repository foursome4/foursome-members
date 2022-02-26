import './myGroups.css'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { ListGroupUnic } from '../ListGroupUnic/ListGroupUnic';

function MyGroups() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const LocalInformations = localStorage.getItem("informations-foursome");
    const userInformations= JSON.parse(LocalInformations);

    const [members, setMembers] = useState([]);

    useEffect(() => {
        async function loadGroups(){
            await api.get("/members").then((result) => {
                console.log(result.data);
                setMembers(result.data)
            })
        }

        loadGroups()
    }, []);





    return (
        <div className="listGroups">
             <div className="groups-all">
                                {members.map((member) => {
                                    return(
                                        member.idAccount === user.id ?
                                <ListGroupUnic id={member.idGroup} />
                                        :
                                      ""
                                    )
                                })}
                               

                            </div>
                            <br />
                                
        </div>
    )
}

export { MyGroups }