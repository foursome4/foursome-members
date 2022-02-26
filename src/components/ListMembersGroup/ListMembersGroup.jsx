import './listMembersGroup.css'
import { useContext, useEffect, useState } from 'react'
import api from '../../services/api'
import { AuthContext } from '../../contexts/Auth'

function ListMembersGroup({idGroup}) {
    const {createMemberGroup}= useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const LocalInformations = localStorage.getItem("informations-foursome");
    const userInformations= JSON.parse(LocalInformations);

    const [members, setMembers] = useState();
  


    useEffect(() => {
        async function loadGroups(){
            await api.get(`/members/${idGroup}`).then((result) => {
                console.log(result.data.length);
                setMembers(result.data.length)

            })
        }

        loadGroups()
    }, []);

      return (
        <div className='counter'>
         { members }
        </div>
    )
}

export { ListMembersGroup }