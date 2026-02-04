import { db } from "./firebase.js";
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// LOGIN
window.login = function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful");
      window.location.href = "dashboard.html";
    })
    .catch(err => {
  if (err.code === "auth/email-already-in-use") {
    alert("Account already exists. Please login.");
  } else {
    alert(err.message);
  }
});

};

// SIGNUP
window.signup = function () {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: serverTimestamp()
    });

    window.location.href = "dashboard.html";
  })
  .catch((error) => {
    alert(error.message);
  });



