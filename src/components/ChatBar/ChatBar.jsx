import avatarImg from '../../assets/images/avatar.png'
import './chatBar.css'

function ChatBar(){
    return (
        <div className="chatBar">
            <div className="friendsOnline">
                <h4>Amigos Online</h4>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>



            </div>
            <div className="friendsOffline">
                <h4>Meus Amigos</h4>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
                
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
                <div className="friend">
                    <img src={avatarImg} alt="" />
                    <h5>@jefersonmmacedo</h5>
                </div>
            </div>
        </div>
    )
}

export {ChatBar}