import {createContext, useEffect, useState} from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem("foursome");
            console.log("storageUser")
            console.log(storageUser)

        if(storageUser) {
            setUser(JSON.parse(storageUser));
            setLoading(false);
        }
        setLoading(false);
        }
     
        loadStorage();       
    },[])

    async function createAccount(nickname, username, email, phone, password, role, status,) {
        const data = {nickname, username, email, phone, password, role, status}
        const res = await api.post('/accounts', data);
        if(res.status === 201) {
            console.log("Cadastro realizado com sucesso!")
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
                setUser(result.data);
                storageUser(result.data);
                setLoading(false)
            }).catch(error => {
                console.log("Login não foi realizado" + error)
            })
        } else {
            username = login
            await api.post("/session", {username, password})
            .then((result) => {
                // console.log(result.data)
                console.log("Login realizado com sucesso!");
                setUser(result.data);
                storageUser(result.data);
                setLoading(false)
            }).catch(error => {
                console.log("Login não foi realizado" + error)
            })
        }
        
    }
    
    function storageUser(data) {
        localStorage.setItem("foursome", JSON.stringify(data));
    }

    // function logout() {
    //     localStorage.removeItem("foursome")
    //     setUser(null)
    // }


    return(
        <AuthContext.Provider value={{
            createAccount,
            loginSession,
            user,
            signed: !!user,
            loading,
            setUser,
            storageUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider