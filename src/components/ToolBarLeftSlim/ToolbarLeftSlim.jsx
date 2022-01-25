import { FiCalendar, FiHome, FiImage, FiList, FiMessageSquare, FiRadio, FiTrendingUp, FiUser, FiUsers, FiVideo } from "react-icons/fi"
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
  

    return (
        <div className="content-toolbar">
            <div className="ToolBarLeftSlim">
                <div className="profile">
                <Link to="/profile" >
                    <img src={userInformation !== null ? userInformation.avatar :avatarImg} alt="" />
                    </Link>
                </div>
                <div className="tools">
                <Link to="/profile" >
                <div className="toolIcon" onclick={handleRedirectFeed}>
                        <FiHome size={20}/>
                        <p>Feed</p>
                    </div>
                    </Link>
                    <Link to="/feed" >
                    <div className="toolIcon" onclick={handleRedirectFriends}>
                        <FiUser size={20}/>
                        <p>Amigos</p>
                    </div>
                    </Link>
                    <Link to="/photos" >
                    <div className="toolIcon" onclick={handleRedirectPhotos}>
                        <FiImage size={20}/>
                        <p>Fotos</p>
                    </div>
                    </Link>
                    <Link to="/videos" >
                    <div className="toolIcon" onclick={handleRedirectVideos}>
                        <FiVideo size={20}/>
                        <p>Vídeos</p>
                    </div>
                    </Link>
                    <Link to="/chat" >
                    <div className="toolIcon" onclick={handleRedirectChat}>
                        <FiMessageSquare size={20}/>
                        <p>Chat</p>
                    </div>
                    </Link>
                    <Link to="/groups" >
                    <div className="toolIcon" onclick={handleRedirectGroups}>
                        <FiUsers size={20}/>
                        <p>Grupos</p>
                    </div>
                    </Link>
                    <Link to="/foruns" >
                    <div className="toolIcon" onclick={handleRedirectForuns}>
                        <FiList size={20}/>
                        <p>Fóruns</p>
                    </div>
                    </Link>
                    <Link to="/ranking" >
                    <div className="toolIcon" onclick={handleRedirectRanking}>
                        <FiTrendingUp size={20}/>
                        <p>Ranking</p>
                    </div>
                    </Link>
                    <Link to="/radar" >
                    <div className="toolIcon" onclick={handleRedirectRadar}>
                        <FiRadio size={20}/>
                        <p>Radar</p>
                    </div>
                    </Link>
                    <Link to="/events" ><div className="toolIcon" onclick={handleRedirectEvents}>
                        <FiCalendar size={20}/>
                        <p>Eventos</p>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export {ToolbarLeftSlim}