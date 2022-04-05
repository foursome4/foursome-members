import './listInvites.css'
import { useContext} from 'react'
import { AuthContext } from '../../../contexts/Auth';
import { useFetch } from '../../../hooks/useFetch';

function ListInvites() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const {deleteInvite} = useContext(AuthContext);

    const idAccount = user.id
    const {data} = useFetch(`/invites/${idAccount}`);

      function handleDeleteInvite(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
        deleteInvite(id);
        } 
      }

      

    return(
        <>
        {data?.map((invite) => {
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