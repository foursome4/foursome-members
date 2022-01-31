import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import api from "../../services/api";
import './video.css'




function Video({idAccount, type}) {
    const [data, setData] = useState([])

    useEffect(() => {
        async function findPosts(){
          const res = await api.get(`/posts/filter/${idAccount}/${type}`);
          console.log("Veus videos")
          console.log(res.data)
          setData(res.data)
      }

      findPosts()

  }, [])


    return(
        <div className="videos">
                    {data.map((video) => {
                        return (
                            <div className="video" key={video.id}>
                                        <video controls >
                                            <source src={video.link} type="video/mp4"/>
                                        </video>
                            </div>
                        )
                    })}
        </div>
    )
}

export { Video }