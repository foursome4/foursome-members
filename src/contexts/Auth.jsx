import {createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import api from '../services/api';
import { socket } from '../services/websocket';
import apiGoogleReverse from '../services/apiGoogleReverse';


const AuthContext = createContext({});

function AuthProvider({children}) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [comentsPosts, setComentsPosts] = useState([])

    
    const [lat, setlat] = useState("");
    const [long, setLong] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");


    async function createAccount(id, username, email, phone, type, password, status, role, code, online, patron) {
        const data = {id, username, email, phone, type, password, status, role, code, online, patron}
        const data2 = {id, username, email, phone, type, status, role, online, patron, date: new Date()}
 
        const dataInvite = await api.get(`/invites/find/${data.email}/${data.code}`);

        if(dataInvite.data[0] === undefined) {
            toast.error("Código de verificação errado ou expirado!")
            return
        } 
        
        await api.post('/accounts', data).then(async () => {
            completeAccount(email)
            toast.info(`Cadastro criado com sucesso!`);
            
            localStorage.setItem("foursome", JSON.stringify(data2));
  
            const text = `Seu amigo ${username}, ingressou na Foursome, dê as boas vindas.`
            const data = {idPatrono: patron, text,idAccount: id, idFriend: "", type: "notification" }


            await api.post("/notifications", data).then(() => {
                window.open(`/completeregistration`,"_self")
            }).catch(error => {
                console.log("Notificação não cadastrada" + error)
            })
        }).catch(error => {
            console.log("Cadastro não foi realizado: "+ error);
            toast.error(`Username ou E-mail ja utilizados. Tente outro por favor!`);
        });
    }


    async function loginSession({login, password}) {     
       
        let email;
        let username;

        
        if(login.includes('@')) {
            email = login
            await api.post("/session", {email, password}).then((result) => {
                if(result.data.status === "banned") {
                    toast.error(`Olá, ${result.data.username}. Sua conta foi banida, entre em contato!`);
                    return
                }
                localStorage.setItem("foursome", JSON.stringify(result.data));
                findInformationsAccount(result.data.id)
                
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                toast.error(`Falha no login.
                E-mail, usuário ou senha incorretos!`);
            })
            
        } else {
            username = login
            await api.post("/session", {username, password})
            .then((result) => {
                if(result.data.status === "banned") {
                    toast.error(`Olá, ${result.data.username}. Sua conta foi banida, entre em contato!`);
                   return
                }
                localStorage.setItem("foursome", JSON.stringify(result.data));
                findInformationsAccount(result.data.id)
                
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                toast.error(`Falha no login.
                E-mail, usuário ou senha incorretos!`);
            })
        }
        
    }

    
    // async function loginSession({username, password}) {     
    //         await api.post("/session", {username, password})
    //         .then((result) => {
    //             if(result.data.status === "banned") {
    //                 toast.error(`Olá, ${result.data.username}. Sua conta foi banida, entre em contato!`);
    //                return
    //             }
    //             localStorage.setItem("foursome", JSON.stringify(result.data));
    //             findInformationsAccount(result.data.id)
                
    //         }).catch(error => {
    //             console.log("Login não foi realizado" + error)
    //             toast.error(`Falha no login.
    //             E-mail, usuário ou senha incorretos!`);
    //         })
        
    // }
    async function sessionFast({id}) {     
            await api.post("/session", {id})
            .then((result) => {
                if(result.data.status === "banned") {
                    toast.error(`Olá, ${result.data.username}. Sua conta foi banida, entre em contato!`);
                   return
                }
                localStorage.setItem("foursome", JSON.stringify(result.data));
                findInformationsAccount(result.data.id)
                
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                toast.error(`Falha no login.
                E-mail, usuário ou senha incorretos!`);
            })
        
    }

    async function findInformationsAccount(id) {
        await api.get(`/informations/${id}`)
        .then((res) => {
            console.log(res.data.length)
               if(res.data.length === 0) {
                window.open("/completeregistration","_self");
                return
            }
            localStorage.setItem("informations-foursome", JSON.stringify(res.data[0]));
            findPreferencesAccount(id)
           
        }).catch(error => {
            console.log("Erro ao buscar dados" + error)
        })
        
    }
    async function findPreferencesAccount(id) {
        await api.get(`/preferences/${id}`)
        .then((res) => {
            if(res.data.length === 0) {
                window.open("/preferences","_self");
                return
            }
            localStorage.setItem("preferences-foursome", JSON.stringify(res.data[0]));
            findCharacteriticsAccount(id)
           
        }).catch(error => {
            console.log("Erro ao buscar dados" + error)
        })
        
    }


    async function findCharacteriticsAccount(id) {
        await api.get(`/characteristics/${id}`)
        .then((res) => {
            if(res.data.length === 0) {
                window.open("/characteristcs","_self")
                return
            }
            localStorage.setItem("characteritics-foursome", JSON.stringify(res.data));
            window.open("/feed", "_self") 
           
        }).catch(error => {
            console.log("Erro ao buscar dados" + error)
        })
        
    }


//Deletando conta


async function deleteAccount() {
    toast.success("Deletendo sua conta")
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const res = await api.delete(`/accounts/${user.id}`);
    if(res.status===201) {
        deleteInformations()
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function deleteInformations() {
    const Local = localStorage.getItem("informations-foursome");
    const user = JSON.parse(Local);

    const res = await api.delete(`/informations/${user.idAccount}`);
    if(res.status===201) {
        deleteCharacteristcs()
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}
async function deleteCharacteristcs() {
    const Local = localStorage.getItem("characteritics-foursome");
    const user = JSON.parse(Local);
    const res = await api.delete(`/characteristics/${user.idAccount}`);
    if(res.status===201) {
        deletePreferences()
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}
async function deletePreferences() {
    const Local = localStorage.getItem("preferences-foursome");
    const user = JSON.parse(Local);

    const res = await api.delete(`/preferences/${user.idAccount}`);
    if(res.status===201) {
        toast.success("Conta deletada com sucesso")
        logout(user.idAccount)
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

//Fim deletando conta



    async function createInformationsAccount({id, idAccount, avatar, cover, relationship, nickname, city, uf}) {
        const data = {id, idAccount, avatar, cover, relationship, nickname, city, uf}
        await api.post("/informations", {id, idAccount, avatar, cover, relationship, nickname, city, uf}).then(() => {
            localStorage.setItem("informations-foursome", JSON.stringify(data));
            window.open("/characteristcs","_self");
        }).catch(error => {
            console.log("Informações não enviadas" + error)
        })
    }




    async function NewUpdateInformationsAccount({id, idAccount, avatar, cover, relationship, nickname, city, uf, created_at, idPatrono, username}) {
        await api.patch(`/informations/${id}`, {avatar, cover, relationship, nickname, city, uf}).then( async () => {
            localStorage.setItem("informations-foursome", JSON.stringify({
                id, _id: id, idAccount, avatar, cover, relationship, nickname, city, uf, created_at
            }))

            const text = `Seu amigo ${username}, alterou informações em seu perfil`
            const data = {idPatrono, idAccount, text, }
            await api.post("/notifications", data).then(() => {
                toast.info("Dados atualizados com sucesso!")
                window.open("/profile","_self");
            }).catch(error => {
                console.log("Notificação não cadastrada" + error)
            })
        }).catch(error => {
            console.log("Informações não enviadas" + error)
        })
    }


    async function createCharacteristcs({id1, idAccount, data, sex, sign, sexualOption}) {
        const data1 = {id1, idAccount, data, sex, sign, sexualOption}
        let dados = [];
            setLoading(true)
            await api.post("/characteristics", {
                id: id1, idAccount, birthDate: data, sex, sign, sexualOption
            }).then(async () => {
                dados.push(data1)
                localStorage.setItem("characteritics-foursome", JSON.stringify(dados));
                window.open("/preferences","_self");
                setLoading(false)
            }).catch(error => {
                console.log("Informações não enviadas" + error)
    })
}



    async function createCharacteristcs2({id1, id2, idAccount, data, sex, sign, sexualOption, data2, sex2, sign2, sexualOption2}) {
        const data10 = {id1, idAccount, data, sex, sign, sexualOption}
        const data20 = {id2, idAccount,  data2, sex2, sign2, sexualOption2}
        let dados = [];
            setLoading(true)
            await api.post("/characteristics", {
                id: id1, idAccount, birthDate: data, sex, sign, sexualOption
            }).then(async () => {
                dados.push(data10)
                await api.post("/characteristics",  {
                   id: id2, idAccount, birthDate: data2, sex:sex2, sign:sign2, sexualOption: sexualOption2
                }).then(async () => {
                    dados.push(data20)
                    localStorage.setItem("characteritics-foursome", JSON.stringify(dados));
                    window.open("/preferences","_self");
                }).catch(error => {
                    console.log("Informações não enviadas" + error)
                })
                
            }).catch(error => {
                console.log("Informações não enviadas" + error)
            })
            
            setLoading(false)
   
}



    async function createCharacteristcs3({id1, id2, id3, idAccount, data, sex, sign, sexualOption, data2, sex2, sign2, sexualOption2, data3, sex3, sign3, sexualOption3 }) {
        const data100 = {id1, idAccount, data, sex, sign, sexualOption}
        const data200 = {id2, idAccount,  data2, sex2, sign2, sexualOption2}
        const data300 = {id3, idAccount,  data3, sex3, sign3, sexualOption3}
        let dados = [];
            setLoading(true)
            await api.post("/characteristics", {
               id: id1, idAccount: idAccount, birthDate: data, sex, sign, sexualOption
            }).then(async () => {
                dados.push(data100)
                await api.post("/characteristics",  {
                   id: id2, idAccount: idAccount, birthDate: data2, sex:sex2, sign:sign2, sexualOption: sexualOption2
                }).then(async () => {
                    dados.push(data200)
                    await api.post("/characteristics", {
                       id: id3, idAccount: idAccount, birthDate: data3, sex:sex3, sign:sign3, sexualOption: sexualOption3
                    }).then(async () => {
                        dados.push(data300)
                    localStorage.setItem("characteritics-foursome", JSON.stringify(dados));
                        window.open("/preferences","_self");
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


async function newUpdateCharacteristcs({id, birthDate, sex, sign, sexualOption, idPatrono, username, idAccount}) {
        setLoading(true)
        await api.patch(`/characteristics/${id}`,
        {birthDate: birthDate, sex, sign, sexualOption})
        .then( async () => {
            const text = `Seu amigo ${username}, alterou as características de um de seus membros do perfil`
            const data = {idPatrono, idAccount, text, }
            await api.post("/notifications", data).then(() => {
                window.location.reload(false)
            }).catch(error => {
                console.log("Notificação não cadastrada" + error)
            })
            setLoading(false);
        }).catch(error => {
                console.log("Informações não enviadas" + error)
     })
}

async function newUpdateCharacteristcs2({id, birthDate, sex, sign, sexualOption, id2, birthDate2, sex2, sign2, sexualOption2, idPatrono, username, idAccount}) {
        setLoading(true)
        await api.patch(`/characteristics/${id}`, {
            birthDate: birthDate, sex, sign, sexualOption
        }).then(async () => {
            await api.patch(`/characteristics/${id2}`,  {
                birthDate: birthDate2, sex:sex2, sign:sign2, sexualOption: sexualOption2
            }).then(async () => {               
            const text = `Seu amigo ${username}, alterou as características de um de seus membros do perfil`
            const data = {idPatrono, idAccount, text, }
            await api.post("/notifications", data).then(() => {
                window.location.reload(false)
            }).catch(error => {
                console.log("Notificação não cadastrada" + error)
            })
            setLoading(false);
  
            }).catch(error => {
                console.log("Informações não enviadas" + error)
            })
            
        }).catch(error => {
            console.log("Informações não enviadas" + error)
        })
        
        setLoading(false)

}

async function newUpdateCharacteristcs3({id, birthDate,
    sex, sign, sexualOption, id2, birthDate2, sex2, sign2, sexualOption2, id3, birthDate3, sex3, sign3, sexualOption3, idPatrono, idAccount, username}) {
        setLoading(true)
        await api.patch(`/characteristics/${id}`, {
            birthDate: birthDate, sex, sign, sexualOption
        }).then(async () => {
            await api.patch(`/characteristics/${id2}`,  {
                birthDate: birthDate2, sex:sex2, sign:sign2, sexualOption: sexualOption2
            }).then(async () => {
        
                await api.patch(`/characteristics/${id3}`, {
                    birthDate: birthDate3, sex:sex3, sign:sign3, sexualOption: sexualOption3
                }).then(async () => {
            const text = `Seu amigo ${username}, alterou as características de um de seus membros do perfil`
            const data = {idPatrono, idAccount, text, }
            await api.post("/notifications", data).then(() => {
                window.location.reload(false)
            }).catch(error => {
                console.log("Notificação não cadastrada" + error)
            })
            setLoading(false);

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

async function preferencesAccount({id, idAccount, men, woman, couple, trisal, transvestites, transsexuals, groups, proposal, email}) {
    const data = {id, idAccount, men, woman, couple, trisal, transvestites, transsexuals, groups, proposal}
    await api.post('/preferences', {idAccount, men, woman, couple, trisal, transvestites, transsexuals, groups, proposal})
    .then(() => {
        localStorage.setItem("preferences-foursome", JSON.stringify(data));

        createSuccess(email)
        window.open("/registrationend","_self");
    }).catch(error => {
        console.log("Erro ao salvar dados" + error)
    })
}
async function updatePreferencesAccount({id, men, woman, couple, trisal, transvestites, transsexuals, groups, proposal, idPatrono, username, idAccount}) {
    await api.patch(`/preferences/${id}`, { men, woman, couple, trisal, transvestites, transsexuals, groups, proposal})
    .then( async () => {
        const text = `Seu amigo ${username}, alterou as características de um de seus membros do perfil`
        const data = {idPatrono, idAccount, text, }
        await api.post("/notifications", data).then(() => {
            window.location.reload(false)
        }).catch(error => {
            console.log("Notificação não cadastrada" + error)
        })
        setLoading(false);


       
    }).catch(error => {
        console.log("Erro ao salvar dados" + error)
    })
}



// Recuperações

async function recuperationUserForEmail(email) {
    console.log(email)
   const account =  await api.get(`/accounts/find/${email}`);
   console.log(account)

   if(account.data.length === 0) {
       toast.error("Não existe conta com este e-mail em nossa base de dados!")
       return
   } 

   const username = account.data[0].username
   searchUsername(email, username)
}



async function gerateCodeRecuperation(email, code) {
    console.log(email)
    const account =  await api.get(`/accounts/find/${email}`);
    console.log(account)
    
    if(account.data.length === 0) {
        toast.error("Não existe conta com este e-mail em nossa base de dados!")
        return
    } 
    
    await api.post("/recuperation", {email, code}).then((res) => {
        console.log(res.data);
        codeRecuperation(email, code);
    }).catch((error) => {
        console.log(error)
    })
}


async function validadeCodeRecuperation(code, email) {
    console.log(code, email)
   const codeRecuperationData =  await api.get(`/recuperation/find/${email}/${code}`);
   console.log(codeRecuperationData)

   if(codeRecuperationData.data.length === 0) {
       toast.error("Código inválido ou expirado!")
       return
   } 

   window.open(`/recoverpassword/${email}`,"_self")
}


async function recoverPasswordNew(email, password) {
    console.log(email, password)
    await api.patch(`accounts/recover/${email}`, {password}).then(() => {
        toast.info("Senha atualizada com sucesso");
        window.open("/","_self")
    }).catch((error) => {
        toast.error("Erro ao atualiza senha");
        console.log(error)
    })
}

// Fim recuperações


async function newPost({idAccount, type, link, text, idForum, idGroup, idEvent, avatar, nickname, username, nameForum, nameGroup, nameEvent, idPatrono}) {
    setLoading(true)
    await api.post("/posts", {idAccount, type, link, text, idForum, idGroup, idEvent, avatar, nickname, username, nameForum, nameGroup, nameEvent }).then( async () => {      
    toast.info("Post publicado com sucesso!")
    window.open(`/feed`,"_self")
        setLoading(false)
    }).catch(error => {
        console.log("Post não foi realizado" + error)
    })
}


async function deletePost(id) {
    const res = await api.delete(`/posts/${id}`);
    if(res.status===201) {
        toast.success('Post deletado com sucesso!');
        window.open(`/feed`,"_self")
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}
async function editPost(id, text) {
        const res = await api.patch(`/posts/${id}`, {text});
        if(res.status===201) {
            toast.success('post editado com sucesso!');
           
         } else {
            toast.error('Falha ao deletar, tente novamente!');
         }
 }
async function editComment(id, text) {
        const res = await api.patch(`/comments/${id}`, {text});
        if(res.status===201) {
           
         } else {
            toast.error('Falha ao deletar, tente novamente!');
         }
 }

async function deleteComment(id) {
    const res = await api.delete(`/comments/${id}`);
    if(res.status===201) {
        toast.success('Comentário deletado com sucesso!');
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}
async function editReply(id, text) {
        const res = await api.patch(`/reply/${id}`, {text});
        if(res.status===201) {
           
         } else {
            toast.error('Falha ao deletar, tente novamente!');
         }
 }

async function deleteReply(id) {
    const res = await api.delete(`/reply/${id}`);
    if(res.status===201) {
        toast.success('Resposta deletada com sucesso!');
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}
async function deleteInvite(id) {
    const res = await api.delete(`/invites/${id}`);
    if(res.status===201) {
        toast.success('Convite deletado com sucesso!');
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function likePost({idAccount, username, idPost}) {
await api.post("/reactions", {idAccount, username, idPost}).then(() => {
    setLoading(false)
}).catch(error => {
    console.log(error)

    })
}

async function newComment({idAccount, idPost, text, avatar, username, nickname}) {
    await api.post("/comments", {idAccount, idPost, text,avatar, username, nickname}).then(() => {
       
    }).catch(error => {
        console.log("Comentário não foi realizado" + error)
    })
}
async function newReply({idAccount, idComment, text, avatar, username, nickname}) {
    await api.post("/reply", {idAccount, idComment, text,avatar, username, nickname}).then(() => {
       
    }).catch(error => {
        console.log("Resposta não foi realizado" + error)
    })
}

async function CreateInviteNewUsew({code, name, email, phone,idAccount, username, patron, type, patronNickname}) {
    const text = `Parabens ${name}! %0AVocê foi convidado por ${patronNickname} a fazer parte de uma rede de relacionamento, exclusivo para casais, solteiros e solteiras. FOURSOME foi criado com o objetivo de aproximar pessoas com o mesmo pensamento de relacionamento de forma livre, segura e respeitosa. %0A%0AEsse convite é valido por 10 dias e intransferível. %0A%0APara criar seu perfil agora, acesse: %0A https://foursome.com.br/signup/${email}/${code}/${patron}/${type} %0A%0AEm caso de dúvida, fale conosco. %0AContato@foursome.com.br %0A%0AFOURSOME https://www.foursome.com.br`
    
    const findAccountEmail = await api.get(`/accounts/find/${email}`);

    if(findAccountEmail.data.lenght > 1) {
        toast.error("Já existe uma conta com este e-mail!")
        return
    } 

    await api.post("/invites", {code, name, email, phone, idAccount, username, type, patron}).then(() =>{
        window.open("https://wa.me/55"+ phone + "?text=" + text,
        '_blank')
    }).catch(error => {
        console.log("Convite não cadastrado" + error)
        toast.error("Já existe um covite com este e-mail!")
    })  
}

async function CreateInviteMail({code, name, email, phone,idAccount, username, patron, patronNickname, type}) {
  
    const findAccountEmail = await api.get(`/accounts/find/${email}`);

    if(findAccountEmail.data.lenght > 1) {
        toast.error("Já existe uma conta com este e-mail!")
        return
    } 

    await api.post("/invites", {code, name, email, phone, idAccount, username, type, patron}).then(async () =>{
        const data = {mail: email, name, code, patron, type, patronNickname}
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
    async function searchUsername(email, username) {
        console.log(email, username)
        const res = await api.post("/mail/username", {mail: email, username: username});
        if(res.status === 200) {
            toast.info("Nome de usuário encontrado. Verifique seu e-mail!")
            window.open(`/recuperationuserresult/${username}`,"_self")
        }
    }


    async function codeRecuperation(email, code) {
        console.log(email, code)
        const res = await api.post("/mail/passwordcode", {mail: email, code: code});
        if(res.status === 200) {
            toast.info("Nome de usuário encontrado. Verifique seu e-mail!");
            window.open(`/recuperationcode/${email}`,"_self")
        }
    }






async function newFriend(idAccount, idFriend, type, status) {
    const data = {idAccount, idFriend, type, status}
    await api.post("/friends", data).then(() => {
       window.location.reload(false);
    }).catch(error => {
        console.log(error)
    })

}

async function friendAproved(id) {
   await api.put(`/friends/${id}`, {status: "aproved"}).then(() => {
        window.location.reload(false)
   })
}

async function deleteFriend(id){
    await api.delete(`/friends/${id}`).then(() => {
      window.location.reload(false)
    })
}

async function deleteFollower(id){
    await api.delete(`/followers/${id}`).then(() => {
       window.location.reload(false)
    })
}

async function deleteLike(id){
    await api.delete(`/reactions/${id}`).then(() => {
    })
}
async function deleteActualMessage(_id){
    await api.delete(`/messages/${_id}`).then(() => {
    })
}



async function newFollower(idAccount, idFriend, type, status) {
    const data = {idAccount, idFriend, type, status}
    await api.post("/followers", data).then(() => {
       window.location.reload(false)
    }).catch(error => {
        console.log(error)
    })

}

async function deleteFriendAndFollower(id, idAccount, idFriend, type, status) {
    const data = {idAccount, idFriend, type, status}
    await api.delete(`/friends/${id}`).then( async () => {
        await api.post("/followers", data).then(() => {
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
    await api.post("/groups", data).then(async (result) => {
        toast.success("Grupo Criado com socesso!");

        const data2 = {idAccount, idGroup: result.data.id, username, avatar, nickname, role: "Administrator", status: "Aproved"};
        await api.post("/groups/members", data2).then(() => {
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

    await api.post("/foruns", data).then(async () => {
        toast.success("Forum Criado com socesso!");
    }).catch(error => {
        console.log(error)
    })
}

async function createMemberGroup( idAccount, idGroup, username, avatar, nickname, role, status){
    const data = { idAccount, idGroup, username, avatar, nickname, role, status};

    await api.post("/groups/members", data).then(() => {
    }).catch(error => {
        console.log(error)
    })
}
async function createEvents( avatar, name, description, date, street, district, city, uf, complement, reference, number, theme, cover, status, idAccount, username, avatarUser, nickname){
    const data = { avatar, name, description, date, street, district, city, uf, complement, reference, number, theme, cover, status, idAccount, username, avatarUser, nickname};
    await api.post("/events", data).then(() => {
        toast.success("Evento criado com sucesso! Aguarde a aprovação dos moderadores!")
    }).catch(error => {
        console.log(error)
    })
}


async function deleteGroup(id){
    await api.delete(`/groups/${id}`).then(() => {
    })
}

async function newVisit(idAccount, username, idFriend) {
    const data = {idAccount, username, idFriend}
    await api.post("/visits", data).then(() => {
    })
}

// Fim da Sessão grupos
    async function logout(idAccount) {
        localStorage.removeItem("foursome");
        localStorage.removeItem("informations-foursome");
        localStorage.removeItem("preferences-foursome");
        localStorage.removeItem("characteritics-foursome");
        await api.delete(`/online/${idAccount}`)
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

    async function getInformations() {

        let usersOnline = [];
        await api.get("/online").then((res) => {
           usersOnline = res.data
        })
       
        let selectUserOnline = usersOnline.filter(online => online.idAccount === user.id);

       
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

                socket.on("connection", () => {
                    console.log("Conexão estabelecida")
                })

                if(selectUserOnline.length === 0) {
                    console.log("Cadastrando usuário")
                    await api.post("/online", data).then(() => {
                    })
                } else {
                    console.log("Usuário ja está online")
                }

            } else {
                console.log("Imformações não coletadas com sucesso!")
            }
    }

    getLocation()
    getInformations()
}


  // Deslogandop após tempo de inatividade
   function inactivityTime() {
       let time;
       // reset timer
       window.onload = resetTimer;
       document.onmousemove = resetTimer;
       document.onkeydown = resetTimer;
       document.onclick = resetTimer;
       document.onchange = resetTimer;
       function doSomething() {
        const DataUser = localStorage.getItem("foursome");
        const user = JSON.parse(DataUser);

            if(user !== null || user !== undefined || user !== "") {
              //  toast.error("Finalizando a sessão")
                logout(user.id)
            }
        }
        function resetTimer() {
        clearTimeout(time);
      time = setTimeout(doSomething, 300000)
    }
}





    return(
        <AuthContext.Provider value={{
            loginSession,
            createAccount,
            loading,
            logout,
            createInformationsAccount,
            NewUpdateInformationsAccount,
            createCharacteristcs,
            createCharacteristcs2,
            createCharacteristcs3,
            newUpdateCharacteristcs,
            newUpdateCharacteristcs2,
            newUpdateCharacteristcs3,
            preferencesAccount,
            updatePreferencesAccount,
            newPost,
            CreateInviteNewUsew,
            newComment,
            newReply,
            deletePost,
            deleteComment,
            deleteReply,
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
            deleteGroup,
            editPost,
            editComment,
            editReply,
            newVisit,
            comentsPosts,
            setComentsPosts,
            deleteInvite,
            deleteAccount,
            recuperationUserForEmail,
            gerateCodeRecuperation,
            validadeCodeRecuperation,
            sessionFast,
            recoverPasswordNew,
            inactivityTime

        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}