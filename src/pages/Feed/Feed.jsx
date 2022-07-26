import { Post } from "../../components/Post/Post"
import { FeedPost } from "../../components/FeedPost/FeedPost"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './feed.css';
import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/Auth"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import { ListEventsFeed } from "../../components/ListEventsFeed/ListEventsFeed"
import { useNavigate } from 'react-router-dom';
import api from "../../services/api"
import {FiArrowUpCircle} from 'react-icons/fi'
import { toast } from "react-toastify"
import { PostFeed } from "../../components/PostFeed/PostFeed"


function Feed() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    // const LocalInformation = localStorage.getItem("informations-foursome");
    // const userInformation = JSON.parse(LocalInformation);
    // const Localcharacteritics = localStorage.getItem("characteritics-foursome");
    // const usercharacteritics = JSON.parse(Localcharacteritics);
    // const Localpreferences = localStorage.getItem("preferences-foursome");
    // const userpreferences = JSON.parse(Localpreferences);
  
    const id = user.id
    const [myInformations, setMyInformations] = useState(false)
    const navigate = useNavigate();
    const {inactivityTime, logout, socketDataLocation} = useContext(AuthContext);

           inactivityTime();


           useEffect(() => {
            async function searchAccount() {
              const res =  await api.get(`accounts/filter/${id}`);
                console.log(res.data)
                if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                    logout(id)
                } else {
                    console.log("Conta encontrada")
                } 
            }
            async function searchInformations() {
              const res =  await api.get(`informations/${id}`);
                console.log(res.data)
                if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                    logout(id)
                } else {
                    console.log("Informações encontradas")
                } 
            }
            async function searchCharacteristcs() {
              const res =  await api.get(`characteristics/${id}`);
                console.log(res.data)
                if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                    logout(id)
                } else {
                    console.log("Caracteristicas encontradas")
                } 
            }
            async function searchPreferences() {
              const res =  await api.get(`preferences/${id}`);
                console.log(res.data)
                if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                    logout(id)
                } else {
                    console.log("Preferencias encontradas")
                    setMyInformations(true)
                } 
            }

            searchAccount()
            searchInformations()
            searchCharacteristcs()
            searchPreferences()
           }, []);

           
           const loadDateReadFeed = useCallback(async () => {
                     const idAccount = user.id
                     await api.get(`/datereadlogin/${idAccount}`)
                     .then( async (res) => {
                         if(res.data.length !== 0) {
                            const id = res.data[0].id
                            const data = {
                                DateReadLogin: new Date()
                            }
                    
                        await api.patch(`/datereadlogin/${id}`, data).then((res) => {
                            console.log("Data inicial alterada com sucesso!");
                            }).catch(error => {
                            console.log("Erro ao buscar dados" + error)
                        })
                             return;
                         } else {
                             const data = {
                                 idAccount: user.id,
                                 DateReadLogin: new Date() 
                             }
                             await api.post(`/datereadlogin`, data).then(() => {
                                 console.log("Data inicial definida com sucesso!")
                                 return;
                             }).catch(error => {
                         console.log("Erro ao buscar dados" + error)
                     })
                         }
                     }).catch(error => {
                         console.log("Erro ao buscar dados" + error)
                     })
                 
                 }, [user.id]) 
        
            useEffect(() => {
                loadDateReadFeed()
            }, [loadDateReadFeed ]);

           useEffect(() => {

            async function loadUsersOnline() {
               const res = await api.get("/online");
               
               const selectUserOnline = res.data.filter(online => online.idAccount === user.id);
               console.log("selectUserOnline")
               console.log(selectUserOnline)
               console.log(selectUserOnline.length)
   
               if(selectUserOnline.length === 0) {
                   console.log("Cadastrando usuário")
               socketDataLocation()
               }
            }

               if(user.status === "blocked") {
                window.open("/profile", "_self");
               }
 
               loadUsersOnline()
           }, [navigate, socketDataLocation, user.status, user.id]);

           function handleTop(e) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }


return (
        <div className="container">
            <div className="content">
                <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="feed">
                    <ListEventsFeed />
                 <button className="topScroll" onClick={handleTop}><FiArrowUpCircle /></button>
                   {/* {myInformations === false ? "" : <Post />} */}
                    <ChatSlim />
                    <PostFeed />
                    <FeedPost /> 
                    </div>
                    </div>
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
                 </div>
            </div>
        </div>
    )
}

export { Feed }