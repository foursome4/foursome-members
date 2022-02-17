import { ChatSlim } from '../../components/ChatSlim/ChatSlim'
import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import avatar2 from '../../assets/images/avatar2.png'
import avatarCircle from '../../assets/images/avatarCircle.png'
import './chat.css';
import { useState} from 'react'
import { useParams } from 'react-router-dom'
import { socket } from '../../services/websocket'

   
function Chat() {
  const {room, idFriend} = useParams();
  
  const Local = localStorage.getItem("foursome");
  const user = JSON.parse(Local);
  const LocalInformations = localStorage.getItem("informations-foursome");
  const userInformations = JSON.parse(LocalInformations);

  console.log(`User: ${user.id}`)
  console.log(`Room: ${room}`)
  console.log(`IdFriend: ${idFriend}`)

  const [message, setMessage] = useState('');
  const [listMessages, setListMessages] = useState([]);
  const [text, setText] = useState('');
  const [link, setLink] = useState('');

  socket.emit("select_room", {
    room,
    idAccount: user.id,
    idFriend: idFriend
  }, (messages) => {
    console.log(messages);
    // setListMessages([...listMessages, res]);
    messages.forEach((message) => {
     // setListMessages([...listMessages, message]);
    })

  })

  function handleNewMessage(e) {
    e.preventDefault();
    
    const data = {
      room: room,
      idAccount: user.id,
      text,
      link,
      avatar: userInformations.avatar,
      nickname: userInformations.nickname,
      username: user.username
    }
    console.log(data);
    socket.emit("message", data)
    setListMessages([...listMessages, data]);
    setText("")
  }
  
  socket.on("message", (data) => {
    setListMessages([...listMessages, data]);
  })

  return (
    <div className="content-profile">
      <ToolbarLeftSlim />
      <div className="profile">
        <TopBar />
        <div className="main">
         <div className="section">
             <div className="messages">

               {listMessages.map((message) => {
                 return (
                  <div className={message.idAccount === user.id ? "messages2" : "messages1"} key={message.id}>
                  <div className={message.idAccount === user.id ? "my-message" : "message-friend"}>
                      <img src={message.idAccount === user.id ? avatarCircle : avatar2} alt="" />
                        <p>{message.text}</p>
                  </div>
                   </div>
                 )
               })}

              <span>Ana Julia está digitando...</span>  
            </div>
            <div className="text">
                <textarea name="" id="" cols={10} rows={3} value={text} autoFocus  autoComplete='off' placeholder='Digite uma mensagem' onChange={(e) => setText(e.target.value)}></textarea>
                <button onClick={handleNewMessage} disabled={text === "" ? "disabled" : ""}>Enviar</button>
            </div>
         </div>
         <ChatSlim />
        </div>
      </div>
    </div>
  )
}

export { Chat }