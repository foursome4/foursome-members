import { Post } from "../../components/Post/Post"
import { FeedPost } from "../../components/FeedPost/FeedPost"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './feed.css';
import { useEffect, useState } from "react"
import apiGoogleReverse from "../../services/apiGoogleReverse"
import { socket } from '../../services/websocket'

function Feed() {

           // Data informations
           const Local = localStorage.getItem("foursome");
           const user = JSON.parse(Local);
           const LocalInformation = localStorage.getItem("informations-foursome");
           const userInformation = JSON.parse(LocalInformation);


           const [lat, setlat] = useState("");
           const [long, setLong] = useState("");
           const [city, setCity] = useState("");
           const [uf, setUf] = useState("");

    useEffect(() => {
        function success(position) {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
        
            console.log(latitude)
            setlat(latitude)
            console.log(longitude)
            setLong(longitude)

           reverseGeolocalization(latitude, longitude)
          }
        
          function error() {
            console.log('Unable to retrieve your location');
          }

        function getLocation() {
           return window.navigator.geolocation.getCurrentPosition(success, error);
            }

               async function reverseGeolocalization(lat, long) {
                  const address = await apiGoogleReverse.get(`json?latlng=${lat},${long}&key=AIzaSyAKKy0iHlEZMQavlxNM5i-tkIYp4q7X_Y0`);
                  console.log("Cidade")
                  setCity(address.data.results[0].address_components[3].long_name)
                  console.log(address.data.results[0].address_components[3].long_name)
                  console.log("UF")
                  setUf(address.data.results[0].address_components[4].short_name)
                  console.log(address.data.results[0].address_components[4].short_name)
               }


            getLocation()
            
    }, []);


    let equalCity = " "

    if(city === userInformation.city && uf === userInformation.uf ) {
        equalCity = true
    } else {
        equalCity = false
    }

    const data = {
        idAccount: user.id,
        username: user.username,
        nickname: userInformation.nickname,
        avatar: userInformation.avatar,
        lat: lat.toString(),
        long: long.toString(),
        equalCity: equalCity
    }

    console.log("data");
    console.log(data);
   
    socket.emit("userOnline", data)


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