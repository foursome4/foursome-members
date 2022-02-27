import { TopBar } from "../../components/TopBar/TopBar"
import { FiPlusCircle} from 'react-icons/fi'
import './events.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { useState } from "react"

import { ListEvents } from "../../components/ListEvents/ListEvents"
import { MyEvents } from "../../components/MyEvents/MyEvents"
import { CreateEvents } from "../../components/CreateEvents/CreateEvents"

function Events() {

    const [select, setSelect] = useState("All");

    function handleAllGroups() {
        setSelect("All")
    }
    function handleParticipate() {
        setSelect("My")
    }
    function handleSelectCreate() {
        setSelect("Create")
    }

    return (
        <div className="content">
     <ToolbarLeftSlim />
            <div className="main-group">
                <TopBar />
                <div className="aside-group">
                    <div className="group">
                            <div className="group-selected">
                                <button className={select === "All" ? "selected" : ""} onClick={handleAllGroups}>Eventos</button>
                                <button className={select === "All" ? "selected" : ""} onClick={handleAllGroups}>Participação confirmada</button>
                                <button className={select === "My" ? "selected" : ""} onClick={handleParticipate}>Meus Eventos</button>
                            </div>
                            <div className="group-buttons">
                                <div className="group-create">
                                <button onClick={handleSelectCreate}><FiPlusCircle size={20}/> Criar forum</button>
                                </div>
                            </div>

                            {select === "All" ?
                            <ListEvents />: 
                            select === "My" ?
                            <MyEvents /> : 
                            select === "Create" ?
                            <CreateEvents /> : 
                            <div>
                                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                <br /><br /><br /><br /><br />
                               
                            </div>
                        }

                            
                           
                    </div>
                <ChatSlim />
                </div>
            </div>
        </div>
    )
}

export { Events }