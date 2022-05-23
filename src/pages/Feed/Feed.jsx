import { Post } from "../../components/Post/Post"
import { FeedPost } from "../../components/FeedPost/FeedPost"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './feed.css';
import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/Auth"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import { ListEventsFeed } from "../../components/ListEventsFeed/ListEventsFeed"
import { useNavigate } from 'react-router-dom';
// import apiGoogleReverse from '../services/apiGoogleReverse';


function Feed() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    // const [lat, setlat] = useState("");
    // const [long, setLong] = useState("");
    // const [city, setCity] = useState("");
    // const [uf, setUf] = useState("");


    const navigate = useNavigate();
           const {inactivityTime} = useContext(AuthContext);

           inactivityTime()

           useEffect(() => {
               if(user.status === "blocked") {
                navigate("/profile");
               }
           }, [navigate, user.status]);


//            useEffect(() => {
//              // Location
//  function socketDataLocation() {
//     function success(position) {
//         const latitude  = position.coords.latitude;
//         const longitude = position.coords.longitude;
    
//         setlat(latitude)
//         setLong(longitude)
   
//        reverseGeolocalization(latitude, longitude)
//       }
    
//       function error() {
//         console.log('Unable to retrieve your location');
//       }
   
//       function getLocation() {
//        return window.navigator.geolocation.getCurrentPosition(success, error);
//         }
   
//         async function reverseGeolocalization(lat, long) {
//         const address = await apiGoogleReverse.get(`json?latlng=${lat},${long}&key=AIzaSyAKKy0iHlEZMQavlxNM5i-tkIYp4q7X_Y0`);

//         setCity(address.data.results[0].address_components[3].long_name)
//         setUf(address.data.results[0].address_components[4].short_name) 
//      }

//     const DataUser = localStorage.getItem("foursome");
//     const user = JSON.parse(DataUser);
//     const LocalInformation = localStorage.getItem("informations-foursome");
//     const userInformations = JSON.parse(LocalInformation);

//     async function getInformations() {

//         let usersOnline = [];
//         await api.get("/online").then((res) => {
//            usersOnline = res.data
//         })
       
//         let selectUserOnline = usersOnline.filter(online => online.idAccount === user.id);

       
//         let equalCity = " "
//         if(city === userInformations.city && uf === userInformations.uf ) {
//         equalCity = true
//         } else {
//         equalCity = false
//         }

//         const data = {
//         idAccount: user === undefined ? "" : user.id,
//         username: user.username,
//         nickname: userInformations.nickname,
//         avatar: userInformations.avatar,
//         lat: lat.toString(),
//         long: long.toString(),
//         city,
//         uf,
//         equalCity: equalCity
//         }

//         if(data.idAccount && data.username && data.nickname && data.avatar && data.lat && data.long && data.city && data.uf !== "") {

//                 socket.on("connection", () => {
//                     console.log("Conexão estabelecida")
//                 })

//                 if(selectUserOnline.length !== 0) {
//                     console.log("Usuário ja está online")
//                     return;
//                 }

//                 await api.post("/online", data).then(() => {
//                     console.log("Cadastrando usuário")
//                 })

//             } else {
//                 console.log("Informações não coletadas com sucesso!")
//             }
//     }

//     getLocation()
//     getInformations()
// }

//            }, [])

return (
        <div className="container">
            <div className="content">
                <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="feed">
                        <ListEventsFeed />
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