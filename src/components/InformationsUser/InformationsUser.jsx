import "./informationsUser.css"
import { useState, useEffect } from "react";
import api from "../../services/api";
import {FiCheck} from 'react-icons/fi'
import {FaVenus, FaMars} from 'react-icons/fa'

function InformationsUser() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const informations = localStorage.getItem("informations-foursome");
    const userInformations = JSON.parse(informations);
    const LocalCharacteristics = localStorage.getItem("characteritics-foursome");
    const characteristics = JSON.parse(LocalCharacteristics);
    const LocalPreferences = localStorage.getItem("preferences-foursome");
    const preferences = JSON.parse(LocalPreferences);

    const [patron, setPatron] = useState([]);
    const [visits, setVisits] = useState([]);
    const [posts, setPosts] = useState([]);
    const [myFriends, setMyFriends] = useState([]);
    


    useEffect(() => {
        async function searchPatron() {
          const idAccount = user.patron.toLowerCase();
          const patron = await api.get(`informations/${idAccount}`);
          setPatron(patron.data[0])
        }
  
        searchPatron()
        
      }, [user.patron]);


      useEffect(() => {
        async function loadVisits() {
          const idFriend = user.id;
          const friend = await api.get(`visits/${idFriend}`);
          setVisits(friend.data)
          console.log(friend.data)
        }
        loadVisits()
      }, [user.id]);;


      useEffect(() => {
        async function loadPosts() {
            const res = await api.get(`/posts/filter/accounts/${user.id}`);
            const dataPosts = (res.data)
            setPosts(dataPosts)
        }
  
        loadPosts()
  
      }, [user.id]);



      
      useEffect(() => {
        async function loadFriends() {
          const idAccount = user.id;
          const result = await api.get(`/friends/${idAccount}`);
          setMyFriends(result.data)
        }
  
        loadFriends()
  
      }, [user.id]);
  

      const photos = posts.filter(post => (post.type === "post-photo"));
      const allPhotos = photos.slice(0, 6)
      const videos = posts.filter(post => (post.type === "post-video"));

      const friendAproveds = myFriends.filter(friend => (friend.status === 'aproved'))


return (
    <div className="infos">
    <div className="info">
    <div className="name">
        <h5>@{user !== null ? user.username :"User Test"}</h5>
        <h6> {user !== null ? user.role : "Função não encontrada"} / {user !== null ? user.type : "Tipo de conta não encontrada"}</h6>
    </div>
    <div className="name">
        <br />
        <h4>{userInformations.city} - {userInformations.uf}</h4>
        <br />
        <h5>Meu Id: <a href="/profile"> {user.id}</a></h5>
        <h5>Patrono: {patron !== null ?  <a href={patron.idAccount === user.id ? `/profile` : `/profile-friend/${patron.idAccount}`}>{patron.nickname}</a> :"Patrono não eocnotrado"}</h5>
        <br />
    </div>

    <div className="info-user-preferences">
        <div className="informations">
            <h5 className='title'>Preferências</h5>
          <div className="selects">
              <div className="itens">{preferences.men !== "" ? <h5><FiCheck /> {preferences.men}</h5> : "" }  </div>
              <div className="itens"> {preferences.woman !== "" ? <h5><FiCheck /> {preferences.woman}</h5> : "" } </div>
              <div className="itens"> {preferences.couple !== "" ? <h5><FiCheck /> {preferences.couple}</h5> : "" } </div>
              <div className="itens"> {preferences.trisal !== "" ? <h5><FiCheck /> {preferences.trisal}</h5> : "" } </div>
              <div className="itens"> {preferences.transsexuals !== "" ? <h5><FiCheck /> {preferences.transsexuals}</h5> : "" } </div>
              <div className="itens"> {preferences.transvestites !== "" ? <h5><FiCheck /> {preferences.transvestites}</h5> : "" } </div>
              <div className="itens"> {preferences.groups !== "" ? <h5><FiCheck /> {preferences.groups}</h5> : "" } </div>
          </div>
          <div className="proposal">
            <h5 className='title'>Proposta</h5>
            {preferences.proposal !== "" ? <h5>{preferences.proposal}</h5> : "" }
          </div>
        </div>
      </div>


{characteristics.map((characteristicsUser) => {

  const nascimento = new Date(characteristicsUser.birthDate);
  const hoje = new Date()
  
  const idade =  Math.floor(Math.ceil(Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25);

  return (
    <div className={characteristicsUser.sex === "Mulher" ? "info-user-woman" : "info-user-man"} key={characteristicsUser.id}>
      <h4>{characteristicsUser.sex === "Mulher" ? <FaVenus size={20} /> : <FaMars size={20} />} </h4>
        <div className="info-user-data">
            <h5>Idade</h5>
            <p>{idade}</p>
        </div>
        <div className="info-user-data">
            <h5>Signo</h5>
            <p>{characteristicsUser.sign}</p>
        </div>
        <div className="info-user-data">
            <h5>Opção</h5>
            <p>{characteristicsUser.sexualOption}</p>
        </div>
    </div>
        )
      })} 
  
    <div className="info-social">
        <div className="info-social-data">
            <p>{friendAproveds.length}</p>
            <h5>Amigos</h5>
        </div>
        <div className="info-social-data">
            <p>{photos.length}</p>
            <h5>Fotos</h5>
        </div>
        <div className="info-social-data">
            <p>{videos.length}</p>
            <h5>Vídeos</h5>
        </div>
    </div>
    
<div className="visits">
<h5><b>Últimas visitas</b></h5>
<div className="names">
{visits.map((visit) => {
    return(
      <div key={visit.id}>
        <a href={`/profile-friend/${visit.idAccount}`}>
        <h6>@{visit.username}</h6> 
        </a>
      </div>
    )})}
</div>
</div>
</div>



<div className="photo">
<button>Fotos</button>
<div className="image">
{allPhotos.map((photos) => {
  return (
    <div className="photos-list" key={photos.id}>
<img src={photos.link} alt="" />
    </div>
  )
})}


</div>
</div>
</div>
)
}

export{ InformationsUser }


                                                       
