import './userRadar.css';
import { IoAirplane} from 'react-icons/io5';
import { useFetch } from '../../hooks/useFetch';

function UserRadar({nickname, equalCity, idAccount}) {
    let uf = ""

    const {data} = useFetch(`informations/${idAccount}`); 
    if(data) {
        uf = `${data[0]?.uf}`
    }
    return (
        <>
         <h5>{nickname} - {uf} {equalCity === true ? "" : <IoAirplane/>}</h5>
        </>
    )
    
}

export {UserRadar}