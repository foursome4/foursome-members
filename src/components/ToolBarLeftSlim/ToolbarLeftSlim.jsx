import { FiCalendar, FiChevronsLeft, FiHome, FiImage, FiList, FiMessageSquare, FiRadio, FiTrendingUp, FiUser, FiUserCheck, FiUsers, FiVideo } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom";
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

    function handleRedirectPhotos () {
        console.log("clicou");
        navigate("/photos")
    }

    function handleRedirectVideos () {
        console.log("clicou");
        navigate("/videos")
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
                <button className="profile">
                <Link to="/profile" >
                    <img src={userInformation !== null ? userInformation.avatar :avatarImg} alt="" />
                    </Link>
                </button>
                <div className="tools">
                <Link to="/feed" >
                 <button className="toolIcon" onclick={handleRedirectFeed}>
                        <FiHome size={20}/>Feed
                    </button>
                    </Link>
                    <Link to="/profile" >
                    <button className="toolIcon" onclick={handleRedirectProfile}>
                        <FiUserCheck size={20}/>Perfil
                    </button>
                    </Link>
                    <Link to="/friends" >
                    <button className="toolIcon" onclick={handleRedirectFriends}>
                        <FiUser size={20}/>Amigos
                    </button>
                    </Link>
          
                    <Link to="/chat" >
                    <button className="toolIcon" onclick={handleRedirectChat}>
                        <FiMessageSquare size={20}/>
                       Chat
                    </button>
                    </Link>
                    <Link to="/groups" >
                    <button className="toolIcon" onclick={handleRedirectGroups}>
                        <FiUsers size={20}/>
                       Grupos
                    </button>
                    </Link>
                    <Link to="/foruns" >
                    <button className="toolIcon" onclick={handleRedirectForuns}>
                        <FiList size={20}/>
                       Fóruns
                    </button>
                    </Link>
                    <Link to="/ranking" >
                    <button className="toolIcon" onclick={handleRedirectRanking}>
                        <FiTrendingUp size={20}/>
                       Ranking
                    </button>
                    </Link>
                    <Link to="/radar" >
                    <button className="toolIcon" onclick={handleRedirectRadar}>
                        <FiRadio size={20}/>
                       Radar
                    </button>
                    </Link>
                    <Link to="/events" >
                    <button className="toolIcon" onclick={handleRedirectEvents}>
                        <FiCalendar size={20}/>
                       Eventos
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export {ToolbarLeftSlim}