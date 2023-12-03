import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../config/Firebase";
import { signInWithPopup } from "firebase/auth";
import { firestore } from "../config/Firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const FirebaseContext = createContext();

export const useFirebase = () => {
  const { user, handleSignIn, handleSignOut, createUserDocument } = useContext(FirebaseContext);

  return { user, handleSignIn, handleSignOut, createUserDocument };
};

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email) {
      setUser({
        email: email,
        displayName: sessionStorage.getItem("displayName"),
        photoURL: sessionStorage.getItem("photoURL"),
      });
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { user, additionalUserInfo } = result;

        const email = user.email;
        const displayName = user.displayName || additionalUserInfo.profile.name;
        const photoURL = user.photoURL || additionalUserInfo.profile.picture;

        const userData = {
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        };

        setUser(userData);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("displayName", displayName);
        sessionStorage.setItem("photoURL", photoURL);
        setIsOpen(false);
        createUserDocument(email, userData);
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
      sessionStorage.removeItem("email");
    });
  };

  const createUserDocument = async (uid, userData) => {
    try {
      const usersCollection = collection(firestore, "users");
      const userDoc = doc(usersCollection, uid);

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
