import { createContext, useState, useEffect } from "react";
const AuthContext = createContext({token: "", user: {}})

function AuthContextComponent(props){
    const [ loggedInUser, setLoggedInUser] = useState({token: "" , user: {}})
    
}