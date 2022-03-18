import './listInvites.css'
import {useState, useEffect} from 'react'
import api from '../../../services/api';

function ListInvites() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    const [invites, setInvites] = useState([])

    useEffect(() => {
        const idAccount = user.id
        async function loadInvites() {
          await api.get(`/invites/${idAccount}`).then((result) => {
            const data = result.data;
            console.log(result.data)
            setInvites(data)
          })
        }
        loadInvites()
      }, [user.id])

    return(
        <>
        {invites.map((invite) => {
                                  return (
                                    <div className="inviteUnic" key={invite.email}>
                                      <h5><b>{invite.name}</b></h5>
                                      <h5>{invite.email !== "" ? invite.email : ""} </h5>
                                      <h5>{invite.phone !== "" ? invite.phone : ""}</h5>
                                      <button>Deletar</button> 
                                    
                                    </div>
                                  )
                                })}
        </>
    )
}

export { ListInvites }