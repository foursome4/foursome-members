import { Post } from "../../components/Post/Post"
import { FeedPost } from "../../components/FeedPost/FeedPost"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './feed.css';
import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/Auth"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import { useNavigate } from 'react-router-dom';
import { Footer } from "../../components/Footer/Footer"


function Feed() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);


    const navigate = useNavigate();
           const {socketDataLocation,inactivityTime} = useContext(AuthContext);

           inactivityTime()

           useEffect(() => {
               if(user.status === "blocked") {
                navigate("/profile");
               }

                socketDataLocation()
           }, [navigate, socketDataLocation, user.status])

return (
        <div className="container">
            <div className="content">
                <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="feed">
                    <Post />
                    <FeedPost /> 
                    </div>
                <ChatSlim />
                </div>
                <Footer />
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
                 </div>
            </div>
        </div>
    )
}

export { Feed }