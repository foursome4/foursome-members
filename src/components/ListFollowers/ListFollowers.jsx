import './listFollowers.css'
import { useContext, useEffect, useState } from 'react'
import api from '../../services/api';
import { AuthContext } from '../../contexts/Auth';


function ListFollowers({id}) {
    const Local = localStorage.getItem("foursome");
    const myUser = JSON.parse(Local);

    const { newFollower} = useContext(AuthContext)

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


    function handleNewFollower(e) {
        const idAccount = myUser.id
        const idFriend = id
        const type = "follower"
        const status = "aproved"
        e.preventDefault()
        console.log(idAccount, idFriend, type, status)
        newFollower(idAccount, idFriend, type, status)
      }

    return (
        <div className="listFollowers">
           <div className="friendUnic">
           <img src={friendInformation.avatar} alt="" />
            <div className="name">
            <a href={friendAccount.id === myUser.id ? `/profile` : `/profile-friend/${friendAccount.id}`}> <h3>{friendInformation.nickname}</h3></a>
            <button onClick={handleNewFollower}> Seguir </button>
            </div>
           </div>
        </div>
    )
}

export {ListFollowers}