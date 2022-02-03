import './listFriends.css'
import { useContext, useEffect, useState } from 'react'
import api from '../../services/api';
import { AuthContext } from '../../contexts/Auth';


function ListFriends({id, idRegister}) {
    const Local = localStorage.getItem("foursome");
    const myUser = JSON.parse(Local);

    const {deleteFriend} = useContext(AuthContext)

    const [friendAccount, setFriendAccount] = useState("");
    const [friendInformation, setFriendInformation] = useState("");

    useEffect(() => {
        async function loadAccount() {
            await api.get(`/accounts/filter/${id}`).then((result) => {
                console.log(result.data[0])
                setFriendAccount(result.data[0])
            })
        }

        async function loadInformation() {
            const idAccount = id;
            await api.get(`/informations/${idAccount}`).then((result) => {
                console.log(result.data[0])
                setFriendInformation(result.data[0])
            })
        }

        loadAccount();
        loadInformation();
    }, [])


    function handleDeleteFriend(e) {
        e.preventDefault()
        console.log(idRegister)
       deleteFriend(idRegister)
    }
    return (
        <div className="listFriends">
           <div className="friendUnic">
           <img src={friendInformation.avatar} alt="" />
            <div className="name">
            <h3>{friendInformation.nickname}</h3>
            {friendAccount.id === myUser.id ?
                <a href={`/profile`}>Acessar Perfil</a>
                :
                <a href={`/profile-friend/${friendAccount.id}`}>Acessar Perfil</a>
            }
            <button onClick={handleDeleteFriend} > Remover </button>

            </div>
           </div>
        </div>
    )
}

export {ListFriends}