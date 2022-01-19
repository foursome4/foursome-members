import { Post } from "../../components/Post/Post"
import { FeedPost } from "../../components/FeedPost/FeedPost"
import { ToolBarLeft } from "../../components/ToolBarLeft/ToolBarLeft"
import { TopBar } from "../../components/TopBar/TopBar"
import { FiThumbsUp, FiMessageCircle, FiTrash2, FiEdit, FiMinus } from 'react-icons/fi'
import avatar from '../../assets/images/avatar.png'
import avatar2 from '../../assets/images/avatar2.png'
import './feed.css'
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { AuthContext } from "../../contexts/Auth"
import { useContext, useEffect } from "react"


function Feed() {
    const {user} = useContext(AuthContext);
    useEffect((user) => {
       function loadUser(user) {

            if(user) {
                console.log(user)
                return user
            }
        }

        loadUser(user)

    }, [user])

return (
        <div className="container">
        <div className="content">
            <ToolBarLeft />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="feed">
                    <Post />
                    <FeedPost /> 
                    </div>
                {/* <ChatBar /> */}
                {/* <ChatSlim /> */}
                </div>
            </div>
        </div>
        </div>
    )
}

export { Feed }