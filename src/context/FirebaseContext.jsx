import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../config/Firebase";
import { signInWithPopup } from "firebase/auth";
import { firestore } from "../config/Firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const FirebaseContext = createContext();

export const useFirebase = () => {
  const { user, handleSignIn, handleSignOut, createUserDocument } =
    useContext(FirebaseContext);

  return { user, handleSignIn, handleSignOut, createUserDocument };
};

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setUser(email);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const email = data.user.email;
        const uid = data.user.uid; // Get the user's UID
        const userData = {
          // Create an object with user data
          email: email,
          // Add other user data as needed
        };

        setUser(email);
        localStorage.setItem("email", email);
        setIsOpen(false);

        // Call createUserDocument to add user data to Firestore
        createUserDocument(uid, userData);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      localStorage.removeItem("email");
    });
  };

  const createUserDocument = async (uid, userData) => {
    try {
      const usersCollection = collection(firestore, "users");
      const userDoc = doc(usersCollection, uid); // Use the UID as the document ID

      await setDoc(userDoc, userData);
      console.log("User document created successfully!");
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{ user, handleSignIn, handleSignOut, createUserDocument }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
