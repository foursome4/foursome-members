import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import { Footer } from "../../components/Footer/Footer"
import './ranking.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import api from "../../services/api"
import { CountReactions } from "../../components/CountReactions/CountReactions"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../contexts/Auth"

function Ranking() {

    const {inactivityTime} = useContext(AuthContext);

    inactivityTime()

    const [photo, setPhoto] = useState([])
    const [video, setVideo] = useState([])
    const [type, setType] = useState("All");

    const [dados, setDatos] = useState([]);
    const list = [];
    useEffect(() => {
        async function loadPostsPhoto() {
        const res = await api.get(`/posts/filter/post-photo`);

    res.data.forEach((photos) => {
         async function loadReactions() {
           await api.get(`/reactions/${photos.id}`).then((res) => {
            console.log(res.data.length)
            const data = {
                id: photos.id,
                likes: res.data.length,
                idAccount: photos.idAccount,
                link: photos.link,
                username: photos.username
            }
            list.push(data)
           })
        }
        loadReactions()
    })            
        }


        loadPostsPhoto();
        setPhoto(list);
    }, []);

    console.log("dados")
    console.log(photo)

    useEffect(() => {
        async function loadPostsVideo() {
        const res = await api.get(`/posts/filter/post-video`);
        const dataVideo = (res.data)
        // console.log("Vídeos")
        // console.log(res.data)
        setVideo(dataVideo)
        }

        loadPostsVideo();
    }, [])

    function handleSelectTypePhoto() {
        setType("Photo")
    }

    function handleSelectTypeVideo() {
        setType("Video")
    }



    if(photo) {
        photo.sort(function(a,b) {
            if(a.likes > b.likes ) {
                return -1
            } else {
                return true
            }
        })
    }

    console.log(photo)
    
const limit = photo.slice(0,10);

    return (
        <div className="content">
     <ToolbarLeftSlim />
     <BarBottomMenu />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="ranking">
                            <div className="ranking-selected">
                                <button className="selected">Ranking de curtidas</button>
                            </div>

                            <div className="text">
                             <h3>Seja bem vindo ao ranking. Aqui você verá as fotos mais curtidas 🔥</h3>
                         </div>

                            <div className="buttons">
                                <button onClick={handleSelectTypePhoto}>Ver Ranking Fotos</button>
                                <button onClick={handleSelectTypeVideo}>Ver Ranking Vídeos</button>
                            </div>



                            {type === "Photo" ?
                                <div className="ranking-all">
                                {limit.map((photos) => {
                                    return(
                                      <div className="ranking-unic" key={photos.id}>
                                          <h1>{photos.likes} Votos</h1>
                                          <div className="title">   
                                          <div className="image">
                                             <img src={photos.username} alt="" className="profile"/>
                                          </div>                                       
                                             <h5><Link to={`profile-friend/${photos.idAccount}`}>{photos.username}</Link></h5>
                                          </div>
                                          <div className="post">
                                          <img src={photos.link} alt="" />
                                          </div>
                                         {/* <CountReactions idPost={photos.idAccount} /> */}
                                          
                                  </div>
                                    )
                                } )}
                              </div>
                            :
                            type === "Video" ?
                            <div className="ranking-all">
                            {video.map((videos) => {
                                return(
                                  <div className="ranking-unic"  key={videos.id}>
                                      <div className="title">   
                                      <div className="image">
                                         <img src={videos.avatar} alt="" className="profile"/>
                                      </div>                                       
                                         <h5><a href={`profile-friend/${videos.idAccount}`}>{videos.nickname}</a></h5>
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
                            ""
                            }
                    </div>
                <ChatSlim />
                </div>
            </div>
        </div>
    )
}

export { Ranking }