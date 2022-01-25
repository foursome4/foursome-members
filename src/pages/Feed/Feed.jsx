import { Post } from "../../components/Post/Post"
import { FeedPost } from "../../components/FeedPost/FeedPost"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './feed.css'
import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth"

function Feed() {

return (
        <div className="container">
        <div className="content">
            <ToolbarLeftSlim />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="feed">
                    <Post />
                    <FeedPost /> 
                    </div>
                <ChatSlim />
                </div>
            </div>
        </div>
        </div>
    )
}

export { Feed }