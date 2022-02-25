import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './ranking.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link } from "react-router-dom"
import { CountReactions } from "../../components/CountReactions/CountReactions"

function Ranking() {

    const [photo, setPhoto] = useState([])
    const [video, setVideo] = useState([])
    const [type, setType] = useState("Photo")

    useEffect(() => {
        async function loadPostsPhoto() {
        const res = await api.get(`/posts/filter/post-photo`);
        const dataPhoto = (res.data)
        console.log("Fotos")
        console.log(res.data)
        setPhoto(dataPhoto)
        }
        async function loadPostsVideo() {
        const res = await api.get(`/posts/filter/post-video`);
        const dataVideo = (res.data)
        console.log("Vídeos")
        console.log(res.data)
        setVideo(dataVideo)
        }

        loadPostsPhoto();
        loadPostsVideo();
    }, [])

    function handleSelectTypePhoto() {
        setType("Photo")
    }

    function handleSelectTypeVideo() {
        setType("Video")
    }


    return (
        <div className="content">
     <ToolbarLeftSlim />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="ranking">
                            <div className="ranking-selected">
                                <button className="selected">Ranking de curtidas</button>
                            </div>

                            <div className="buttons">
                                <button onClick={handleSelectTypePhoto}>Ranking Fotos</button>
                                <button onClick={handleSelectTypeVideo}>Ranking Vídeos</button>
                            </div>

                            {type === "Photo" ?
                                <div className="ranking-all">
                                {photo.map((photos) => {
                                    return(
                                      <div className="ranking-unic">
                                          <div className="title">   
                                          <div className="image">
                                             <img src={photos.avatar} alt="" className="profile"/>
                                          </div>                                       
                                             <h5><Link to={`profile-friend/${photos.idAccount}`}>{photos.nickname}</Link></h5>
                                          </div>
                                          <div className="post">
                                          <img src={photos.link} alt="" />
                                          </div>
                                         <CountReactions idPost={photos.id} />
                                          
                                  </div>
                                    )
                                } )}
                              </div>
                            :
                            type === "Video" ?
                            <div className="ranking-all">
                            {video.map((videos) => {
                                return(
                                  <div className="ranking-unic">
                                      <div className="title">   
                                      <div className="image">
                                         <img src={videos.avatar} alt="" className="profile"/>
                                      </div>                                       
                                         <h5><Link to={`profile-friend/${videos.idAccount}`}>{videos.nickname}</Link></h5>
                                      </div>
                                      <div className="post">
                                      <video controls controlsList="nofullscreen nodownload" >
                                            <source src={videos.link} type="video/mp4"/>
                                            </video>
                                      </div>
                                     <CountReactions idPost={videos.id} />
                                      
                              </div>
                                )
                            } )}
                          </div>
                          :
                          "Nada a mostrar. Escolha um ranking"
                            }

                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                    </div>
                <ChatSlim />
                </div>
            </div>
        </div>
    )
}

export { Ranking }