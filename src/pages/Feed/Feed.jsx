import { Post } from "../../components/Post/Post"
import { FeedPost } from "../../components/FeedPost/FeedPost"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './feed.css';


function Feed() {
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
                </div>
            </div>
        </div>
    )
}

export { Feed }