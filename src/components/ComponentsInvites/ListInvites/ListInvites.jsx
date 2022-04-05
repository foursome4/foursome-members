import './listInvites.css'
import {useState, useEffect, useContext} from 'react'
import api from '../../../services/api';
import { AuthContext } from '../../../contexts/Auth';

function ListInvites() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const {deleteInvite} = useContext(AuthContext);
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

      function handleDeleteInvite(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
        deleteInvite(id);
        let deletePostActual = invites.filter(invite => invite.id !== id);
        setInvites(deletePostActual)
        } 
      }

      

    return(
        <>
        {invites.map((invite) => {
                                  return (
                                    <div className="inviteUnic" key={invite.email}>
                                      <h5><b>{invite.name}</b></h5>
                                      <h5>{invite.email !== "" ? invite.email : ""} </h5>
                                      <h5>{invite.phone !== "" ? invite.phone : ""}</h5>
                                      <button onClick={() => {handleDeleteInvite(invite.id)}}>Deletar</button> 
                                    
                                    </div>
                                  )
                                })}
        </>
    )
}

export { ListInvites }