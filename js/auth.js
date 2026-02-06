// SIGNUP
window.signup = async function () {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // OWNER CHECK
    const isOwner = email === "nadafhanif71@gmail.com";

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: isOwner ? "owner" : "user",
      plan: isOwner ? "owner-unlimited" : "basic",
      credits: isOwner ? "unlimited" : 150,
      createdAt: serverTimestamp()
    });

    window.location.href = "dashboard.html";

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Account already exists. Please login.");
    } else {
      alert(error.message);
    }
  }
};
// ===== PRICING PLAN SELECTION =====
window.selectPlan = async function(plan, credits) {
  const user = auth.currentUser;

  if (!user) {
    alert("Please login first");
    return;
  }

  await setDoc(
    doc(db, "users", user.uid),
    {
      plan: plan,
      credits: credits
    },
    { merge: true }
  );

  alert(`Plan "${plan}" activated successfully`);
};

