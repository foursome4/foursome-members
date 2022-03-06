import { ChatSlim } from '../../components/ChatSlim/ChatSlim'
import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import profile from '../../assets/images/profile.jpg';
import './chat.css';
import { useState, useEffect, useRef} from 'react'
import { Link, useParams } from 'react-router-dom'
import { socket } from '../../services/websocket'
import api from '../../services/api'
import { FiSend, FiUpload } from 'react-icons/fi'
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import {DeleteMessage} from '../../components/DeleteMessage/DeleteMessage'
import { BarBottomMenu } from '../../components/BarBottomMenu/BarBottomMenu';

   
function Chat() {
  const {room, idFriend} = useParams();
  const messageRef = useRef(null)
  
  const Local = localStorage.getItem("foursome");
  const user = JSON.parse(Local);
  const LocalInformations = localStorage.getItem("informations-foursome");
  const userInformations = JSON.parse(LocalInformations);

  console.log(`User: ${user.id}`)
  console.log(`Room: ${room}`)
  console.log(`IdFriend: ${idFriend}`)

  const [listMessages, setListMessages] = useState([]);
  const [text, setText] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [imageAvatar, setImageAvatar] = useState('');
  const [loadding, setLoadding] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if(messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
    async function findMessages() {
      const idRoom = room
      await api.get(`/messages/${idRoom}`).then((result) => {
        console.log("Mensagens do banco de dados")
        console.log(result.data)
        setListMessages(result.data);
      })
    }
    findMessages()
  }, [room])

  socket.emit("select_room", {
    room,
    idAccount: user.id,
    idFriend: idFriend
  }, (messages) => {

  })

  function handleFile(e) {
    console.log(e.target.files[0])

   if(e.target.files[0]){
       const image = e.target.files[0];

       if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
           setImageAvatar(image);
           setAvatarUrl(URL.createObjectURL(e.target.files[0]));
           console.log(avatarUrl);
           handleUploadAccount(image)
        } else {
            console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
            setImageAvatar(null);
            return null;
        }
    }
}



async function handleUploadAccount(img) {

  setLoadding(true);
  console.log(loadding);
  const uuid = uuidv4();

  console.log(imageAvatar)
  let newAvatarUrlFirebase = ref(storage, `images/image-chat/${uuid}`);
  let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, img);
  let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
      
  console.log(uploadAvatar.ref.name, photoUrlAvatar);

  
  const data = {
    room: room,
    idAccount: user.id,
    text,
    link: photoUrlAvatar,
    avatar: userInformations.avatar,
    nickname: userInformations.nickname,
    username: user.username,
    created_at: new Date()
  }
  console.log(data);

   socket.emit("message", data)
    setListMessages([data, ...listMessages]);
    setText("");
    setAvatarUrl(null);
    setImageAvatar('');

}
  function handleNewMessage(e) {
    e.preventDefault();
    
    const data = {
      room: room,
      idAccount: user.id,
      text,
      link: "",
      avatar: userInformations.avatar,
      nickname: userInformations.nickname,
      username: user.username,
      created_at: new Date()
    }
    console.log(data);
    socket.emit("message", data)
    setListMessages([data, ...listMessages]);
    setText("")
  }
  
  socket.on("message", (data) => {
    setListMessages([data, ...listMessages]);
  })


function handlePressMessage() {
  if(click === false) {
    setClick(false)
  } else {
    setClick(false)
  }
}


  return (
    <div className="content">
      <ToolbarLeftSlim />
      <BarBottomMenu />
      <div className="chat">
        <TopBar />
        <div className="main-chat">
         <div className="section-chat">
             <div className="messages" ref={messageRef}>

               {listMessages.map((message) => {
                 return (
                  message.idAccount === user.id ?
                  <div className={message.idAccount === user.id ? "messages2" : "messages1"} key={message.id} >
                  <div className={message.idAccount === user.id ? "my-message" : "message-friend"} onClick={handlePressMessage}>
                  
                       <div className="data">
                       <Link to={message.idAccount === user.id ? `/profile` : `/profile-friend/${message.idAccount}`}>
                        <p><b>Eu</b></p>
                        </Link>
                       <h5>{message.text}</h5>
                     {message.link !== "" ?
                       <div className="image">
                    
                            <img src={message.link} alt="" />
                                            <div className="mark">
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                         </div>
                    
                      </div>
                      : ""}
                    {click === true ?  message.idAccount === user.id ? <DeleteMessage _id={message._id} /> : "" :
                      ""}
                       </div>
                       <div className="avatar">                     
                       <a href={message.idAccount === user.id ? `/profile` : `/profile-friend/${message.idAccount}`}>             
                      <img src={message.avatar} alt="" />
                      </a>  
                    </div>
                  </div>
                   </div>
                  :
                  <div className="messages1" key={message.id}>
                  <div className="message-friend">
                  <div className="avatar">     
                  <a href={message.idAccount === user.id ? `/profile` : `/profile-friend/${message.idAccount}`}>             
                      <img src={message.avatar} alt="" />
                      </a>   
                    </div>
                       <div className="data">
                       <a href={message.idAccount === user.id ? `/profile` : `/profile-friend/${message.idAccount}`}>
                        <p><b>{message.nickname}</b></p>
                       </a>
                       <p>{message.text}</p>
                     {message.link !== "" ?
                       <div className="image">
                            <img src={message.link} alt="" />
                                        <div className="mark">
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                         </div>
                       
                      </div>
                      : ""}
                      {click === true ?   message.idAccount === user.id ? <DeleteMessage _id={message._id} /> : "" :
                      ""}
                       </div>
                  </div>
                   </div>
                 
                 )
               })}

            </div>
            <div className="text">
            <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile}/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={45} width={45}/>
                        </label>
                <textarea name="" id=""  value={text} autoFocus  autoComplete='off' placeholder='Digite uma mensagem' onChange={(e) => setText(e.target.value)}></textarea>
                <button className="button1" onClick={handleNewMessage} disabled={text === "" ? "disabled" : ""}>Enviar <FiSend /></button>
                <button className="button2" onClick={handleNewMessage} disabled={text === "" ? "disabled" : ""}><FiSend /></button>
            </div>
            <br />

         </div>
         <ChatSlim />
        </div>
      </div>
    </div>
  )
}

export { Chat }