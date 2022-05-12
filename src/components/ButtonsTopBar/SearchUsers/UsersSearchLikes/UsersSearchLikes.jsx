import { Link } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import './usersSearchLikes.css'


function UsersSearchLikes({idAccount}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const {data} = useFetch(`/informations/${idAccount}`);

    if(!data) {
      return (
          <div className="load">
              <h5>Carregando...</h5>
          </div>
      )
  }


    return (
       <div className="item-search" key={idAccount}>
           <div className="image">
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
           <img src={data[0].avatar} alt="avatar" />
           </Link>
           </div>
           <div className="name">
             <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
           <h4>{data[0].nickname} - {data[0].uf}</h4>
           </Link>
           </div>
       </div>
    ) 
}


export { UsersSearchLikes }