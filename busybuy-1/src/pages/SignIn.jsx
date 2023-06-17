//importing styles-------------------------------------------------------------------------------------------------
import styles from '../styles/SignIn.module.css';
//importing react hooks--------------------------------------------------------------------------------------------
import { React, useRef, useState } from "react";
//importing from react-router-dom----------------------------------------------------------------------------------
import { NavLink, useNavigate } from "react-router-dom";
//importing from firebase/auth-------------------------------------------------------------------------------------
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/FirebaseInit';
//implementing the SignIn component--------------------------------------------------------------------------------
function SignIn(){
    const useremail = useRef();
    const userPassword = useRef();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //signin using firebase authentication-------------------------------------------------------------------------
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/");
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });  
    }
    //implementing the UI------------------------------------------------------------------------------------------
    return (
        <>
        <div className={styles.LoginForm_Container}>
            <form className={styles.Login_Form}>
                <h2 className={styles.Login_Title}>Sign In</h2>
                <input type="email" 
                    name="email" 
                    className={styles.Login_Input} 
                    ref={useremail}
                    placeholder="Enter Email"
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)}/>
                <input type="password" 
                    name="password" 
                    className={styles.Login_Input} 
                    ref={userPassword}
                    placeholder="Enter Password"
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}/>
                <button type='submit' 
                    className={styles.Login_Button}
                    onClick={onLogin}>
                        Sign In
                </button>
                <NavLink className={styles.nav_Links} to="/signup">
                    Or SignUp instead
                </NavLink>
            </form>
        </div>
        </>
    );
}

export default SignIn;