import { config } from '@fortawesome/fontawesome-svg-core'
import {initializeApp} from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { collection, connectFirestoreEmulator, getFirestore, serverTimestamp } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from "firebase/storage"

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



// connectFirestoreEmulator(firestore,'localhost',9903)
export const storage = getStorage(app)
export const auth = getAuth(app)

// connectAuthEmulator(auth,"http://localhost:9099")

// connectStorageEmulator(storage,"localhost",9904)

export default app