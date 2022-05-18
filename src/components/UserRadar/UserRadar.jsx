import './userRadar.css';
import { IoAirplane} from 'react-icons/io5';
import { useFetch } from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

function UserRadar({nickname, equalCity, idAccount}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

    let uf = ""

    const {data} = useFetch(`informations/${idAccount}`); 
    if(data) {
        uf = `${data[0]?.uf}`
    }
    return (
        <>
        {nickname === "" || nickname === undefined ?
         <h5>Usuário deletado</h5>
        :
        <Link to={idAccount === userData.id ? `/profile` : `/profile-friend/${idAccount}`}>
        <h5>{nickname} - {uf} {equalCity === true ? "" : <IoAirplane/>}</h5>
        </Link>
        }
         
        </>
    )
    
}

export {UserRadar}