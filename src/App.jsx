import { Router } from './routes/Router';
import AuthProvider from './contexts/Auth'; 

import './Global.css';

// import {io} from 'socket.io-client';
// const socket = io("https://api-foursome.herokuapp.com", {transports: ['websocket', 'polling', 'flashsocket']}); 

function App() {
  return (
    <AuthProvider>
    <div className='container'> 
    <Router />
    </div>
    </AuthProvider>

  );
}

export default App;
