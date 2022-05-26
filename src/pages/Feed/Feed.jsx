import { Post } from "../../components/Post/Post"
import { FeedPost } from "../../components/FeedPost/FeedPost"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './feed.css';
import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/Auth"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import { ListEventsFeed } from "../../components/ListEventsFeed/ListEventsFeed"
import { useNavigate } from 'react-router-dom';


function Feed() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);
    const Localcharacteritics = localStorage.getItem("characteritics-foursome");
    const usercharacteritics = JSON.parse(Localcharacteritics);
    const Localpreferences = localStorage.getItem("preferences-foursome");
    const userpreferences = JSON.parse(Localpreferences);
  


    const navigate = useNavigate();
    const {inactivityTime, socketDataLocation} = useContext(AuthContext);

           inactivityTime()

           useEffect(() => {
            socketDataLocation()
               if(user.status === "blocked") {
                window.open("/profile", "_self");
               }
               if(userInformation === null || userInformation === undefined) {
                window.open("/completeregistration", "_self");
               }
               if(usercharacteritics === null || usercharacteritics === undefined) {
                window.open("/characteristcs", "_self");
               }
               if(userpreferences === null || userpreferences === undefined) {
                window.open("/preferences", "_self");
               }
           }, [navigate, socketDataLocation, user.status, userpreferences, usercharacteritics, userInformation]);




return (
        <div className="container">
            <div className="content">
                <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="feed">
                    <ListEventsFeed />
                    <Post />
                    <FeedPost /> 
                    </div>
                    <ChatSlim />
                    </div>
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
                 </div>
            </div>
        </div>
    )
}

export { Feed }