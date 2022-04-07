import { Link } from "react-router-dom";
import './usersSearch.css'


function UsersSearch({id, nickname, avatar}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    console.log(id)

    return (
       <div className="item" key={id}>
           <div className="image">
           <Link to={userData.id === id ? `/profile` : `/profile-friend/${id}`}>
           <img src={avatar} alt="" />
           </Link>
           </div>
           <div className="name">
             <Link to={userData.id === id ? `/profile` : `/profile-friend/${id}`}>
           <h3>{nickname}</h3>
           </Link>
           </div>
       </div>
    ) 
}


export { UsersSearch }