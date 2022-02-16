import { FiCalendar, FiHome, FiList, FiMessageSquare, FiRadio, FiTrendingUp, FiUserCheck, FiUsers, FiMapPin } from "react-icons/fi"
import { a, useNavigate } from "react-router-dom";
import avatarImg from '../../assets/images/avatar.png';
import './toolbarLeftSlim.css'

function ToolbarLeftSlim () {
    const Local = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(Local);
    const navigate = useNavigate()


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

    return (
        <div className="content-toolbar">
            <div className="ToolBarLeftSlim">
                <div className="image">
                <button className="profile">
                <a href="/profile" >
                    <img src={userInformation !== null ? userInformation.avatar :avatarImg} alt="" />
                    </a>
                </button>
                </div>
                <div className="tools">

                <a href="/feed" >
                 <button className="toolIcon" onClick={handleRedirectFeed}>
                        <FiHome size={20}/>Feed
                    </button>
                    </a>

                    <a href="/profile" >
                    <button className="toolIcon" onClick={handleRedirectProfile}>
                        <FiUserCheck size={20}/>Perfil
                    </button>
                    </a>
          
                    <a href="/chat" >
                    <button className="toolIcon" onClick={handleRedirectChat}>
                        <FiMessageSquare size={20}/>
                       Chat
                    </button>
                    </a>

                    <a href="/ranking" >
                    <button className="toolIcon" onClick={handleRedirectRanking}>
                        <FiTrendingUp size={20}/>
                       Ranking
                    </button>
                    </a>

                    <a href="/groups" >
                    <button className="toolIcon" onClick={handleRedirectGroups}>
                        <FiUsers size={20}/>
                       Grupos
                    </button>
                    </a>

                    <a href="/foruns" >
                    <button className="toolIcon" onClick={handleRedirectForuns}>
                        <FiList size={20}/>
                       Fóruns
                    </button>
                    </a>

                    <a href="/events" >
                    <button className="toolIcon" onClick={handleRedirectEvents}>
                        <FiCalendar size={20}/>
                       Eventos
                    </button>
                    </a>
                    
                    <a href="/radar" >
                    <button className="toolIcon" onClick={handleRedirectRadar}>
                        <FiRadio size={20}/>
                       Radar
                    </button>
                    </a>

                    <a href="/friends" >
                    <button className="toolIcon" onClick={handleRedirectFriends}>
                        <FiMapPin size={20}/>Locais
                    </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export {ToolbarLeftSlim}