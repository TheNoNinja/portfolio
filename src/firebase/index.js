import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBsdPBkMQcpoP4vC92AEQtUCsr24QByp5M",
    authDomain: "portfolio-of-christiaan-brant.firebaseapp.com",
    projectId: "portfolio-of-christiaan-brant",
    storageBucket: "portfolio-of-christiaan-brant.appspot.com",
    messagingSenderId: "814900973549",
    appId: "1:814900973549:web:3f839077dc5607f88aa1e4",
    measurementId: "G-97DY0RNFC0"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();