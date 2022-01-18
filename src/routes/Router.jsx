import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { Chat } from '../pages/Chat/Chat';
import { CompleteRegistration } from '../pages/CompleteRegistration/CompleteRegistration';
import { Events } from '../pages/Events/Events';
import { Feed } from '../pages/Feed/Feed';
import { Foruns2 } from '../pages/Foruns2/Foruns2';
import { Friends } from '../pages/Friends/Friends';
import { FriendSingle } from '../pages/FriendSingle/FriendSingle';
import { Groups } from '../pages/Groups/Groups';
import { Profile } from '../pages/Profile/Profile';
import { Radar } from '../pages/Radar/Radar';
import { Ranking } from '../pages/Ranking/Ranking';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';


function PrivateRoute({children}) {
    const logged = true;
    console.log("logged");
    console.log(logged);
    return logged === true ? children : <Navigate to="/"/>
}


function Router () {    
 
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<SignIn />}/>
            <Route path="/signup" element={ <SignUp />} />
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
            </Routes>
        </BrowserRouter>
           
    )
}

export {Router}