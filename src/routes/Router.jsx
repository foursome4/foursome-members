import { useContext, useEffect } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import { AuthContext } from '../contexts/Auth';
import { Characteristcs } from '../pages/Characteristcs/Characteristcs';
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
import { Preferences } from '../pages/Preferences/Preferences';
import { Profile } from '../pages/Profile/Profile';
import { Radar } from '../pages/Radar/Radar';
import { Ranking } from '../pages/Ranking/Ranking';
import { Recuperation } from '../pages/Recuperation/Recuperation';
import { RegistrationEnd } from '../pages/RegistrationEnd/RegistrationEnd';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';




function Router () {


const Local = localStorage.getItem("foursome");
const userLocal = JSON.parse(Local)


function PrivateRoute({children} ) {
    return userLocal !== null ? children : <Navigate to="/"/>
}

    return (

            <Routes>
            <Route path="/" element={<SignIn />}/>
            <Route path="/signup/:email" element={ <SignUp />} />
            <Route path="/forgotit" element={ <Forgotit />} />
            <Route path="/recuperation" element={ <Recuperation />} />
            
            
            <Route path="/feed"
                    element={ <PrivateRoute> <Feed user={userLocal}/> </PrivateRoute>} />
            <Route path="/profile"
                    element={ <PrivateRoute> <Profile user={userLocal}/> </PrivateRoute>} />
            <Route path="/friends" 
                element={ <PrivateRoute> <Friends user={userLocal}/> </PrivateRoute>} />
            <Route path="/friendsingle" 
                element={ <PrivateRoute> <FriendSingle user={userLocal}/> </PrivateRoute>} />
            <Route path="/groups" 
                element={ <PrivateRoute> <Groups user={userLocal}/> </PrivateRoute>} />
            <Route path="/groups/id_group" 
                element={ <PrivateRoute> <Groups user={userLocal}/> </PrivateRoute>} />
            <Route path="/foruns" 
                element={ <PrivateRoute> <Foruns2 user={userLocal}/> </PrivateRoute>} />
            <Route path="/foruns/id_forum" 
                element={ <PrivateRoute> <Foruns2 user={userLocal}/> </PrivateRoute>} />
            <Route path="/events" 
                element={ <PrivateRoute> <Events user={userLocal}/> </PrivateRoute>} />
            <Route path="/events/id_event" 
                element={ <PrivateRoute> <Events user={userLocal}/> </PrivateRoute>} />
            <Route path="/ranking" 
                element={ <PrivateRoute> <Ranking user={userLocal}/> </PrivateRoute>} />
            <Route path="/radar" 
                element={ <PrivateRoute> <Radar user={userLocal}/> </PrivateRoute>} />
            <Route path="/completeregistration" 
                element={ <PrivateRoute> <CompleteRegistration user={userLocal}/> </PrivateRoute>} />
            <Route path="/characteristcs" 
                element={ <PrivateRoute> <Characteristcs user={userLocal}/> </PrivateRoute>} />
            <Route path="/preferences" 
                element={ <PrivateRoute> <Preferences user={userLocal}/> </PrivateRoute>} />
            <Route path="/registrationend" 
                element={ <PrivateRoute> <RegistrationEnd user={userLocal}/> </PrivateRoute>} />
            <Route path="/chat" 
                element={ <PrivateRoute> <Chat user={userLocal}/> </PrivateRoute>} />
            <Route path="/invite" 
                element={ <PrivateRoute> <Invite user={userLocal}/> </PrivateRoute>} />
            </Routes>
           
    )
}

export {Router}