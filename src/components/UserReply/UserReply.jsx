import { useState,useEffect, useContext} from 'react'
import api from '../../services/api'
import './userReply.css'
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { AuthContext } from '../../contexts/Auth';
import { EditReply } from '../EditReply/EditReply';
import { DateFormat } from '../DateFormat/DateFormat';

function UserReply({idAccount, username, date, id, text, role}) {
    const { deleteReply} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);


    const [edit, setEdit] = useState(false);
    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [uf, setUf] = useState('')
    const [city, setCity] = useState('')
    useEffect(() => {
        async function loadInformations() {
            await api.get(`informations/${idAccount}`).then((result) => {
                setNickname(result.data[0].nickname)
                setAvatar(result.data[0].avatar)
                setCity(result.data[0].city)
                setUf(result.data[0].uf)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadInformations()
    }, [idAccount]);


    
    function handleDeleteReply(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
           deleteReply(id)
            } 
        }

        function handleHabiliteEdit () {
            if(edit === false) {
                setEdit(true)
            } else {
                setEdit(false) 
            }
        }

    return (
       <div className="itemReply" key={userData.id}>
           <div className="block1">
           <div className="title">
           <div className="image">
           <a href={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
               <img src={avatar} alt="" />
           </a>
           </div>
           <div className={userData.id === idAccount ? "MyName":"name"}>
           <a href={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
               <h6>{nickname} {`${uf}`}</h6>
               </a>
           <DateFormat date={date} />
           </div>
           </div>
           {userData.id === idAccount ?
           <div className="buttonsReply">
               <button onClick={handleHabiliteEdit}><FiEdit /></button>
               <button onClick={() => {handleDeleteReply(id)}}><FiTrash2 /></button>
           </div>
           : ""
            }
            </div>
            <div className="Reply-data" >
                <p>{text}</p>
            </div>

            {edit === true ?
            <EditReply id={id} data={text}/>
                     :
                     ""}
       </div>
    ) 
}


export {UserReply}