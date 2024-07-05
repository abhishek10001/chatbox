import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase-config.js';
import Cookies from 'universal-cookie';

import "../styles/auth.css";


const cookies = new Cookies();

const Auth = ({setIsAuth}) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="auth">
      <p>Sign In With Google to Continue</p>
      <button onClick={signInWithGoogle}>Sign In</button>
    </div>
  );
};

export default Auth;

