import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FiCalendar, FiHome, FiList, FiRadio, FiUserCheck, FiUsers, FiSmile, FiMenu, FiInfo } from "react-icons/fi"
import { Link } from "react-router-dom";
import api from "../../services/api";
import './barBottomMenu.css'

function BarBottomMenu () {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
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
                <Link to="/feed" >
                 <button className="ButtonsUnic" >
                        <FiHome size={20}/>Feed
                    </button>
                    </Link>

                    <Link to="/profile" >
                    <button className="ButtonsUnic" >
                        <FiUserCheck size={20}/>Perfil
                    </button>
                    </Link>
          
                    {/* <Link to="/messages" >
                    <button className="ButtonsUnic" >
                        <FiMail size={20}/>
                       Recados
                    </button>
                    </Link> */}

                    {/* <Link to="/ranking" >
                    <button className="ButtonsUnic" >
                        <FiTrendingUp size={20}/>
                       Ranking
                    </button>
                    </Link> */}

                    <Link to="/groups" >
                    <button className="ButtonsUnic" >
                        <FiUsers size={20}/>
                       Grupos
                    </button>
                    </Link>

                    <Link to="/foruns" >
                    <button className="ButtonsUnic" >
                        <FiList size={20}/>
                       Fóruns
                    </button>
                    </Link>

                    <Link to="/events" >
                    <button className="ButtonsUnic" >
                        <FiCalendar size={20}/>
                       Eventos
                    </button>
                    </Link>
                    
                    <Link to="/radar" >
                    <button className="ButtonsUnic" >
                        <FiRadio size={20}/>
                       Radar
                    </button>
                    </Link>

                    {/* <Link to="/locals" >
                    <button className="ButtonsUnic" >
                        <FiMapPin size={20}/>Locais
                    </button>
                    </Link> */}
                    <Link to="/infos" >
                    <button className="ButtonsUnic" >
                        <FiInfo size={20}/>Infos
                    </button>
                    </Link>
                </div>
                : select === true ?
                <div className="Buttons">

                <button className="ButtonsUnic" onClick={handleOpenBar}>
                       <FiMenu size={20}/>Menu
                   </button>

                   {users.map((user) => {
                       return(             
                    user.idAccount === userData.id ? "" :
               <Link to={`/profile-friend/${user.idAccount}`} key={user.idAccount}>
                <div className="divUser" key={user.idAccount}>
                    <FaCircle />
                    <div className="image">
                     <img src={user.avatar} alt={user.idAccount} />
                    </div>
                   </div>
                   </Link>
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