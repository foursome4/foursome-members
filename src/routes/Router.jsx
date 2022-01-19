import { useContext, useEffect } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import { AuthContext } from '../contexts/Auth';
import { Chat } from '../pages/Chat/Chat';
import { CompleteRegistration } from '../pages/CompleteRegistration/CompleteRegistration';
import { Events } from '../pages/Events/Events';
import { Feed } from '../pages/Feed/Feed';
import { Forgotit } from '../pages/Forgotit/Forgotit';
import { Foruns2 } from '../pages/Foruns2/Foruns2';
import { Friends } from '../pages/Friends/Friends';
import { FriendSingle } from '../pages/FriendSingle/FriendSingle';
import { Groups } from '../pages/Groups/Groups';
import { Invite } from '../pages/Invite/Invite';
import { Profile } from '../pages/Profile/Profile';
import { Radar } from '../pages/Radar/Radar';
import { Ranking } from '../pages/Ranking/Ranking';
import { Recuperation } from '../pages/Recuperation/Recuperation';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';




function Router () {

    const {user} = useContext(AuthContext);
    useEffect((user) => {
       function loadUser(user) {

            if(user) {
                console.log(user)
                return user
            }
        }

        loadUser(user)

    }, [user])
    
    function PrivateRoute({children}, ) {
        console.log("logged");
        console.log(user);
        return user !== undefined ? children : <Navigate to="/"/>
    }
    return (

            <Routes>
            <Route path="/" element={<SignIn />}/>
            <Route path="/signup/:email" element={ <SignUp />} />
            <Route path="/forgotit" element={ <Forgotit />} />
            <Route path="/recuperation" element={ <Recuperation />} />


            <Route path="/feed"
                    element={ <PrivateRoute> <Feed /> </PrivateRoute>} />
            <Route path="/profile"
                    element={ <PrivateRoute> <Profile /> </PrivateRoute>} />
            <Route path="/friends" 
                element={ <PrivateRoute> <Friends /> </PrivateRoute>} />
            <Route path="/friendsingle" 
                element={ <PrivateRoute> <FriendSingle /> </PrivateRoute>} />
            <Route path="/groups" 
                element={ <PrivateRoute> <Groups /> </PrivateRoute>} />
            <Route path="/groups/id_group" 
                element={ <PrivateRoute> <Groups /> </PrivateRoute>} />
            <Route path="/foruns" 
                element={ <PrivateRoute> <Foruns2 /> </PrivateRoute>} />
            <Route path="/foruns/id_forum" 
                element={ <PrivateRoute> <Foruns2 /> </PrivateRoute>} />
            <Route path="/events" 
                element={ <PrivateRoute> <Events /> </PrivateRoute>} />
            <Route path="/events/id_event" 
                element={ <PrivateRoute> <Events /> </PrivateRoute>} />
            <Route path="/ranking" 
                element={ <PrivateRoute> <Ranking /> </PrivateRoute>} />
            <Route path="/radar" 
                element={ <PrivateRoute> <Radar /> </PrivateRoute>} />
            <Route path="/completeregistration" 
                element={ <PrivateRoute> <CompleteRegistration /> </PrivateRoute>} />
            <Route path="/chat" 
                element={ <PrivateRoute> <Chat /> </PrivateRoute>} />
            <Route path="/invite" 
                element={ <PrivateRoute> <Invite /> </PrivateRoute>} />
            </Routes>

           
    )
}

export {Router}