import './listFriends.css'
import { useEffect, useState } from 'react'
import api from '../../services/api';
import { Link } from 'react-router-dom';


function ListFriends({id}) {
    const Local = localStorage.getItem("foursome");
    const myUser = JSON.parse(Local);

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
            </div>
           </div>
        </div>
    )
}

export {ListFriends}