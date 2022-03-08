import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FiCalendar, FiHome, FiList, FiRadio, FiTrendingUp, FiUserCheck, FiUsers, FiSmile, FiMenu, FiInfo } from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { socket } from "../../services/websocket";
import './barBottomMenu.css'

function BarBottomMenu () {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const navigate = useNavigate();
    const [select, setSelect] = useState(false);
    const [users, setUsers] = useState([]);

useEffect(() => {
    async function loadUsersONline() {
        await api.get("/online").then((res) => {
            setUsers(res.data)
        })
    }

    loadUsersONline()
}, [users])




      function handleRedirectFeed () {

            navigate("/feed")
      }

    function handleRedirectGroups () {
        navigate("/groups")
    }

    function handleRedirectForuns () {
        navigate("/foruns")
    }

    function handleRedirectRadar () {
        navigate("/radar")
    }
    function handleRedirectRanking () {
        navigate("/ranking")
    }

    function handleRedirectEvents () {
        navigate("/events")
    }
    function handleRedirectProfile () {
        navigate("/profile")
    }
    function handleRedirectInfo () {
        navigate("/infos")
    }
    function handleOpenUsersOnline (e) {
        e.preventDefault()
       setSelect(true)
    }
    function handleOpenBar (e) {
        e.preventDefault()
       setSelect(false)
    }

    return (
        <div className="BarBottom">
            <div className="BarBottomBlock">
                { select === false ?
                <div className="Buttons">

                 <button className="ButtonsUnic" onClick={handleOpenUsersOnline}>
                        <FiSmile size={20}/>Online
                    </button>
                <a href="/feed" >
                 <button className="ButtonsUnic" onClick={handleRedirectFeed}>
                        <FiHome size={20}/>Feed
                    </button>
                    </a>

                    <a href="/profile" >
                    <button className="ButtonsUnic" onClick={handleRedirectProfile}>
                        <FiUserCheck size={20}/>Perfil
                    </button>
                    </a>
          
                    {/* <a href="/messages" >
                    <button className="ButtonsUnic" onClick={handleRedirectChat}>
                        <FiMail size={20}/>
                       Recados
                    </button>
                    </a> */}

                    <a href="/ranking" >
                    <button className="ButtonsUnic" onClick={handleRedirectRanking}>
                        <FiTrendingUp size={20}/>
                       Ranking
                    </button>
                    </a>

                    <a href="/groups" >
                    <button className="ButtonsUnic" onClick={handleRedirectGroups}>
                        <FiUsers size={20}/>
                       Grupos
                    </button>
                    </a>

                    <a href="/foruns" >
                    <button className="ButtonsUnic" onClick={handleRedirectForuns}>
                        <FiList size={20}/>
                       Fóruns
                    </button>
                    </a>

                    <a href="/events" >
                    <button className="ButtonsUnic" onClick={handleRedirectEvents}>
                        <FiCalendar size={20}/>
                       Eventos
                    </button>
                    </a>
                    
                    <a href="/radar" >
                    <button className="ButtonsUnic" onClick={handleRedirectRadar}>
                        <FiRadio size={20}/>
                       Radar
                    </button>
                    </a>

                    {/* <a href="/locals" >
                    <button className="ButtonsUnic" onClick={handleRedirectFriends}>
                        <FiMapPin size={20}/>Locais
                    </button>
                    </a> */}
                    <a href="/infos" >
                    <button className="ButtonsUnic" onClick={handleRedirectInfo}>
                        <FiInfo size={20}/>Infos
                    </button>
                    </a>
                </div>
                : select === true ?
                <div className="Buttons">

                <button className="ButtonsUnic" onClick={handleOpenBar}>
                       <FiMenu size={20}/>Menu
                   </button>

                   {users.map((user) => {
                       return(             
                    user.idAccount === userData.id ? "" :
               <a href={`/profile-friend/${user.idAccount}`} key={user.idAccount}>
                <div className="divUser" onClick={handleRedirectFeed} key={user.idAccount}>
                    <FaCircle />
                    <div className="image">
                     <img src={user.avatar} alt={user.idAccount} />
                    </div>
                   </div>
                   </a>
                       )
                   })}

                 
               </div>
                :
                    ""
                }


            </div>
        </div>
    )
}

export {BarBottomMenu}