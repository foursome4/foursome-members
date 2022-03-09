import './listFriendsPending.css'
import { useContext, useEffect, useState } from 'react'
import api from '../../services/api';
import { AuthContext } from '../../contexts/Auth';
import { Link } from 'react-router-dom';


function ListFriendsPending({idAccount, id}) {
    const {friendAproved, deleteFriendAndFollower} = useContext(AuthContext)
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
    }, [idAccount])



    function handleAprovedFriend(e) {
        e.preventDefault()
        friendAproved(id)
    }

    function handleDeleteFriend(e) {
        const idFriend = myUser.id
        const type = "follower"
        const status = "aproved"
        e.preventDefault()
        deleteFriendAndFollower(id, idAccount, idFriend, type, status)

    }


    return (
        <div className="listFriendsPending">
           <div className="friendUnics2">
           <img src={friendInformation.avatar} alt="" />
            <div className="name">
            <Link to={friendAccount.id === myUser.id ? `/profile` : `/profile-friend/${friendAccount.id}`}> <h3>{friendInformation.nickname}</h3></Link>
            <button onClick={handleAprovedFriend}>Aceitar solicitação</button>
            <button className="follow" onClick={handleDeleteFriend}>Apenas me seguir</button>
            </div>
           </div>
        </div>
    )
}

export {ListFriendsPending}