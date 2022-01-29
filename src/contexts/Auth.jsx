import {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext({});

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [userDataNew, setUserDataNew] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem("foursome");

        if(storageUser) {
            setUser(JSON.parse(storageUser));
            setLoading(false);
        }
        setLoading(false);
        }
       
        loadStorage(); 
    },[]);

    async function createAccount(username, email, phone, password, role, status) {
        const data = {username, email, phone, password, role, status}
        const res = await api.post('/accounts', data);
        if(res.status === 201) {
            console.log("Cadastro realizado com sucesso!");
        } else {
            console.log("Cadastro não foi realizado")
        }
    }


    
    async function loginSession({login, password}) {     
       
        let email;
        let username;
        console.log(login);
        console.log(password);
        
        if(login.includes('@')) {
            email = login
            await api.post("/session", {email, password}).then((result) => {
                console.log(result.data)
                console.log("Login realizado com sucesso!");
                storageUser(result.data);
                setLoading(false);
            }).catch(error => {
                console.log("Login não foi realizado" + error)
            })
            
        } else {
            username = login
            await api.post("/session", {username, password})
            .then((result) => {
                console.log("Login realizado com sucesso!");
                storageUser(result.data);
                setLoading(false);
            }).catch(error => {
                console.log("Login não foi realizado" + error)
            })
        }
        
    }

    async function updateInformationsAccount({idAccount, avatar, cover, relationship, nickname, city, uf}) {
        await api.post("/informations", {idAccount, avatar, cover, relationship, nickname, city, uf}).then((result) => {
            console.log(result.data)
            console.log("Informações enviadas com sucesso");
            navigate("/characteristcs");
        }).catch(error => {
            console.log("Informações não enviadas" + error)
        })
    }


    async function updateCharacteristcs({idAccount, data,
        sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes}) {
            setLoading(true)
            await api.post("/characteristics", {
                id_account: idAccount, birthDate: data, sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes
            }).then(async (result) => {
                console.log("updateCharacteristcs ok");
                navigate("/preferences");
                setLoading(false)
            }).catch(error => {
                console.log("Informações não enviadas" + error)
    })
}



    async function updateCharacteristcs2({idAccount, data,
        sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes,
        data2, sex2, sign2, sexualOption2, education2, heigth2, weight2, physique2, ethnicity2, eyes2, hair2, tattos2, smokes2,}) {
            setLoading(true)
            await api.post("/characteristics", {
                id_account: idAccount, birthDate: data, sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes
            }).then(async (result) => {
                console.log(result.data)
                console.log("updateCharacteristcs2 ok");
                await api.post("/characteristics",  {
                    id_account: idAccount, birthDate: data2, sex:sex2, sign:sign2, sexualOption: sexualOption2, education:education2, heigth: heigth2, weight: weight2, physique:physique2, ethnicity:ethnicity2, eyes:eyes2, hair:hair2, tatoos:tattos2, smokes:smokes2,
                }).then(async (result) => {
                    console.log(result.data)
                    console.log("updateCharacteristcs2 ok");
                    navigate("/preferences");
                }).catch(error => {
                    console.log("Informações não enviadas" + error)
                })
                
            }).catch(error => {
                console.log("Informações não enviadas" + error)
            })
            
            setLoading(false)
   
}



    async function updateCharacteristcs3({idAccount, data,
        sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes,
        data2, sex2, sign2, sexualOption2, education2, heigth2, weight2, physique2, ethnicity2, eyes2, hair2, tattos2, smokes2,
        data3, sex3, sign3, sexualOption3, education3, heigth3, weight3, physique3, ethnicity3, eyes3, hair3, tattos3, smokes3}) {
            setLoading(true)
            await api.post("/characteristics", {
                id_account: idAccount, birthDate: data, sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes
            }).then(async (result) => {
                console.log(result.data)
                console.log("updateCharacteristcs3 ok");
                await api.post("/characteristics",  {
                    id_account: idAccount, birthDate: data2, sex:sex2, sign:sign2, sexualOption: sexualOption2, education:education2, heigth: heigth2, weight: weight2, physique:physique2, ethnicity:ethnicity2, eyes:eyes2, hair:hair2, tatoos: tattos2, smokes:smokes2,
                }).then(async (result) => {
                    console.log(result.data)
                    console.log("updateCharacteristcs3 ok");
            
                    await api.post("/characteristics", {
                        id_account: idAccount, birthDate: data3, sex:sex3, sign:sign3, sexualOption: sexualOption3, education:education3, heigth: heigth3, weight: weight3, physique:physique3, ethnicity:ethnicity3, eyes:eyes3, hair:hair3, tatoos: tattos3, smokes:smokes3,
                    }).then(async (result) => {
                        console.log(result.data)
                        console.log("updateCharacteristcs3 ok");
                        navigate("/preferences");
                        setLoading(false)
                    }).catch(error => {
                        console.log("Informações não enviadas" + error)
            })
  
                }).catch(error => {
                    console.log("Informações não enviadas" + error)
        })
               
            }).catch(error => {
                console.log("Informações não enviadas" + error)
    })

}

async function preferencesAccount({idAccount, men, woman, couple, trisal, transvestites, transsexuals, groups}) {
    await api.post('/preferences', {idAccount, men, woman, couple, trisal, transvestites, transsexuals, groups})
    .then((res) => {
        console.log("Preferences")
        const data = res.data
        console.log(data);
        navigate("/registrationend");
    }).catch(error => {
        console.log("Erro ao salvar dados" + error)
    })
}


async function newPost({idAccount, type, link, text, idForum, idGroup, avatar, nickname, username, nameForum, nameGroup }) {
    setLoading(true)
    await api.post("/posts", {idAccount, type, link, text, idForum, idGroup, avatar, nickname, username, nameForum, nameGroup }).then((result) => {
        console.log(result.data)
        console.log("Post Realizado com sucesso!");
        window.location.reload(false)
        setLoading(false)
    }).catch(error => {
        console.log("Post não foi realizado" + error)
    })
}

async function newComment({idAccount, idPost, text, avatar, username, nickname}) {
    await api.post("/comments", {idAccount, idPost, text,avatar, username, nickname}).then((result) => {
        console.log(result.data)
        console.log("Comentário Realizado com sucesso!");
    }).catch(error => {
        console.log("Comentário não foi realizado" + error)
    })
}

async function CreateInviteNewUsew({inviteCode, name, email, phone,idAccount}) {
    await api.post("/invites", {inviteCode, name, email, phone, idAccount}).then((result) => {
        console.log(result.data)
        console.log("Convite cadastrado com sucesso");
    }).catch(error => {
        console.log("Convite não cadastrado" + error)
    })
}

    

async function findInformationsAccount(id) {
    await api.get(`/informations/${id}`)
    .then((res) => {
        console.log("Find Informations")
        const data2 = res.data[0]
        console.log(data2);
        setUserDataNew(data2)
        if(data2 !== undefined ) {
            localStorage.setItem("informations-foursome", JSON.stringify(data2));
            redirectToAfterLogin()
        } else {
            navigate("/completeregistration");
        }
    }).catch(error => {
        console.log("Erro ao buscar dados" + error)
    })
}

function redirectToAfterLogin() {
    const storageUserInformation = localStorage.getItem("informations-foursome");
    if(storageUserInformation) {
        navigate("/feed");
    } 
    window.location.reload()
}


    function storageUser(data) {
        localStorage.setItem("foursome", JSON.stringify(data));
        console.log("Data id Account")
        console.log(data.id)
        findInformationsAccount(data.id)
    }

    function logout() {
        localStorage.removeItem("foursome");
        localStorage.removeItem("informations-foursome");
        setUser(null);
        navigate("/")
    }


    return(
        <AuthContext.Provider value={{
            user,
            loginSession,
            createAccount,
            loading,
            logout,
            updateInformationsAccount,
            updateCharacteristcs,
            updateCharacteristcs2,
            updateCharacteristcs3,
            preferencesAccount,
            newPost,
            CreateInviteNewUsew,
            userDataNew,
            newComment
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}