import { Link } from "react-router-dom";
import './usersSearch.css'


function UsersSearch({id, nickname, avatar, uf}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    return (
       <div className="item-search" key={id}>
           <div className="image">
           <Link to={userData.id === id ? `/profile` : `/profile-friend/${id}`}>
           <img src={avatar} alt="" />
           </Link>
           </div>
           <div className="name">
             <Link to={userData.id === id ? `/profile` : `/profile-friend/${id}`}>
           <h4>{nickname} - {uf}</h4>
           </Link>
           </div>
       </div>
    ) 
}


export { UsersSearch }