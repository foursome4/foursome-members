import { useState, useEffect } from "react";
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import { Link } from "react-router-dom"
import api from "../../services/api"
import "./search.css"


function Search() {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

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
    const [index, setIndex] = useState(0);
    const [qtd, setQtd] = useState(20);
    const [typeSearch, setTypeSearch] = useState('Nickname');




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
                              city: res.data[0].city === null || res.data[0].city === undefined ? "" : res.data[0].city,     
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



    console.log(userFilter)

    function handleSearch(e){
        e.preventDefault();
        setIndex(0)
        setQtd(20)
    }

    function handleTypeMen(e) {
        e.preventDefault();
        setType("Homem");
        setIndex(0)
        setQtd(20)
    }
 
    function handleTypeCouple(e) {
        e.preventDefault();
        setType("Casal")
        setIndex(0)
        setQtd(20)
    }
 
    function handleTypeWoman(e) {
        e.preventDefault();
        setType("Mulher")
        setIndex(0)
        setQtd(20)
    }
 
    function handleTypeTrisal(e) {
        e.preventDefault();
        setType("Trisal")
        setIndex(0)
        setQtd(20)
    }
 
    function handleTypeTransex(e) {
        e.preventDefault();
        setType("Transex")
        setIndex(0)
        setQtd(20)
    }
 
    function handleTypeTravestis(e) {
        e.preventDefault();
        setType("Travestis")
        setIndex(0)
        setQtd(20)
    }



function handleClearFilter(e) {
    e.preventDefault();
    setSearch("");
    setType("");
}

function HandleNext(e) {
    e.preventDefault();
    setIndex(index + 20)
    setQtd(qtd + 20)
}
function HandlePrev(e) {
    e.preventDefault();
    setIndex(index - 20)
    setQtd(qtd - 20)
}

function handleTypeSearchNickname(e) {
    e.preventDefault();
    setTypeSearch("Nickname")
}
function handleTypeSearchCity(e) {
    e.preventDefault();
    setTypeSearch("City")
}
function handleTypeSearchUf(e) {
    e.preventDefault();
    setTypeSearch("Uf")
}


    
    const SearchUsers = typeSearch === "Nickname" ? online?.filter((informations) => informations.nickname.toLowerCase().includes(searchLower))
                    : typeSearch === "City" ? online?.filter((informations) => informations.city.toLowerCase().includes(searchLower))
                    : typeSearch === "Uf" ? online?.filter((informations) => informations.uf.toLowerCase().includes(searchLower)) : ""

    const SearchUsersFilter = online?.filter((informations) => informations.nickname.toLowerCase().includes(searchLower)
                                                                ||  informations.city.toLowerCase().includes(searchLower)
                                                                ||  informations.uf.toLowerCase().includes(searchLower)
                                                                && informations.type === type)
    const userFilter = online?.filter((onlines) => onlines.type === type )

    const usersNewArray = type === "" && search !== "" ? SearchUsers :
                          type !== "" && search === "" ? userFilter :
                          type !== "" && search !== "" ? SearchUsersFilter :
                          online

                          const limitData = usersNewArray.slice(index,qtd);


 
    return (
        <div className="SearchPage">
                        <TopBar />
            <div className="main">            
            <div className="itensSearch">
              
        
            {limitData.map((information) => {
                return(
                    <div className="accounts" key={information.idAccount}>
                        <div className="image">
                            <Link to={information.idAccount === userData.id ? "/profile" : `/profile-friend/${information.idAccount}` } >
                        <img 
                        src={information.avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                        </Link>
                        </div>
                        <div className="infos2">
                            <h5>{information.nickname}</h5>
                            <h6>{information.username}</h6>
                            <div className="moreInfos2">
                            <h6>{information.type}</h6>
                            <h6>{information.city} - {information.uf}</h6>
                            </div>
                        </div>
                        </div>
                )
            })}
                <div className="pages">
           {index === 0 ? "" : <button onClick={HandlePrev}>Voltar</button> } 
           <h5>Resultados de {index + 1} a {qtd} - Todal de {usersNewArray.length}</h5>
            <button onClick={HandleNext}>Avançar</button>
                </div>
            
            </div>



            <div className="searchButton">
            <h3>Filtro de busca</h3>
            <div className="buttons">
                      <button className={typeSearch === "Nickname" ? "select" : ""} onClick={handleTypeSearchNickname}>Nome</button>
                      <button className={typeSearch === "City" ? "select" : ""} onClick={handleTypeSearchCity}>Cidade</button>
                      <button className={typeSearch === "Uf" ? "select" : ""} onClick={handleTypeSearchUf}>Estado(UF)</button>
                  </div>

            <input type="text" placeholder={ typeSearch === "Nickname" ? 'Digite o nome' :  typeSearch === "City" ? 'Digite a cidade' :  typeSearch === "Uf" ? 'Digite o estado (UF)' : 'Ecolha a cima o tipo de busca'} value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value)} onClick={handleSearch}/>

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
                  <button onClick={handleClearFilter}>Limpar Filtro</button>
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