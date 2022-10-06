import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentuser , setcurrentUser] = useState()
    const [loading, setloading] = useState(true)

    function signup(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth)
    }

    function resetpassword(email){
        return sendPasswordResetEmail(auth,email)
    }

    function updateemail(email){
        return updateEmail(currentuser,email)
    }
    
    function updatepassword(password){
        return updatePassword(currentuser, password)
    }

    async function setProfilePic(url){
        return await updateProfile(auth.currentUser,{
            photoURL: url
            })
    }

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setcurrentUser(user)
            setloading(false)
        })

        return unsubscribe
    },[])

    const value = {
        currentuser,
        signup,
        login,
        logout,
        resetpassword,
        updateemail,
        updatepassword,
        setProfilePic
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
