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


    const {data} = useFetch(`/informations`);

    let userFilter = []
    let SearchUsers = []
    let list = [];
    const searchLower = search.toLowerCase()

    // if(data) {
    //     SearchUsers = data?.filter((informations) => informations.nickname.toLowerCase().includes(searchLower))
    // }

    useEffect(() => {
        async function loadUsersONline() {
            await api.get("/accounts").then((res) => {
                setUsers(res.data);
                console.log(res.data);
    
                users.forEach( async (user) => {
                    await api.get(`/informations/${user.id}`).then((res) => {
                      console.log(res.data[0]);

                      if(res.data[0] === undefined) {
                          return
                      }
                        const dados = {
                            idAccount: res.data[0].idAccount,
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
                        
                        //list.push(dados);

                        // setOnline([...online, data])

                    }).catch((error) => {
                        console.log(error)
                    })
    
              
           })
       //console.log(list)
    //    setOnline(list);
            })
        }
        loadUsersONline();   
     }, [])

    console.log(online)
    const UsersOnline = [
        {
            idAccount: 121212,
            type: "Homem",
            username: "4suporte",
            nickname: "Supoprte Foursome",
            avatar: "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240",
            city: "Rio Bonito",
            uf: "RJ",
            lat: 25.45856,
            long: -24.12563,
            distance: 10,
            equalCity: true,
            plane: false,
            emoji: false,
            song: false,
            men:"Homem",
            woman:"Mulher",
            couple:"Casal",
            trisal:"Trisal",
            transvestites:"Travestis",
            transsexuals:"Transexuais",
            groups:"Grupos",
          },
        {
            idAccount: 131313,
            type: "Mulher",
            username: "4moderacao",
            nickname: "Moderacao Foursome",
            avatar: "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240",
            city: "Cabo Frio",
            uf: "RJ",
            lat: 25.45856,
            long: -24.12563,
            distance: 20,
            equalCity: true,
            plane: false,
            emoji: false,
            song: false,
            men:"Homem",
            woman:"Mulher",
            couple:"Casal",
            trisal:"Trisal",
            transvestites:"",
            transsexuals:"",
            groups:"",
          },
          {
            idAccount: 141414,
            username: "foursome",
            type: "Casal",
            nickname: "Foursome",
            avatar: "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240",
            city: "Buzios",
            uf: "RJ",
            lat: 25.45856,
            long: -24.12563,
            distance: 100,
            equalCity: true,
            plane: false,
            emoji: false,
            song: false,
            men:"Homem",
            woman:"",
            couple:"Casal",
            trisal:"",
            transvestites:"Travestis",
            transsexuals:"Transexuais",
            groups:"",
          },
          {
            idAccount: 151515,
            type: "Casal",
            username: "casalaventura",
            nickname: "Casal Aventura",
            avatar: "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240",
            city: "São Paulo",
            uf: "SP",
            lat: 25.45856,
            long: -24.12563,
            distance: 210,
            equalCity: true,
            plane: false,
            emoji: false,
            song: false,
            men:"Homem",
            woman:"Mulher",
            couple:"",
            trisal:"Trisal",
            transvestites:"",
            transsexuals:"",
            groups:"Grupos",
          },
          {
            idAccount: 161616,
            type: "Transex",
            username: "moreno",
            nickname: "Moreno Dotado",
            avatar: "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240",
            city: "Paranavaí",
            uf: "PR",
            lat: 25.45856,
            long: -24.12563,
            distance: 95,
            equalCity: true,
            plane: false,
            emoji: false,
            song: false,
            men:"",
            woman:"Mulher",
            couple:"Casal",
            trisal:"Trisal",
            transvestites:"Travestis",
            transsexuals:"Transexuais",
            groups:"Grupos",
          },
          {
            idAccount: 171717,
            type: "Trisal",
            username: "manhosa",
            nickname: "Gatinha Manhosa",
            avatar: "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240",
            city: "Belo Horizonte",
            uf: "MG",
            lat: 25.45856,
            long: -24.12563,
            distance: 45,
            equalCity: true,
            plane: false,
            emoji: false,
            song: false,
            men:"Homem",
            woman:"",
            couple:"Casal",
            trisal:"Trisal",
            transvestites:"",
            transsexuals:"",
            groups:"",
          },
          {
            idAccount: 181818,
            type: "Transex",
            username: "dotadosp",
            nickname: "Dotado SP",
            avatar: "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240",
            city: "Campinas",
            uf: "SP",
            lat: 25.45856,
            long: -24.12563,
            distance: 10,
            equalCity: true,
            plane: false,
            emoji: false,
            song: false,
            men:"Homem",
            woman:"Mulher",
            couple:"Casal",
            trisal:"Trisal",
            transvestites:"Travestis",
            transsexuals:"Transexuais",
            groups:"Grupos",
          },
          {
            idAccount: 191919,
            type: "Travestis",
            username: "casalmec",
            nickname: "Casal MEC",
            avatar: "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240",
            city: "Rio de Janeiro",
            uf: "RJ",
            lat: 25.45856,
            long: -24.12563,
            distance: 45,
            equalCity: true,
            plane: false,
            emoji: false,
            song: false,
            men:"",
            woman:"",
            couple:"Casal",
            trisal:"Trisal",
            transvestites:"",
            transsexuals:"",
            groups:"Grupos",
          },
          {
            idAccount: 202020,
            type: "Mulher",
            username: "safada",
            nickname: "Safadinha",
            avatar: "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240",
            city: "São LUIZ",
            uf: "MA",
            lat: 25.45856,
            long: -24.12563,
            distance: 95,
            equalCity: true,
            plane: false,
            emoji: false,
            song: false,
            men:"Homem",
            woman:"",
            couple:"",
            trisal:"",
            transvestites:"",
            transsexuals:"",
            groups:"",
          },
          {
            idAccount: 212121,
            type: "Casal",
            username: "moreninha10",
            nickname: "Morena 10",
            avatar: "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240",
            city: "Juíz de Fora",
            uf: "MG",
            lat: 25.45856,
            long: -24.12563,
            distance: 30,
            equalCity: true,
            plane: false,
            emoji: false,
            song: false,
            men:"Homem",
            woman:"",
            couple:"Casal",
            trisal:"Trisal",
            transvestites:"Travestis",
            transsexuals:"Transexuais",
            groups:"",
          },
          
    ]

    SearchUsers = online.filter((informations) => informations.nickname.includes(search)
                                                        || informations.city.includes(search) 
                                                        || informations.uf.includes(search))

                                                        console.log(SearchUsers)
    userFilter = online.filter((onlines) =>
                onlines.type === type      
                // || online.men === men             
                // || online.woman === woman             
                // || online.couple === couple             
                // || online.trisal === trisal             
                // || online.transsexuals === transsexuals             
                // || online.transvestites === transvestites             
                // || online.groups === groups          
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
              
        
            {online.map((information) => {
                return(
                    <div className="accounts" key={information.idAccount}>
                        <div className="image">
                            <img src={information.avatar} alt="" />
                        </div>
                        <div className="infos">
                            <h4>{information.nickname}</h4>
                            <div className="moreInfos">
                            <h6>{information.type}</h6>
                            <h6>{information.distance}</h6>
                            <h6>{information.city} - {information.uf}</h6>
                            </div>
                            <div className="moreInfos">
                            <h6>{information.men}</h6>
                            <h6>{information.woman}</h6>
                            <h6>{information.couple}</h6>
                            <h6>{information.trisal}</h6>
                            <h6>{information.transvestites}</h6>
                            <h6>{information.transsexuals}</h6>
                            <h6>{information.groups}</h6>
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