import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-authentication-d5f42.firebaseapp.com",
    projectId: "mern-authentication-d5f42",
    storageBucket: "mern-authentication-d5f42.appspot.com",
    messagingSenderId: "694995150538",
    appId: "1:694995150538:web:91f89d54273f5a5823f633",
    measurementId: "G-1MQ1BXZ1LX"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

