import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBtMeSZcnNUaLl4iupKK2ln21REZtG4B-c",
    authDomain: "soniqflow-b9dfe.firebaseapp.com",
    projectId: "soniqflow-b9dfe",
    storageBucket: "soniqflow-b9dfe.firebasestorage.app",
    messagingSenderId: "445681289367",
    appId: "1:445681289367:web:2f0179ab5cf211ed7b01d2",
    measurementId: "G-CTJE0R0MCY"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Initialize Analytics conditionally (only in browser)
let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, analytics };
