import React from 'react';
import Auth from './components/Auth.jsx';
import Cookies from 'universal-cookie';
import { useState ,useRef} from 'react';// useRef just avoid changes on using onChange on entering each word we are now able to take complete room number i.e will update state of isAuth only when button clicked/\
import "./App.css";
import Chat from "./components/Chat.jsx";
import {signOut} from "firebase/auth";
import {auth} from "./firebase-config.js";
const cookies = new Cookies();
const App = () => {


  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef=useRef(null);

  const signUserOut=async()=>{
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }
  if (!isAuth) {
    return (
      <div><Auth setIsAuth={setIsAuth} /></div>
    );
  }

  return (
    <div className='outer-container'>
      {room ? (<div><Chat room={room}/></div>) : (<div className='room'><label >Enter Room Name</label>
        <input type="text"  ref={roomInputRef}/>
        <button onClick={()=>setRoom(roomInputRef.current.value) }>Enter Chat</button>
        </div>)}

        <div className='sign-out' onClick={signUserOut}>Sign-Out</div>
      </div>
      );
  
 
};

      export default App;