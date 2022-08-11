import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
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