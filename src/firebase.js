import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

const app = initializeApp({
    apiKey: "AIzaSyDQK9Ei8-eYzbyHs95etCU7ACAEFdo7dpg",
    authDomain: "auth-production-cd59c.firebaseapp.com",
    projectId: "auth-production-cd59c",
    storageBucket: "auth-production-cd59c.appspot.com",
    messagingSenderId: "529935539687",
    appId: "1:529935539687:web:c761abdce2bf7edde3b142",
    measurementId: "G-7VSF99FBDD"
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // storageBucket: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // projectId: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
    // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

const firestore = getFirestore(app)
export const database = {
    folders: collection(firestore,"folders"),
    files: collection(firestore,"files"),
    formatDoc: doc => {
        return { id: doc.id, ...doc.data()}
    },
    getCurrentTimeStamp: serverTimestamp,
}

export const storage = getStorage(app)
export const auth = getAuth(app)
export default app