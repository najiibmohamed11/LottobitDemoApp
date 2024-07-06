// firebaseAuth.js
import { signInWithPopup } from "firebase/auth";
import { auth, provider, signOut } from "../../../firebase";
import { useNavigate } from "react-router-dom";
let currentUser = null;

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    currentUser = result.user; // Access user information
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};



const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

const getCurrentUser = () => currentUser;

export { signInWithGoogle, logout, getCurrentUser }
