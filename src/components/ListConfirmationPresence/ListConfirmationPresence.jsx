import './listConfirmationPresence.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'

function ListConfirmationPresence({idGroup}) {
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

export { ListConfirmationPresence }