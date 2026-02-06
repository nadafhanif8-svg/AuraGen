import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const OWNER_EMAIL = "nadafhanif71@gmail.com";

/* =====================
   SIGNUP
===================== */
window.signup = async function () {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!email || !password) {
    alert("Enter email & password");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const isOwner = email === OWNER_EMAIL;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      plan: isOwner ? "owner" : "starter",
      credits: isOwner ? "unlimited" : 150,
      createdAt: serverTimestamp()
    });

    window.location.href = "dashboard.html";
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
    window.location.href = "dashboard.html";
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

  document.querySelector(".pricing").style.display = "none";
  alert(`Plan ${plan} activated`);
};

/* =====================
   HIDE PRICING IF PLAN EXISTS
===================== */
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return;

  const data = snap.data();
  if (data.plan && data.plan !== "starter") {
    const pricing = document.querySelector(".pricing");
    if (pricing) pricing.style.display = "none";
  }
});
