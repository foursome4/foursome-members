import { useState, useEffect } from "react";
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import { useFetch } from "../../hooks/useFetch";
import api from "../../services/api"
import "./search.css"


function Search() {
    const [users, setUsers] = useState([])
    const [online, setOnline] = useState([])
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [distance, setDistance] = useState('');
    const [plane, setPlane] = useState('');
    const [emoji, setEmoji] = useState('');
    const [song, setSong] = useState('');
    const [couple, setCouple] = useState('Vazio');
    const [men, setMen] = useState('Vazio');
    const [woman, setWoman] = useState('Vazio');
    const [trisal, setTrisal] = useState('Vazio');
    const [transvestites, setTransvestites] = useState('Vazio');
    const [transsexuals, setTranssexuals] = useState('Vazio');
    const [groups, setGroups] = useState('Vazio');


    let userFilter = []
    let SearchUsers = []
    const searchLower = search.toLowerCase()



    useEffect(() => {
        async function loadUsersONline() {
            const res = await api.get("/accounts");

            res.data.forEach((user) => {
                async function loadInformations() {
                    await api.get(`/informations/${user.id}`).then((res) => {
                        console.log(res.data[0]);
      
                        if(res.data[0] === undefined) {
                            return
                        }
                          const dados = {
                              idAccount: user.id,
                              username: user.username,
                              type: user.type,
                              avatar: res.data[0].avatar,
                              nickname: res.data[0].nickname,
                              city: res.data[0].city,     
                              uf: res.data[0].uf,     
                          }
                          
                          setOnline(oldOnline => [...oldOnline, dados])
                          console.log("dados")
                          console.log(dados)
      
                      }).catch((error) => {
                          console.log(error)
                      })  
                }

                loadInformations()
 
       })
        }
        loadUsersONline();   
     }, [])


     console.log(online)


    SearchUsers = online?.filter((informations) => informations.uf.includes(searchLower))

                                                        console.log(SearchUsers)
    userFilter = online?.filter((onlines) =>
                onlines.type === type               
    )

    console.log(userFilter)

    function handleSearch(e){
        e.preventDefault();
        setType("")
    }

    function handleTypeMen(e) {
        e.preventDefault();
        setType("Homem");
        setSearch("");
    }
 
    function handleTypeCouple(e) {
        e.preventDefault();
        setType("Casal")
        setSearch("");
    }
 
    function handleTypeWoman(e) {
        e.preventDefault();
        setType("Mulher")
        setSearch("");
    }
 
    function handleTypeTrisal(e) {
        e.preventDefault();
        setType("Trisal")
        setSearch("");
    }
 
    function handleTypeTransex(e) {
        e.preventDefault();
        setType("Transex")
        setSearch("");
    }
 
    function handleTypeTravestis(e) {
        e.preventDefault();
        setType("Travestis")
        setSearch("");
    }



    //Preferences
    function handlePreferencesMen(e) {
        e.preventDefault();

        if(men === 'Vazio') {
            setMen("Homem")
        } else {
            setMen("Vazio")
        }
    }
 
    function handlePreferencesCouple(e) {
        e.preventDefault();

        if(couple === 'Vazio') {
            setCouple("Casal")
        } else {
            setCouple('Vazio')
        }
    }
 
    function handlePreferencesWoman(e) {
        e.preventDefault();

        if(woman === 'Vazio') {
            setWoman("Mulher")
        } else {
            setWoman('Vazio')
        }
    }

    function handlePreferencesTrisal(e) {
        e.preventDefault();

        if(trisal === 'Vazio') {
            setTrisal("Trisal")
        } else {
            setTrisal('Vazio')
        }
    }
 
    function handlePreferencesTransex(e) {
        e.preventDefault();

        if(transsexuals === 'Vazio') {
            setTranssexuals("Transexuais")
        } else {
            setTranssexuals('Vazio')
        }
    }
 
    function handlePreferencesTravestis(e) {
        e.preventDefault();

        if(transvestites === 'Vazio') {
            setTransvestites("Travestis")
        } else {
            setTransvestites('Vazio')
        }
    }

    function handlePreferencesGroups(e) {
        e.preventDefault();
        if(groups === 'Vazio') {
            setGroups("Grupos")
        } else {
            setGroups('Vazio')
        }
    }

    const usersNewArray = type === "" ? SearchUsers : userFilter
 
    return (
        <div className="SearchPage">
                        <TopBar />
            <div className="main">            
            <div className="itensSearch">
              
        
            {SearchUsers.map((information) => {
                return(
                    <div className="accounts" key={information.idAccount}>
                        <div className="image">
                            <img src={information.avatar} alt="" />
                        </div>
                        <div className="infos">
                            <h5>{information.nickname}</h5>
                            <h6>{information.username}</h6>
                            <div className="moreInfos">
                            <h6>{information.type}</h6>
                            <h6>{information.distance}</h6>
                            <h6>{information.city} - {information.uf}</h6>
                            </div>
                        </div>
                        </div>
                )
            })}
            
            </div>

            <div className="searchButton">
            <h3>Filtro de busca</h3>
                {/* <div className="buttons">
                    <button onClick={handleSelectTypeNickname}>Nickname</button>
                    <button onClick={handleSelectTypeUsername}>Nome de usuário</button>
                    <button onClick={handleSelectTypeId}>Código ID</button>
                </div> */}
            <input type="text" placeholder='Nome, cidade ou estado(UF)' value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value)} onClick={handleSearch}/>

            <div className="filter">
                  <div className="itensFilter">
                  {/* <h5>Com distância de até:</h5>
                  <input type="range" minValue={10} maxValue={100}/> */}
                      <h5>Busca por:</h5>
                  <div className="buttons">
                      <button className={type === "Homem" ? "select" : ""} onClick={handleTypeMen}>Homem</button>
                      <button className={type === "Mulher" ? "select" : ""} onClick={handleTypeWoman}>Mulher</button>
                      <button className={type === "Casal" ? "select" : ""} onClick={handleTypeCouple}>Casal</button>
                      <button className={type === "Trisal" ? "select" : ""} onClick={handleTypeTrisal}>Trisal</button>
                      <button className={type === "Transex" ? "select" : ""} onClick={handleTypeTransex}>Transexuais</button>
                      <button className={type === "Travestis" ? "select" : ""} onClick={handleTypeTravestis}>Travestis</button>
                  </div>
                      <h5>Que busca por:</h5>
                  <div className="buttons">
                      <button className={men === "Homem" ? "select" : ""} onClick={handlePreferencesMen}>Homem</button>
                      <button className={woman === "Mulher" ? "select" : ""} onClick={handlePreferencesWoman}>Mulher</button>
                      <button className={couple === "Casal" ? "select" : ""} onClick={handlePreferencesCouple}>Casal</button>
                      <button className={trisal === "Trisal" ? "select" : ""} onClick={handlePreferencesTrisal}>Trisal</button>
                      <button className={transsexuals === "Transexuais" ? "select" : ""} onClick={handlePreferencesTransex}>Transexuais</button>
                      <button className={transvestites === "Travestis" ? "select" : ""} onClick={handlePreferencesTravestis}>Travestis</button>
                      <button className={groups === "Grupos" ? "select" : ""} onClick={handlePreferencesGroups}>Grupos</button>
                  </div>

                  <h5>{type} - {men} - {woman} {couple} - {trisal} - {transsexuals} - {transvestites} - {groups}</h5>

                  <button>Limpar Filtro</button>
                  </div>
                </div>
            </div>
            </div>
        
            <ChatSlim />
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
        </div>
    )
}

export { Search }