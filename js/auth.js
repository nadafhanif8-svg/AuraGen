import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =====================
   SIGNUP
===================== */
window.signup = async function () {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      plan: "starter",
      credits: 150,
      createdAt: serverTimestamp()
    });

    alert("Signup successful");
  } catch (error) {
    alert(error.message);
  }
};

/* =====================
   LOGIN
===================== */
window.login = async function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful");
  } catch (error) {
    alert(error.message);
  }
};

/* =====================
   PRICING
===================== */
window.selectPlan = async function (plan, credits) {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login first");
    return;
  }

  await setDoc(
    doc(db, "users", user.uid),
    { plan, credits },
    { merge: true }
  );

  alert(`Plan ${plan} activated`);
};
