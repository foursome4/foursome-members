import './feedReply.css';
import { UserReply } from '../UserReply/UserReply';
import { useFetch } from '../../hooks/useFetch';

function FeedReply({idComment}) {

    const {data} = useFetch(`/reply/${idComment}`);




    return (
        data?.length === 0 ? "" :    
        <div className="feedReply">
           
                             {data?.map((replys) => {
                                 return (
                                    <div className="feed-reply" key={replys.id}>
                                    <UserReply idAccount={replys.idAccount} username={replys.username} date={replys.created_at} text={replys.text} id={replys.id}/>
                                    </div>
                                 )
                             })}
        </div>                       
    )
}

export {FeedReply}