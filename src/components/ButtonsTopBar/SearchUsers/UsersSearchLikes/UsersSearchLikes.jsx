import { Link } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import './usersSearchLikes.css'


function UsersSearchLikes({idAccount}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

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
           {data[0].avatar === "" || data[0].avatar === undefined ? 
                                                <img 
                                                src={profile}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // previne loop
                                                    currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                                                }}
                                                />
                        :
                        <img 
                        src={data[0].avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                        }
           </Link>
           </div>
           <div className="name">
             <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
             {data[0].nickname === "" || data[0].nickname === undefined ?
         <h4>Usuário deletado</h4>
        :
        <h4>{data[0].nickname} - {data[0].uf}</h4> }
          
           </Link>
           </div>
       </div>
    ) 
}


export { UsersSearchLikes }