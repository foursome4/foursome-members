import "./distanceFromUser.css";

function DistanceFromUser({myLat, myLong, latFriend, longFriend}) {

let distance = 0;
function getDistanceFromLatLonInKm(myLat, myLong, latFriend, longFriend) {
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        dLat = deg2rad(latFriend - myLat),
        dLng = deg2rad(myLong - longFriend),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(myLat))
            * Math.cos(deg2rad(latFriend))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        // console.log(((R * c *1000)/10).toFixed());
        // console.log("Teste de Distancia")
        // console.log((R * c*1000)/1000)

        const distanceCalc = (R * c).toString();
        
        if(distanceCalc.includes("00.")) {
            distance = "- " + ((R * c *1000)/1000).toFixed()
        } else{
            distance = ((R * c *1000)/1000).toFixed()
        }
    return ((R * c *1000).toFixed());
}

getDistanceFromLatLonInKm(myLat, myLong, latFriend, longFriend )


    return (
        <>
        <h6>{distance === "0" ? "- 1Km de você" : `+/- ${distance}Km de você`}</h6>
        </>
    )
}

export {DistanceFromUser}