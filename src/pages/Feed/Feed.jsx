import { Post } from "../../components/Post/Post"
import { FeedPost } from "../../components/FeedPost/FeedPost"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './feed.css';
import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/Auth"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"


function Feed() {
            const {socketDataLocation} = useContext(AuthContext)
           useEffect(() => {
            socketDataLocation()
           })


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
                     <ToolbarLeftSlim />
                     <BarBottomMenu />
                </div>
            </div>
        </div>
    )
}

export { Feed }