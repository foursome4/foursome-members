import { Post } from "../../components/Post/Post"
import { ToolBarLeft } from "../../components/ToolBarLeft/ToolBarLeft"
import { TopBar } from "../../components/TopBar/TopBar"
import { FiThumbsUp, FiMessageCircle, FiTrash2, FiEdit, FiMinus } from 'react-icons/fi'
import avatar from '../../assets/images/avatar.png'
import avatar2 from '../../assets/images/avatar2.png'
import './feed.css'
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { useContext } from "react/cjs/react.development"
import { AuthContext } from "../../contexts/Auth"
import { useEffect } from "react"


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
                        <div className="posts-feed">
                            <div className="buttons">
                                <button className='selected'> Feed </button>
                                <button> Posts </button>
                                <button> Fotos </button>
                                <button> Vídeos </button>
                                <button> Grupos </button>
                                <button> Fóruns </button>
                            </div>
                        
                            {/* Posts do Feed */}
                            <div className="feed-post">
                                <div className="post-user">
                                    <img src={user !== null ? user.avatar : avatar} alt="" />
                                    <div className="info-data">
                                       <div className="name-data">
                                       <h4 className="selected">{user !== null ? user.nickname : "User Test"}</h4>
                                        <h4> <FiMinus /> </h4>
                                        <h4>Festas a dois</h4>
                                       </div>
                                       <div className="time-data">
                                           <h5>3 Horas e 24 Minutos</h5>
                                       </div>
                                    </div>
                                </div>

                                <div className="post-data">
                                    <p>
                                        Vamos curtir o fim de semana na presença de nossos melhores amigos. <br />
                                        Não há nada melhor
                                    </p>
                                </div>

                                <div className="reactions">
                                    <button className="selected">
                                        <FiThumbsUp />
                                        Curtir
                                    </button>
                                    <button>
                                        <FiMessageCircle />
                                        Comentar
                                    </button>
                                    <button>
                                        <FiEdit />
                                        Editar
                                    </button>
                                    <button>
                                        <FiTrash2 />
                                        Apagar
                                    </button>
                                </div>
                            </div>

                            <div className="feed-post">
                                <div className="post-user">
                                    <img src={avatar2} alt="" />
                                    <div className="info-data">
                                       <div className="name-data">
                                       <h4 className="selected">"Juliana Moura"</h4>
                                       </div>
                                       <div className="time-data">
                                           <h5>3 Horas e 24 Minutos</h5>
                                       </div>
                                    </div>
                                </div>

                                <div className="post-data">
                                    <p>
                                        Fim de ano chegando, que venha 2022, com muitas conquistas e vitórias!
                                    </p>
                                </div>

                                <div className="reactions">
                                    <button className="selected">
                                        <FiThumbsUp />
                                        Curtir
                                    </button>
                                    <button>
                                        <FiMessageCircle />
                                        Comentar
                                    </button>
                                    <button>
                                        <FiEdit />
                                        Editar
                                    </button>
                                    <button>
                                        <FiTrash2 />
                                        Apagar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* <ChatBar /> */}
                <ChatSlim />
                </div>
            </div>
        </div>
        </div>
    )
}

export { Feed }