import { useState,useEffect } from "react";

export default function useLocalStorage(){
    const [email,setEmail] = useState("");

    useEffect(() => {
      let email = localStorage.getItem("email");

      if(email){
        setEmail(email);
      }
    },[]);

    useEffect(() => {
      localStorage.setItem("email",email);
    },[email]);

    return {email, setEmail};
}