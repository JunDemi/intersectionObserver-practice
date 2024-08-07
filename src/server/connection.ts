// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtT5_37MKcaVqc6DB3F4_LFESIfupUkIs",
  authDomain: "pick-it-23e12.firebaseapp.com",
  projectId: "pick-it-23e12",
  storageBucket: "pick-it-23e12.appspot.com",
  messagingSenderId: "112779571813",
  appId: "1:112779571813:web:a06c33b8eb8cba87570c8c",
  measurementId: "G-C61R9HR79W"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); //데이터베이스
export const storage = getStorage(app, "gs://pick-it-23e12.appspot.com");//파일 스토리지
export const auth = getAuth(app); //사용자 인증