import './feedPost.css';
import { useState, memo, useEffect} from 'react';
import { ItemFeed } from '../ItemFeed/ItemFeed';
import { useFetch } from '../../hooks/useFetch';
import gifLoader from '../../assets/images/gif/loader.gif';

function FeedPostComponent() {
    const [followers, setFollowers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

      const perPage = 5;
      const {data} = useFetch(`https://api-foursome.herokuapp.com/posts/all?page=${currentPage}&limit=${perPage}`);

      useEffect(() => {
          if(data) {
              setFollowers(oldFollowers => [...oldFollowers, ...data])
          }
    }, [data]);

  
    useEffect(() => {
      const intersectionObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          console.log('Sentinela appears!', currentPage + 1)
          setCurrentPage((currentValue) => currentValue + 1);
        }
      })
      intersectionObserver.observe(document.querySelector('#sentinela'));
      return () => intersectionObserver.disconnect();
    }, []);


  if(!followers) {
        return (
            <div className="load">
                <h3>Carregando...</h3>
            </div>
        )
    }

    return (

        <div className="feedPost">
            <div className="posts-feed">
                                {followers?.map((postsData => {
                                    return (   
                                        <div className="preItem" key={postsData.id}>
                             {postsData.type === "post-text" ||
                             postsData.type === "post-text-group" ||
                             postsData.type === "post-photo" ||
                             postsData.type === "post-video" ||                  
                             postsData.type === "post-photo-group" ||                   
                             postsData.type === "post-video-group" ?   
                                 <ItemFeed idAccount={postsData.idAccount} link={postsData.link}
                                           date={postsData.created_at} text={postsData.text}
                                           type={postsData.type} id={postsData.id}
                                           username={postsData.username} group={postsData.nameGroup}
                                           forum={postsData.nameForum}/>
                                           : "" }
   
                                           </div> 
                                )
                            }))}
                            <div id="sentinela">
                                <div className="image">
                                    <img src={gifLoader} alt="Gif LOader more posts" />
                                    </div></div>              
                           </div>
        </div>                                
    )
}

export const FeedPost = memo(FeedPostComponent)