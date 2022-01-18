import { ChatSlim } from '../../components/ChatSlim/ChatSlim'
import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import avatar2 from '../../assets/images/avatar2.png'
import avatarCircle from '../../assets/images/avatarCircle.png'
import './chat.css';

   



function Chat() {
  return (
    <div className="content-profile">
      <ToolbarLeftSlim />
      <div className="profile">
        <TopBar />
        <div className="main">
         <div className="section">
             <div className="messages">
                 <div className="messages1">
                <div className="message-friend">
                    <img src={avatar2} alt="" />
                    <p>Olá, Tudo bem?</p>
                </div>
                 </div>
                 <div className="messages2">
                <div className="my-message">
                <img src={avatarCircle} alt="" />
                    <p>Tudo bem. Muito Prazer!</p>
                </div>
                 </div>
                 <div className="messages1">
                <div className="message-friend">
                    <img src={avatar2} alt="" />
                    <p>Participa deste site a muito tempo?</p>
                </div>
                 </div>
                 <div className="messages2">
                <div className="my-message">
                <img src={avatarCircle} alt="" />
                    <p>Sim. Desde o lançamento. <br /> É o melhor site que já participei!</p>
                </div>
                 </div>
              <span>Ana Julia está digitando...</span>  
            </div>
            <div className="text">
                <textarea name="" id="" cols={10} rows={3} autoFocus autoComplete='off' placeholder='Digite uma mensagem'></textarea>
                <button>Enviar</button>
            </div>
         </div>
         <ChatSlim />
        </div>
      </div>
    </div>
  )
}

export { Chat }