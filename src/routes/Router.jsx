import {Route, Routes, Navigate} from 'react-router-dom';
import { Characteristcs } from '../pages/Characteristcs/Characteristcs';
import { Chat } from '../pages/Chat/Chat';
import { CommingSoom } from '../pages/CommingSoom/CommingSoom';
import { CompleteRegistration } from '../pages/CompleteRegistration/CompleteRegistration';
import { EventIndividual } from '../pages/EventIndividual/EventIndividual';
import { Events } from '../pages/Events/Events';
import { Feed } from '../pages/Feed/Feed';
import { Forgotit } from '../pages/Forgotit/Forgotit';
import { ForumIndividual } from '../pages/ForumIndividual/ForumIndividual';
import { Foruns } from '../pages/Foruns/Foruns';
import { GroupIndividual } from '../pages/GroupIndividual/GroupIndividual';
import { Groups } from '../pages/Groups/Groups';
import { Informations } from '../pages/Informations/Informations';
import { Invitation } from '../pages/Invitation/Invitation';
import { Invite } from '../pages/Invite/Invite';
import { InvitesList } from '../pages/InvitesList/InvitesList';
import { Lgpd } from '../pages/Lgpd/Lgpd';
import { Loader } from '../pages/Loader/Loader';
import { Plains } from '../pages/Plains/Plains';
import { Preferences } from '../pages/Preferences/Preferences';
import { PrivacityPolice } from '../pages/PrivacityPolice/PrivacityPolice';
import { Profile } from '../pages/Profile/Profile';
import { ProfileFriend } from '../pages/ProfileFriend/ProfileFriend';
import { Radar } from '../pages/Radar/Radar';
import { Ranking } from '../pages/Ranking/Ranking';
import { Recuperation } from '../pages/Recuperation/Recuperation';
import { RegistrationEnd } from '../pages/RegistrationEnd/RegistrationEnd';
import { Settings } from '../pages/Settings/Settings';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import { UseOfTerms } from '../pages/UseOfTerms/UseOfTerms';


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
            <Route path="/loader" element={ <Loader />} />       
            <Route path="/terms" element={ <UseOfTerms />} />       
            <Route path="/police" element={ <PrivacityPolice />} />       
            <Route path="/lgpd" element={ <Lgpd />} />       
            
            <Route path="/feed"
                    element={ <PrivateRoute> <Feed/> </PrivateRoute>} />
            <Route path="/profile"
                    element={ <PrivateRoute> <Profile/> </PrivateRoute>} />
            <Route path="/profile-friend/:id"
                    element={ <PrivateRoute> <ProfileFriend/> </PrivateRoute>} />
            <Route path="/groups" 
                element={ <PrivateRoute> <Groups/> </PrivateRoute>} />
            <Route path="/group/:id" 
                element={ <PrivateRoute> <GroupIndividual/> </PrivateRoute>} />
            <Route path="/foruns" 
                element={ <PrivateRoute> <Foruns/> </PrivateRoute>} />
            <Route path="/forum/:id" 
                element={ <PrivateRoute> <ForumIndividual/> </PrivateRoute>} />
            <Route path="/events" 
                element={ <PrivateRoute> <Events/> </PrivateRoute>} />
            <Route path="/event/:id" 
                element={ <PrivateRoute> <EventIndividual/> </PrivateRoute>} />
            <Route path="/ranking" 
                element={ <PrivateRoute> <Ranking/> </PrivateRoute>} />
            <Route path="/radar" 
                element={ <PrivateRoute> <Radar/> </PrivateRoute>} />
            <Route path="/completeregistration" 
                element={ <PrivateRoute> <CompleteRegistration/> </PrivateRoute>} />
            <Route path="/characteristcs" 
                element={ <PrivateRoute> <Characteristcs/> </PrivateRoute>} />
            <Route path="/preferences" 
                element={ <PrivateRoute> <Preferences /> </PrivateRoute>} />
            <Route path="/registrationend" 
                element={ <PrivateRoute> <RegistrationEnd /> </PrivateRoute>} />
            <Route path="/comming-soom" 
                element={ <PrivateRoute> <CommingSoom /> </PrivateRoute>} />
            <Route path="/Invitation" 
                element={ <PrivateRoute> <Invitation /> </PrivateRoute>} />
            <Route path="/chat/:room/:idFriend" 
                element={ <PrivateRoute> <Chat /> </PrivateRoute>} />
            <Route path="/invitelist" 
                element={ <PrivateRoute> <InvitesList /> </PrivateRoute>} />
            <Route path="/invite" 
                element={ <PrivateRoute> <Invite /> </PrivateRoute>} />
            <Route path="/infos" 
                element={ <PrivateRoute> <Informations /> </PrivateRoute>} />
            <Route path="/settings" 
                element={ <PrivateRoute> <Settings /> </PrivateRoute>} />
            <Route path="/plain" 
                element={ <PrivateRoute> <Plains /> </PrivateRoute>} />
            </Routes>
           
    )
}

export {Router}