import { useState } from "react";
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { UsersSearch } from "../../components/ButtonsTopBar/SearchUsers/UsersSearch/UsersSearch"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { Footer } from "../../components/Footer/Footer";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import { useFetch } from "../../hooks/useFetch";
import "./search.css"


function Search() {
    const [search, setSearch] = useState('');
    // const [type, setType] = useState('nickname');


    const {data} = useFetch(`/informations`);

    let SearchUsers = []
    const searchLower = search.toLowerCase()

    if(data) {
        SearchUsers = data?.filter((informations) => informations.nickname.toLowerCase().includes(searchLower))
    }

    // function handleSelectTypeNickname() {
    //     setType('nickname')
    // }
    // function handleSelectTypeUsername() {
    //     setType('username')
    // }
    // function handleSelectTypeId() {
    //     setType('id')
    // }

    return (
        <div className="SearchPage">
                        <TopBar />
            <h2>Busca de usuários</h2>
        
            <div className="searchButton">
                {/* <div className="buttons">
                    <button onClick={handleSelectTypeNickname}>Nickname</button>
                    <button onClick={handleSelectTypeUsername}>Nome de usuário</button>
                    <button onClick={handleSelectTypeId}>Código ID</button>
                </div> */}
            <input type="text" placeholder='Buscar usuário' value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            
            <div className="itensSearch">
        
            {SearchUsers.map((information) => {
                return(
                    <div className="accounts" key={information.nickname}>
                    <UsersSearch id={information.idAccount} nickname={information.nickname} avatar={information.avatar} uf={information.uf}/>
                    </div>
                )
            })}
            
            </div>
            <ChatSlim />
                <Footer />
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
        </div>
    )
}

export { Search }