import styles from "../styles/SignUp.module.css";
import { React, useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// Import Firestore database--------------------------------------------------------------------------------------
import { db } from '../firebase/FirebaseInit';
import { collection, doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../firebase/FirebaseInit";
//import from react-toastify--------------------------------------------------------------------------------------
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//implementing SignUp component-----------------------------------------------------------------------------------
function SignUp(){
    const userName = useRef();
    const userEmail = useRef();
    const userPassword = useRef();
    const navigate = useNavigate(); 
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    //SignUp using firebase authentication-------------------------------------------------------------------------
    const onSubmit = async (e) => {
        e.preventDefault()
        handleAddUser();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate(-1)
        })
        await updateProfile(auth.currentUser, { displayName: name }).catch(
            (err) => console.log(err)
        )
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
    //Adding user record into the firebase-------------------------------------------------------------------------
    async function handleAddUser() {
        const docRef = doc(collection(db, "users"))            
        await setDoc(docRef, {
            name: name,
            email: email,
            password: password,
            createdOn: new Date()
        });
        toast.success('User Added Successfully!');
    }
    //Adding focus on username field on render----------------------------------------------------------------------
    useEffect(() => {
        userName.current.focus()
    },[]);
    //implementing the UI-------------------------------------------------------------------------------------------
    return(
        <>
            <div className={styles.RegisterPage_FormContainer}>
                <form className={styles.RegisterPage_Form}>
                    <h2 className={styles.RegisterPage_loginTitle}>Sign Up</h2>
                    <input type="text" 
                        name="name" 
                        placeholder="Enter Name" 
                        ref={userName}
                        className={styles.RegisterPage_loginInput}
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                    <input type="email"
                        name="email" 
                        placeholder="Enter Email"
                        ref={userEmail}
                        className={styles.RegisterPage_loginInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" 
                        name="password" 
                        placeholder="Enter Password"
                        ref={userPassword}
                        className={styles.RegisterPage_loginInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit" 
                        className={styles.RegisterPage_SignUp_Button}
                        onClick={onSubmit}>
                            Sign Up
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </>
    );
}

export default SignUp;