import {BrowserRouter, Route, Routes} from 'react-router-dom';
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



function Router () {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<SignIn />}/>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={ <Profile />} />
            <Route path="/friends" element={ <Friends />} />
            <Route path="/friendsingle" element={ <FriendSingle />} />
            <Route path="/groups" element={ <Groups />} />
            <Route path="/groups/id_group" element={ <Groups />} />
            <Route path="/foruns" element={ <Foruns2 />} />
            <Route path="/foruns/id_forum" element={ <Foruns2 />} />
            <Route path="/events" element={ <Events />} />
            <Route path="/events/id_event" element={ <Events />} />
            <Route path="/ranking" element={ <Ranking />} />
            <Route path="/radar" element={ <Radar />} />
            <Route path="/signup" element={ <SignUp />} />
            <Route path="/completeregistration" element={ <CompleteRegistration />} />
            <Route path="/chat" element={ <Chat />} isPrivate/>
            </Routes>
        </BrowserRouter>
           
    )
}

export {Router}