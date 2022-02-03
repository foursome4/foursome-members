import './listFriendsPending.css'
import { useContext, useEffect, useState } from 'react'
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';


function ListFriendsPending({idAccount, id}) {
    const {friendAproved} = useContext(AuthContext)
    const Local = localStorage.getItem("foursome");
    const myUser = JSON.parse(Local);

    const [friendAccount, setFriendAccount] = useState("");
    const [friendInformation, setFriendInformation] = useState("");

    useEffect(() => {
        async function loadAccount() {
            await api.get(`/accounts/filter/${idAccount}`).then((result) => {
                setFriendAccount(result.data[0])
            })
        }

        async function loadInformation() {
            await api.get(`/informations/${idAccount}`).then((result) => {
                setFriendInformation(result.data[0])
            })
        }

        loadAccount();
        loadInformation();
    }, [])


    function handleAprovedFriend(e) {
        e.preventDefault()
        friendAproved(id)
    }


    return (
        <div className="listFriends">
           <div className="friendUnic">
           <img src={friendInformation.avatar} alt="" />
            <div className="name">
            <h3>{friendInformation.nickname}</h3>
            {friendAccount.id === myUser.id ?
                <Link to={`/profile`}>Acessar Perfil</Link>
                :
                <Link to={`/profile-friend/${friendAccount.id}`}>Acessar Perfil</Link>
            }
            <button onClick={handleAprovedFriend}>Aceitar solicitação</button>
            <button>Não o/a conheço - Apenas seguir</button>
            </div>
           </div>
        </div>
    )
}

export {ListFriendsPending}