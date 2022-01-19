import { Router } from './routes/Router';
import AuthProvider from './contexts/Auth'; 
import { BrowserRouter } from 'react-router-dom';
import './Global.css';

// import {io} from 'socket.io-client';
// const socket = io("https://api-foursome.herokuapp.com", {transports: ['websocket', 'polling', 'flashsocket']}); 

function App() {
  return (
    <BrowserRouter>
    <div className='container'> 
    <AuthProvider>
    <Router />
    </AuthProvider>
    </div>
    </BrowserRouter>

  );
}

export default App;
