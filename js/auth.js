// js/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 Firebase config (apna paste karo)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "auragen.firebaseapp.com",
  projectId: "auragen",
  storageBucket: "auragen.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 SIGNUP
window.signup = function () {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup successful 🎉");
      console.log(userCredential.user);
    })
    .catch((error) => {
      alert(error.message);
    });
};

// 🔐 LOGIN
window.login = function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful 🚀");
      console.log(userCredential.user);
    })
    .catch((error) => {
      alert(error.message);
    });
};
