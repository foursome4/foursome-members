import { TopBar } from "../../components/TopBar/TopBar"
import { UsersPending } from "../../components/ButtonsTopBar/SolicitationsFriend/UsersPending/UsersPending"
import './ranking.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import api from "../../services/api"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import {IoFlameOutline} from 'react-icons/io5'
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../contexts/Auth"

function Ranking() {

    const {inactivityTime} = useContext(AuthContext);

    inactivityTime()

    const [photo, setPhoto] = useState([])
    const [video, setVideo] = useState([])
    const [type, setType] = useState("Photo");


    useEffect(() => {
        async function loadPostsPhoto() {
        const res = await api.get(`/posts/filter/post-photo`);

    res.data.forEach((photos) => {
         async function loadReactions() {
          const res =  await api.get(`/reactions/counter/${photos.id}`)
            console.log(res.data)
            const data = {
                id: photos.id,
                likes: res.data,
                idAccount: photos.idAccount,
                link: photos.link,
                username: photos.username
            }
        setPhoto(oldOnline => [...oldOnline, data])
        }
        loadReactions()
    })           
        }


        loadPostsPhoto();
    }, []);



    useEffect(() => {
        async function loadPostsVideo() {
        const res = await api.get(`/posts/filter/post-video`);

            res.data.forEach((videos) => {
                async function loadReactions() {
                const res = await api.get(`/reactions/counter/${videos.id}`)
                    console.log(res.data)
                    const dataVideo = {
                        id: videos.id,
                        likes: res.data,
                        idAccount: videos.idAccount,
                        link: videos.link,
                        username: videos.username
                    }
                    setVideo(oldOnline => [...oldOnline, dataVideo])
                }
                loadReactions()
            })  
   
        }
        loadPostsVideo();
    }, []);



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
    
const limit = photo.slice(0,10);

    if(video) {
        video.sort(function(a,b) {
            if(a.likes > b.likes ) {
                return -1
            } else {
                return true
            }
        })
    }
    
const limitVideo = video.slice(0,10);

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
                             <h3>Seja bem vindo ao ranking. <br /> Aqui voc?? ver?? as 10 fotos e v??deos mais curtidas ????</h3>
                         </div>

                            <div className="buttons">
                                <button className={type === "Photo" ? "selected" : ""} onClick={handleSelectTypePhoto}>Ver Ranking Fotos</button>
                                <button className={type === "Video" ? "selected" : ""} onClick={handleSelectTypeVideo}>Ver Ranking V??deos</button>
                            </div>



                            {type === "Photo" ?
                                <div className="ranking-all">
                                {limit.map((photos) => {
                                    return(
                                      <div className="ranking-unic" key={photos.id}>
                                          <div className="title">   
                                           <UsersPending id={photos.idAccount} />                                  
                                          <h3><IoFlameOutline /> {photos.likes} Votos</h3>
                                          </div>
                                          <div className="post">
                                          <img src={photos.link} alt="" />
                                          </div>                                    
                                  </div>
                                    )
                                } )}
                              </div>
                            :
                            type === "Video" ?
                            <div className="ranking-all">
                            {limitVideo.map((videos) => {
                                return(
                                    <div className="ranking-unic" key={videos.id}>
                                    <div className="title">   
                                     <UsersPending id={videos.idAccount} />                                  
                                     <h3><IoFlameOutline /> {videos.likes} Votos</h3>
                                    </div>
                                      <div className="post">
                                      <video controls controlsList="nofullscreen nodownload" >
                                            <source src={videos.link} type="video/mp4"/>
                                            </video>
                                      </div>                                     
                              </div>
                                )
                            } )}
                          </div>
                          :
                            ""
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Ranking }