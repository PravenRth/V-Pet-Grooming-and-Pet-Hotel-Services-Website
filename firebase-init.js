// firebase-init.js
// ── Replace the values below with YOUR Firebase project's config ──
// Find these at: Firebase Console → Project Settings → General →
// "Your apps" → SDK setup and configuration → Config

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyApdgtI5f9LV3BACG_8RVoRaL8WjXpgY0I",
  authDomain: "websitevpet.firebaseapp.com",
  projectId: "websitevpet",
  storageBucket: "websitevpet.firebasestorage.app",
  messagingSenderId: "1029581115998",
  appId: "1:1029581115998:web:2a77776bf8bd15a4f39acf",
  measurementId: "G-5KEE75Z8W2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
