import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import { TopBar } from "../../components/TopBar/TopBar"
import { IoCalendarOutline, IoList, IoRadio,IoMailUnreadOutline, IoPersonOutline, IoCashOutline, IoSettingsOutline, IoPeopleOutline, IoMenuOutline, IoCameraOutline, IoArrowBackOutline,
    IoInformationCircleOutline, IoChatbubblesOutline, IoMailOutline, IoNewspaperOutline, IoBusinessOutline, IoMailOpenOutline, IoStatsChartOutline, IoCloseOutline, IoWalletOutline } from "react-icons/io5"
import "./menu.css"

function Menu() {
    return (
        <div className="container">
            <TopBar />
        <div className="content">
        <div className="menu">
            <div className="unic">
                <a href="/profile" className="Primary"><IoPersonOutline />Meu perfil</a>
                <a href="/settings"><IoSettingsOutline />Configurações</a>
            </div>
            <div className="double">
                <div className="unic">
                    <a href="/groups" className="Primary"><IoPeopleOutline />Grupos</a>
                </div>
                <div className="unic">
                    <a href="/events" className="Primary"><IoCalendarOutline />Eventos</a>
                </div>
            </div>
            <div className="double">
                <div className="unic"> 
                    <a href="/messages" className="Primary"><IoChatbubblesOutline /> Mensagens</a>
                </div>
                <div className="unic">
                    <a href="/recados" className="Primary"><IoMailUnreadOutline /> Recados</a>
                </div>
            </div>
            <div className="double">
                <div className="unic">
                    <a href="/invite" className="Primary"><IoMailOutline /> Convite</a>
                </div>
                <div className="unic">
                    <a href="/foruns" className="Primary"><IoList />Fóruns</a>
                </div>
            </div>
            <div className="double">
                <div className="unic">
                    <a href="/ranking" className="Primary"><IoStatsChartOutline />Ranking</a>
                </div>
                <div className="unic">
                    <a href="/radar" className="Primary"><IoRadio />Radar</a>
                </div>
            </div>
            <div className="double">
                <div className="unic">
                    <a href="/plains" className="Primary"><IoWalletOutline />Pagamentos</a>
                </div>
                <div className="unic">
                    <a href="/infos" className="Primary"><IoInformationCircleOutline />Informações</a>
                </div>
            </div>
</div>
</div>
<BarBottomMenu />
        </div>
    )
}

export {Menu}