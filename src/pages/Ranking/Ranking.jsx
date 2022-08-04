import { TopBar } from "../../components/TopBar/TopBar"
import { UsersPending } from "../../components/ButtonsTopBar/SolicitationsFriend/UsersPending/UsersPending"
import './ranking.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import api from "../../services/api"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import {IoFlameOutline, IoVideocamOutline, IoImageOutline} from 'react-icons/io5'
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../contexts/Auth"

function Ranking() {

    const {inactivityTime} = useContext(AuthContext);

    inactivityTime()

    const [photo, setPhoto] = useState([])
    const [video, setVideo] = useState([])
    const [type, setType] = useState("Photo");
    const [month, setMonth] = useState(new Date().getMonth() + 1);


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
                username: photos.username,
                date: photos.created_at
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
                        username: videos.username,
                        date: videos.created_at
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
    function handleSelectMonth(e) {
        setMonth(e.target.value)
    }

    const filterPhotos = photo?.filter((photos) => new Date(photos.date).getMonth() + 1 === parseInt(month) )
    console.log(filterPhotos)
    console.log(month)
    console.log(parseInt(month))
    const filterVideos = video?.filter((videos) => new Date(videos.date).getMonth() + 1 === parseInt(month) )
    console.log(filterVideos)
    console.log(month)
    console.log(parseInt(month))

    if(filterPhotos) {
        filterPhotos.sort(function(a,b) {
            if(a.likes > b.likes ) {
                return -1
            } else {
                return true
            }
        })
    }
    if(photo) {
        console.log(photo)
    }
const limit = filterPhotos.slice(0,10);

    if(filterVideos) {
        filterVideos.sort(function(a,b) {
            if(a.likes > b.likes ) {
                return -1
            } else {
                return true
            }
        })
    }
    
const limitVideo = filterVideos.slice(0,10);

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
                             <h3>Fotos e vídeos mais curtidas 🔥</h3>
                         </div>

                            <div className="buttons">
                                <button className={type === "Photo" ? "selected" : ""} onClick={handleSelectTypePhoto}><IoImageOutline /> Fotos</button>
                                <button className={type === "Video" ? "selected" : ""} onClick={handleSelectTypeVideo}><IoVideocamOutline /> Vídeos</button>
                            </div>

                             <div className="filterMonth">
                                <h5>Veja as 10 melhores de cada mês</h5>
                                <select value={month} onChange={handleSelectMonth}>
                                <option>Escolha o mês</option>
                                <option value="1">Janeiro</option>
                                <option value="2">Fevereiro</option>
                                <option value="3">Março</option>
                                <option value="4">Abril</option>
                                <option value="5">Maio</option>
                                <option value="6">Junho</option>
                                <option value="7">Julho</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>
                            </select>
                            </div>



                            {type === "Photo" ?
                                <div className="ranking-all">
                                {
                                
                                limit.length === 0 ?
                                <h4>Carregando Ranking</h4>
                                :
                                limit.map((photos) => {
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
                            {
                             limitVideo.length === 0 ?
                             <h4>Carregando Ranking</h4>
                             :
                             limitVideo.map((videos) => {
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