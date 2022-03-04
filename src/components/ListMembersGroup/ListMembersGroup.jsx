import './listMembersGroup.css'
import { useContext, useEffect, useState } from 'react'
import api from '../../services/api'
import { AuthContext } from '../../contexts/Auth'

function ListMembersGroup({idGroup}) {
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