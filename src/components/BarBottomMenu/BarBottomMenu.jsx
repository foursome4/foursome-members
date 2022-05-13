import { useState, memo } from "react";
import { IoCalendarOutline, IoList, IoRadio, IoPersonOutline, IoCashOutline, IoSettingsOutline, IoPeopleOutline, IoMenuOutline,
    IoInformationCircleOutline, IoChatbubblesOutline, IoMailOutline, IoNewspaperOutline, IoBusinessOutline, IoMailOpenOutline, IoStatsChartOutline } from "react-icons/io5"
import { useFetch } from "../../hooks/useFetch";
import './barBottomMenu.css'

function BarBottomMenuComponenet() {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const [select, setSelect] = useState(false);


const {data} = useFetch(`/online`);

    function handleOpenUsersOnline (e) {
        e.preventDefault()
       setSelect(true)
    }
    function handleOpenBar (e) {
        e.preventDefault()
       setSelect(false)
    }

    return (
        <div className="BarBottom">
            <div className="BarBottomBlock">
                { select === false ?
                <div className="Buttons">

                 <button className="ButtonsUnic" onClick={handleOpenUsersOnline}>
                        <IoChatbubblesOutline size={20}/>Online
                    </button>
                <a href="/invite" >
                 <button className="ButtonsUnicSelect" >
                        <IoMailOutline size={20}/>Convite
                    </button>
                    </a>
                <a href="/feed" >
                 <button className="ButtonsUnic" >
                        <IoNewspaperOutline size={20}/>Feed
                    </button>
                    </a>

                    <a href="/profile" >
                    <button className="ButtonsUnic" >
                        <IoPersonOutline size={20}/>Perfil
                    </button>
                    </a>
          
                    {/* <a href="/messages" >
                    <button className="ButtonsUnic" >
                        <FiMail size={20}/>
                       Recados
                    </button>
                    </a> */}

                    <a href="/invitelist" >
                    <button className="ButtonsUnic" >
                        <IoMailOpenOutline size={20}/>
                       Enviado
                    </button>
                    </a>
                  
                    <a href="/radar" >
                    <button className="ButtonsUnic" >
                        <IoRadio size={20}/>
                       Radar
                    </button>
                    </a>

                    <a href="/ranking" >
                    <button className="ButtonsUnic" >
                        <IoStatsChartOutline size={20}/>
                       Ranking
                    </button>
                    </a>

                    <a href="/events" >
                    <button className="ButtonsUnic" >
                        <IoCalendarOutline size={20}/>
                       Eventos
                    </button>
                    </a>

                    <a href="/groups" >
                    <button className="ButtonsUnic" >
                        <IoPeopleOutline size={20}/>
                       Grupos
                    </button>
                    </a>

                    <a href="/foruns" >
                    <button className="ButtonsUnic" >
                        <IoList size={20}/>
                       Fóruns
                    </button>
                    </a>



                    {/* <a href="/locals" >
                    <button className="ButtonsUnic" >
                        <IoBusinessOutline size={20}/>Locais
                    </button>
                    </a> */}
                    <a href="/settings" >
                    <button className="ButtonsUnic" >
                        <IoSettingsOutline size={20}/>Configs
                    </button>
                    </a>
                    {/* <a href="/plains" >
                    <button className="ButtonsUnic" >
                        <IoCashOutline size={20}/>Planos
                    </button>
                    </a> */}
                    <a href="/infos" >
                    <button className="ButtonsUnic" >
                        <IoInformationCircleOutline size={20}/>Infos
                    </button>
                    </a>
                </div>
                : select === true ?
                <div className="Buttons">

                <button className="ButtonsUnic" onClick={handleOpenBar}>
                       <IoMenuOutline size={20}/>Menu
                   </button>

                   {data?.map((user) => {
                       return(             
                    user.idAccount === userData.id ? "" :
               <a href={`/profile-friend/${user.idAccount}`} key={user.idAccount}>
                <div className="divUser" key={user.idAccount}>
                    <IoChatbubblesOutline />
                    <div className="image">
                     <img src={user.avatar} alt={user.idAccount} />
                    </div>
                   </div>
                   </a>
                       )
                   })}

                 
               </div>
                :
                    ""
                }


            </div>
        </div>
    )
}

export const BarBottomMenu = memo(BarBottomMenuComponenet)