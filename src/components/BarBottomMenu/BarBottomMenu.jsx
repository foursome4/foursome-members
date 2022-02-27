import { useState } from "react";
import { FiCalendar, FiHome, FiList, FiRadio, FiTrendingUp, FiUserCheck, FiUsers, FiMapPin, FiMail, FiSmile, FiMenu } from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import './barBottomMenu.css'

function BarBottomMenu () {
    const Local = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(Local);
    const navigate = useNavigate();

    const [select, setSelect] = useState(false)


      function handleRedirectFeed () {
            console.log("clicou");
            navigate("/feed")
      }

      function handleRedirectChat () {
        console.log("clicou");
        navigate("/chat")
    }

    function handleRedirectFriends () {
        console.log("clicou");
        navigate("/friends")
    }

    function handleRedirectGroups () {
        console.log("clicou");
        navigate("/groups")
    }

    function handleRedirectForuns () {
        console.log("clicou");
        navigate("/foruns")
    }

    function handleRedirectRadar () {
        console.log("clicou");
        navigate("/radar")
    }
    function handleRedirectRanking () {
        console.log("clicou");
        navigate("/ranking")
    }

    function handleRedirectEvents () {
        console.log("clicou");
        navigate("/events")
    }
    function handleRedirectProfile () {
        console.log("clicou");
        navigate("/ptofile")
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
          
                    <a href="/messages" >
                    <button className="ButtonsUnic" onClick={handleRedirectChat}>
                        <FiMail size={20}/>
                       Recados
                    </button>
                    </a>

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

                    <a href="/locals" >
                    <button className="ButtonsUnic" onClick={handleRedirectFriends}>
                        <FiMapPin size={20}/>Locais
                    </button>
                    </a>
                </div>
                : select === true ?
                <div className="Buttons">

                <button className="ButtonsUnic" onClick={handleOpenBar}>
                       <FiMenu size={20}/>Menu
                   </button>
               <a href="/feed" >
                <button className="ButtonUser" onClick={handleRedirectFeed}>
                      
                   </button>
                   </a>

                   <a href="/profile" >
                   <button className="ButtonUser" onClick={handleRedirectProfile}>
                      
                   </button>
                   </a>
         
                   <a href="/messages" >
                   <button className="ButtonUser" onClick={handleRedirectChat}>
                      
                   </button>
                   </a>

                   <a href="/ranking" >
                   <button className="ButtonUser" onClick={handleRedirectRanking}>
                      
                   </button>
                   </a>

                   <a href="/groups" >
                   <button className="ButtonUser" onClick={handleRedirectGroups}>
                     
                   </button>
                   </a>

                   <a href="/foruns" >
                   <button className="ButtonUser" onClick={handleRedirectForuns}>
                      
                   </button>
                   </a>

                   <a href="/events" >
                   <button className="ButtonUser" onClick={handleRedirectEvents}>
                      
                   </button>
                   </a>
                   
                   <a href="/radar" >
                   <button className="ButtonUser" onClick={handleRedirectRadar}>
                      
                   </button>
                   </a>

                   <a href="/locals" >
                   <button className="ButtonUser" onClick={handleRedirectFriends}>
                     
                   </button>
                   </a>
               </div>
                :
                    ""
                }


            </div>
        </div>
    )
}

export {BarBottomMenu}