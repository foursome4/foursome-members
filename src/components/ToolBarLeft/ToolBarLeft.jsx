import {FiHome, FiVideo, FiImage, FiUsers, FiUser,  FiMessageSquare, FiTrendingUp, FiList,  FiRadio, FiCalendar } from 'react-icons/fi';
import {FaVenus, FaMars} from 'react-icons/fa'
import avatarCasal from '../../assets/images/avatarCasal.png'
import './toolBarLeft.css'
// import { useContext } from 'react';


function ToolBarLeft() {

    // function handleFunctionActiveUser(e) {
    //     e.preventDefault();

    //     console.log("Function Active true")
    // }

    return (
        <div className='ToolBar'>
            <div className="avatar">
                <img src={avatarCasal} alt="" />
            </div>
            <div className="info">
                <div className="name">
                    <h3>Jeferson Macedo</h3>
                    <h5>@jefersonmmacedo</h5>
                    <h6>Membro / Homem</h6>
                </div>
                <h4><FaMars size={18} /> </h4>
                <div className="info-user-man">
                    <div className="info-user-data">
                        <h5>Idade</h5>
                        <p>29 Anos</p>
                    </div>
                    <div className="info-user-data">
                        <h5>Signo</h5>
                        <p>Capricórnio</p>
                    </div>
                    <div className="info-user-data">
                        <h5>Opção</h5>
                        <p>Hétero</p>
                    </div>
                </div>
                <h4><FaVenus size={18} /> </h4>
                <div className="info-user-woman">
                    <div className="info-user-data">
                        <h5>Idade</h5>
                        <p>25 Anos</p>
                    </div>
                    <div className="info-user-data">
                        <h5>Signo</h5>
                        <p>Sagitário</p>
                    </div>
                    <div className="info-user-data">
                        <h5>Opção</h5>
                        <p>Bi-Sexual</p>
                    </div>
                </div>
                <h4><FaVenus size={18} /> </h4>
                <div className="info-user-woman">
                    <div className="info-user-data">
                        <h5>Idade</h5>
                        <p>25 Anos</p>
                    </div>
                    <div className="info-user-data">
                        <h5>Signo</h5>
                        <p>Sagitário</p>
                    </div>
                    <div className="info-user-data">
                        <h5>Opção</h5>
                        <p>Bi-Sexual</p>
                    </div>
                </div>
                <hr />
                {/* <div className="info-social">
                    <div className="info-social-data">
                        <p>150</p>
                        <h5>Amigos</h5>
                    </div>
                    <div className="info-social-data">
                        <p>15</p>
                        <h5>Fotos</h5>
                    </div>
                    <div className="info-social-data">
                        <p>5</p>
                        <h5>Vídeos</h5>
                    </div>
                </div> */}
            </div>
            <div className="tools">
                <div className="toolsOne">
                    <div className="toolIcon">
                        <FiHome size={18}/>
                        <p>Feed</p>
                    </div>
                    <div className="toolIcon">
                        <FiVideo size={18}/>
                        <p>Vídeos</p>
                    </div>
                    <div className="toolIcon">
                        <FiUsers size={18}/>
                        <p>Grupos</p>
                    </div>
                    <div className="toolIcon">
                        <FiMessageSquare size={18}/>
                        <p>Chat</p>
                    </div>
                    <div className="toolIcon">
                        <FiTrendingUp size={18}/>
                        <p>Ranking</p>
                    </div>
                </div>
                <div className="toolsTwo">
                    <div className="toolIcon">
                        <FiImage size={18}/>
                        <p>Fotos</p>
                    </div>
                    <div className="toolIcon">
                        <FiUser size={18}/>
                        <p>Amigos</p>
                    </div>
                    <div className="toolIcon">
                        <FiList size={18}/>
                        <p>Fóruns</p>
                    </div>
                    <div className="toolIcon">
                        <FiRadio size={18}/>
                        <p>Radar</p>
                    </div><div className="toolIcon">
                        <FiCalendar size={18}/>
                        <p>Eventos</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export {ToolBarLeft}