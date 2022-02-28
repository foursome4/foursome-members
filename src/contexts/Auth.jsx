import {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import api from '../services/api';
import { socket } from '../services/websocket';
import apiGoogleReverse from '../services/apiGoogleReverse';


const AuthContext = createContext({});

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [userDataNew, setUserDataNew] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    
    const [lat, setlat] = useState("");
    const [long, setLong] = useState("");
    const [myCity, setMyCity] = useState("");
    const [myUf, setMyUf] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [idAccount, setIdAccount] = useState("");
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem("foursome");

        if(storageUser) {
            setUser(JSON.parse(storageUser));
            setLoading(false);
            socket.on("connection", () => {
                console.log("Conexão estabelecida")
            })
        }
        setLoading(false);
        }      
               
               loadStorage(); 
    },[]);





    async function createAccount(username, email, phone, type, password, status, role, code, online, patron) {
        const data = {username, email, phone, type, password, status, role, code, online, patron}
        console.log(data)
        console.log(data.email)
        console.log(data.code)
        const dataInvite = await api.get(`/invites/find/${data.email}/${data.code}`);
        console.log(dataInvite.data[0])

        if(dataInvite.data[0] === undefined) {
            toast.error("Código de verificação errado ou expirado!")
            return
        } 
        
        const res = await api.post('/accounts', data);
        if(res.status === 201) {
            completeAccount(data.email)
            console.log("Cadastro realizado com sucesso!");
            toast.info(`Cadastro criado com sucesso!`);
            navigate("/")
        } else {
            console.log("Cadastro não foi realizado");
            toast.error(`Falha na criação do cadastro. Revise suas informações!`);
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
                setIdAccount(result.data.id);
                setUsername(result.data.username)
                storageUser(result.data);
                setLoading(false);
                
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                toast.error(`Falha no login.
                E-mail, usuário ou senha incorretos!`);
            })
            
        } else {
            username = login
            await api.post("/session", {username, password})
            .then((result) => {
                console.log("Login realizado com sucesso!");
                storageUser(result.data);
                setIdAccount(result.data.id);
                setUsername(result.data.username)
                storageUser(result.data);
                setLoading(false);
                
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                toast.error(`Falha no login.
                E-mail, usuário ou senha incorretos!`);
            })
        }
        
    }

    async function findInformationsAccount(id) {
        await api.get(`/informations/${id}`)
        .then((res) => {
            console.log("Find Informations")
            const data2 = res.data[0]
            console.log(data2);
            setUserDataNew(data2);
            setMyCity(data2.city);
            setMyUf(data2.uf);
            setAvatar(data2.avatar);
            setNickname(data2.nickname);
            
            localStorage.setItem("informations-foursome", JSON.stringify(data2));
           
        }).catch(error => {
            console.log("Erro ao buscar dados" + error)
        })
        
    }





    //------------------------------------------------------------------------------//

    async function updateInformationsAccount({idAccount, avatar, cover, relationship, nickname, city, uf}) {
        await api.post("/informations", {idAccount, avatar, cover, relationship, nickname, city, uf}).then((result) => {
            console.log(result.data)
            console.log("Informações enviadas com sucesso");
            navigate("/characteristcs");
        }).catch(error => {
            console.log("Informações não enviadas" + error)
        })
    }
    async function NewUpdateInformationsAccount({id, idAccount, avatar, cover, relationship, nickname, city, uf, created_at}) {
        await api.patch(`/informations/${id}`, {avatar, cover, relationship, nickname, city, uf}).then((result) => {
            console.log(result.data)
            console.log("Informações atualizadas com sucesso!");
            localStorage.setItem("informations-foursome", JSON.stringify({
                id, _id: id, idAccount, avatar, cover, relationship, nickname, city, uf, created_at
            }))
            window.location.reload(false);
        }).catch(error => {
            console.log("Informações não enviadas" + error)
        })
    }


    async function updateCharacteristcs({idAccount, data,
        sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes}) {
            setLoading(true)
            await api.post("/characteristics", {
                idAccount, birthDate: data, sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes
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
                idAccount, birthDate: data, sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes
            }).then(async (result) => {
                console.log(result.data)
                console.log("updateCharacteristcs2 ok");
                await api.post("/characteristics",  {
                    idAccount, birthDate: data2, sex:sex2, sign:sign2, sexualOption: sexualOption2, education:education2, heigth: heigth2, weight: weight2, physique:physique2, ethnicity:ethnicity2, eyes:eyes2, hair:hair2, tatoos:tattos2, smokes:smokes2,
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
                idAccount: idAccount, birthDate: data, sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes
            }).then(async (result) => {
                console.log(result.data)
                console.log("updateCharacteristcs3 ok");
                await api.post("/characteristics",  {
                    idAccount: idAccount, birthDate: data2, sex:sex2, sign:sign2, sexualOption: sexualOption2, education:education2, heigth: heigth2, weight: weight2, physique:physique2, ethnicity:ethnicity2, eyes:eyes2, hair:hair2, tatoos: tattos2, smokes:smokes2,
                }).then(async (result) => {
                    console.log(result.data)
                    console.log("updateCharacteristcs3 ok");
            
                    await api.post("/characteristics", {
                        idAccount: idAccount, birthDate: data3, sex:sex3, sign:sign3, sexualOption: sexualOption3, education:education3, heigth: heigth3, weight: weight3, physique:physique3, ethnicity:ethnicity3, eyes:eyes3, hair:hair3, tatoos: tattos3, smokes:smokes3,
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


async function newUpdateCharacteristcs({id, birthDate,
    sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes}) {
        setLoading(true)
       console.log({id, birthDate,
        sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes})

        await api.patch(`/characteristics/${id}`,
        {birthDate: birthDate, sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes})
        .then((result) => {
            console.log("updateCharacteristcs ok");
            window.location.reload(false)
            setLoading(false)
        }).catch(error => {
                console.log("Informações não enviadas" + error)
     })
}



async function newUpdateCharacteristcs2({id, birthDate,
    sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes,
    id2, birthDate2, sex2, sign2, sexualOption2, education2, heigth2, weight2, physique2, ethnicity2, eyes2, hair2, tattos2, smokes2,}) {
        setLoading(true)
        await api.patch(`/characteristics/${id}`, {
            birthDate: birthDate, sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes
        }).then(async (result) => {
            console.log(result.data)
            console.log("updateCharacteristcs2 ok");
            await api.patch(`/characteristics/${id2}`,  {
                birthDate: birthDate2, sex:sex2, sign:sign2, sexualOption: sexualOption2, education:education2, heigth: heigth2, weight: weight2, physique:physique2, ethnicity:ethnicity2, eyes:eyes2, hair:hair2, tatoos:tattos2, smokes:smokes2,
            }).then(async (result) => {
                console.log(result.data)
                console.log("updateCharacteristcs2 ok");
                window.location.reload(false)
            }).catch(error => {
                console.log("Informações não enviadas" + error)
            })
            
        }).catch(error => {
            console.log("Informações não enviadas" + error)
        })
        
        setLoading(false)

}



async function newUpdateCharacteristcs3({id, birthDate,
    sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes,
    id2, birthDate2, sex2, sign2, sexualOption2, education2, heigth2, weight2, physique2, ethnicity2, eyes2, hair2, tattos2, smokes2,
    id3, birthDate3, sex3, sign3, sexualOption3, education3, heigth3, weight3, physique3, ethnicity3, eyes3, hair3, tattos3, smokes3}) {
        setLoading(true)
        await api.patch(`/characteristics/${id}`, {
            birthDate: birthDate, sex, sign, sexualOption, education, heigth, weight, physique, ethnicity, eyes, hair, tattos, smokes
        }).then(async (result) => {
            console.log(result.data)
            console.log("updateCharacteristcs3 ok");
            await api.patch(`/characteristics/${id2}`,  {
                birthDate: birthDate2, sex:sex2, sign:sign2, sexualOption: sexualOption2, education:education2, heigth: heigth2, weight: weight2, physique:physique2, ethnicity:ethnicity2, eyes:eyes2, hair:hair2, tatoos: tattos2, smokes:smokes2,
            }).then(async (result) => {
                console.log(result.data)
                console.log("updateCharacteristcs3 ok");
        
                await api.patch(`/characteristics/${id3}`, {
                    birthDate: birthDate3, sex:sex3, sign:sign3, sexualOption: sexualOption3, education:education3, heigth: heigth3, weight: weight3, physique:physique3, ethnicity:ethnicity3, eyes:eyes3, hair:hair3, tatoos: tattos3, smokes:smokes3,
                }).then(async (result) => {
                    console.log(result.data)
                    console.log("updateCharacteristcs3 ok");
                    window.location.reload(false)
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

async function preferencesAccount({idAccount, men, woman, couple, trisal, transvestites, transsexuals, groups, proposal}) {
    await api.post('/preferences', {idAccount, men, woman, couple, trisal, transvestites, transsexuals, groups, proposal})
    .then((res) => {
        console.log("Preferences")
        const data = res.data
        console.log(data);
        createSuccess(user.email)
        navigate("/registrationend");
    }).catch(error => {
        console.log("Erro ao salvar dados" + error)
    })
}
async function updatePreferencesAccount({id, men, woman, couple, trisal, transvestites, transsexuals, groups, proposal}) {
    await api.patch(`/preferences/${id}`, { men, woman, couple, trisal, transvestites, transsexuals, groups, proposal})
    .then((res) => {
        const data = res.data
        console.log(data);
        console.log("Atualização de preferencias ok");
        window.location.reload(false)
    }).catch(error => {
        console.log("Erro ao salvar dados" + error)
    })
}


async function newPost({idAccount, type, link, text, idForum, idGroup, idEvent, avatar, nickname, username, nameForum, nameGroup, nameEvent }) {
    setLoading(true)
    await api.post("/posts", {idAccount, type, link, text, idForum, idGroup, idEvent, avatar, nickname, username, nameForum, nameGroup, nameEvent }).then((result) => {
        console.log(result.data)
        console.log("Post Realizado com sucesso!");
    //  window.location.reload(false);
    toast.info("Post publicado com sucesso!")
        setLoading(false)
    }).catch(error => {
        console.log("Post não foi realizado" + error)
    })
}

async function deletePost(id) {
    const res = await api.delete(`/posts/${id}`);
    if(res.status===201) {
        toast.success('post deletado com sucesso!');
     //    window.location.reload(false);
     //    window.location.reload(false);
     } else {
        toast.error('Deu algo errado ao deletar!');
     }
}

async function deleteComment(id) {
    const res = await api.delete(`/comments/${id}`);
    if(res.status===201) {
        toast.success('post deletado com sucesso!');
        // window.location.reload(false);
     } else {
        toast.error('Deu algo errado ao deletar!');
     }
}

async function likePost({idAccount, username, idPost}) {
await api.post("/reactions", {idAccount, username, idPost}).then((result) => {
    console.log(result.data)
    console.log("Post Realizado com sucesso!");
  // window.location.reload(false)
    setLoading(false)
}).catch(error => {
    console.log(error)
    toast.warning('Você já curtiu esta postagem!');
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

async function CreateInviteNewUsew({code, name, email, phone,idAccount, username, patron, patronNickname}) {
    const text = `Parabens ${name}! %0AVocê foi convidado por ${patronNickname} a fazer parte de uma rede de relacionamento, exclusivo para casais, solteiros e solteiras. FOURSOME foi criado com o objetivo de aproximar pessoas com o mesmo pensamento de relacionamento de forma livre, segura e respeitosa. %0A%0AEsse convite é valido por 10 dias e intransferível. %0A%0APara criar seu perfil agora, acesse: %0A https://foursome.com.br/signup/${email} %0A Utilize o Código: ${code}  %0A e adicione o código do seu Patrono: ${patron} %0A%0AEm caso de dúvida, fale conosco. %0AContato@foursome.com.br %0A%0AFOURSOME https://www.foursome.com.br`
    
    const findAccountEmail = await api.get(`/accounts/find/${email}`);

    if(findAccountEmail.data.lenght > 1) {
        toast.error("Já existe uma conta com este e-mail!")
        return
    } 

    await api.post("/invites", {code, name, email, phone, idAccount, username, patron}).then((result) =>{
        console.log("Convite cadastrado com sucesso");
        window.open("https://wa.me/55"+ phone + "?text=" + text,
        '_blank')
    }).catch(error => {
        console.log("Convite não cadastrado" + error)
        toast.error("Já existe um covite com este e-mail!")
    })  
}

async function CreateInviteMail({code, name, email, phone,idAccount, username, patron, patronNickname}) {
  
    const findAccountEmail = await api.get(`/accounts/find/${email}`);

    if(findAccountEmail.data.lenght > 1) {
        toast.error("Já existe uma conta com este e-mail!")
        return
    } 

    await api.post("/invites", {code, name, email, phone, idAccount, username, patron}).then(async (result) =>{
        console.log("Convite cadastrado com sucesso");
        const data = {mail: email, name, code, patron, patronNickname}
        const res = await api.post("/mail/invite", data);
        if(res.status === 200) {
            toast.success("Convite enviado com sucesso!")
        }
    }).catch(error => {
        console.log("Convite não cadastrado" + error)
        toast.error("Já existe um covite com este e-mail!")
    })  
}



    async function completeAccount(email) {
        const res = await api.post("/mail/confirmation", {mail: email});
        if(res.status === 200) {
        }
    }
    async function createSuccess(email) {
        const res = await api.post("/mail/complete", {mail: email});
        if(res.status === 200) {
        }
    }






async function newFriend(idAccount, idFriend, type, status) {
    const data = {idAccount, idFriend, type, status}
    await api.post("/friends", data).then((result) => {
        console.log(result.data)
        console.log("Solicitação enviada com sucesso!")
       window.location.reload(false);
    }).catch(error => {
        console.log(error)
    })

}

async function friendAproved(id) {
    console.log(id)
   await api.put(`/friends/${id}`, {status: "aproved"}).then((result) => {
       console.log("Solicitação aprovada com sucesso!")
        window.location.reload(false)
   })
}

async function deleteFriend(id){
    console.log(id);
    await api.delete(`/friends/${id}`).then((result) => {
        console.log("Amigo deletado com sucesso!")
      window.location.reload(false)
    })
}

async function deleteFollower(id){
    console.log(id);
    await api.delete(`/followers/${id}`).then((result) => {
        console.log("Amigo deletado com sucesso!")
       window.location.reload(false)
    })
}

async function deleteLike(id){
    console.log(id);
    await api.delete(`/reactions/${id}`).then((result) => {
        console.log("like deletado com sucesso!")
      // window.location.reload(false)
    })
}
async function deleteActualMessage(_id){
    console.log(_id);
    await api.delete(`/messages/${_id}`).then((result) => {
        console.log("mensagem deletada com sucesso!")
     // window.location.reload(false)
    })
}



async function newFollower(idAccount, idFriend, type, status) {
    const data = {idAccount, idFriend, type, status}
    await api.post("/followers", data).then((result) => {
        console.log(result.data)
        console.log("Seguindo com sucesso!")
       window.location.reload(false)
    }).catch(error => {
        console.log(error)
    })

}

async function deleteFriendAndFollower(id, idAccount, idFriend, type, status) {
    console.log(id, idAccount, idFriend, type, status)
    const data = {idAccount, idFriend, type, status}
    await api.delete(`/friends/${id}`).then( async (result) => {
        console.log("Amigo deletado com sucesso!")
        console.log(result)


        await api.post("/followers", data).then((result) => {
            console.log(result.data)
            console.log("Seguindor criado com sucesso!")
            window.location.reload(false)
        }).catch(error => {
            console.log(error)
        })


     
    }).catch(error => {
        console.log(error)
    })

}


// Sessão grupos
async function creategroup( name, description, theme, privacity, cover, avatar, idAccount, username, avatarUser, nickname){
    const data = { name, description, theme, privacity, cover, avatar, idAccount, username, avatarUser};
    console.log(data)
    await api.post("/groups", data).then(async (result) => {
        console.log(result.data);
        toast.success("Grupo Criado com socesso!");

        const data2 = {idAccount, idGroup: result.data.id, username, avatar, nickname, role: "Administrator", status: "Aproved"};
        console.log(data2)
        await api.post("/groups/members", data2).then((result) => {
            console.log(result);
            toast.success("Membro adicionado com sucesso!")
        }).catch(error => {
            console.log(error)
        })


    }).catch(error => {
        console.log(error)
    })
}
// Sessão grupos
async function createForum( name, description, theme, avatar, cover, idAccount, username, nickname, avatarUser ){
    const data = { name, description, theme, avatar, cover, idAccount, username, nickname, avatarUser };

    await api.post("/foruns", data).then(async (result) => {
        console.log(result.data);
        toast.success("Forum Criado com socesso!");

    }).catch(error => {
        console.log(error)
    })
}

async function createMemberGroup( idAccount, idGroup, username, avatar, nickname, role, status){
    const data = { idAccount, idGroup, username, avatar, nickname, role, status};
    console.log(data)
    await api.post("/groups/members", data).then((result) => {
        console.log(result);
        toast.success("Membro adicionado com sucesso!")
    }).catch(error => {
        console.log(error)
    })
}
async function createEvents( avatar, name, description, date, street, district, city, uf, complement, reference, number, theme, cover, status, idAccount, username, avatarUser, nickname){
    const data = { avatar, name, description, date, street, district, city, uf, complement, reference, number, theme, cover, status, idAccount, username, avatarUser, nickname};
    console.log(data)
    await api.post("/events", data).then((result) => {
        console.log(result);
        toast.success("Evento criado com sucesso! Aguarde a aprovação dos moderadores!")
    }).catch(error => {
        console.log(error)
    })
}


async function deleteGroup(id){
    console.log(id);
    await api.delete(`/groups/${id}`).then((result) => {
        console.log("grupo deletado com sucesso!")
    })
}

// Fim da Sessão grupos

    function storageUser(data) {
        localStorage.setItem("foursome", JSON.stringify(data));
        findInformationsAccount(data.id);
        navigate("/loader")
    }



    function logout() {
        localStorage.removeItem("foursome");
        localStorage.removeItem("informations-foursome");
        setUser(null);
        navigate("/");

        window.location.reload(false)
    }



    // Location
    function socketDataLocation() {
        function success(position) {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
        
            setlat(latitude)
            setLong(longitude)
       
           reverseGeolocalization(latitude, longitude)
       
          }
        
          function error() {
            console.log('Unable to retrieve your location');
          }
       
          function getLocation() {
           return window.navigator.geolocation.getCurrentPosition(success, error);
            }
       
        async function reverseGeolocalization(lat, long) {
            const address = await apiGoogleReverse.get(`json?latlng=${lat},${long}&key=AIzaSyAKKy0iHlEZMQavlxNM5i-tkIYp4q7X_Y0`);
            setCity(address.data.results[0].address_components[3].long_name)

            setUf(address.data.results[0].address_components[4].short_name)   
        }

        const DataUser = localStorage.getItem("foursome");
        const user = JSON.parse(DataUser);
        const LocalInformation = localStorage.getItem("informations-foursome");
        const userInformations = JSON.parse(LocalInformation);


        function getInformations() {
            
            let equalCity = " "

            if(city === userInformations.city && uf === userInformations.uf ) {
            equalCity = true
            } else {
            equalCity = false
            }

            const data = {
            idAccount: user === undefined ? "" : user.id,
            username: user.username,
            nickname: userInformations.nickname,
            avatar: userInformations.avatar,
            lat: lat.toString(),
            long: long.toString(),
            city,
            uf,
            equalCity: equalCity
            }

                if(data.idAccount && data.username && data.nickname && data.avatar && data.lat && data.long && data.city && data.uf !== "") {
                    socket.emit("userOnline", data)
                } else {
                    console.log("Imformações imcompletas")
                }

        }

        getLocation()
        getInformations()
    }




    return(
        <AuthContext.Provider value={{
            user,
            loginSession,
            createAccount,
            loading,
            logout,
            updateInformationsAccount,
            NewUpdateInformationsAccount,
            updateCharacteristcs,
            updateCharacteristcs2,
            updateCharacteristcs3,
            newUpdateCharacteristcs,
            newUpdateCharacteristcs2,
            newUpdateCharacteristcs3,
            preferencesAccount,
            updatePreferencesAccount,
            newPost,
            CreateInviteNewUsew,
            userDataNew,
            newComment,
            deletePost,
            deleteComment,
            likePost,
            newFriend,
            newFollower,
            friendAproved,
            deleteFriend,
            deleteFollower,
            deleteFriendAndFollower,
            deleteLike,
            socket,
            socketDataLocation,
            creategroup,
            createMemberGroup,
            CreateInviteMail,
            deleteActualMessage,
            createForum,
            createEvents,
            CreateInviteNewUserWhatsAndEmail

        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}