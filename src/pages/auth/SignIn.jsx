import React, { useEffect, useState } from "react";
import { auth, provider, signInWithPopup } from "../../config/Firebase";
import Home from "../../components/Home";

export function SignIn() {
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
    signInWithPopup(auth, provider).then((data) => {
      const email = data.user.email;
      setUser(email);
      localStorage.setItem("email", email);
      setIsOpen(false);
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {" "}
      {user ? (
        <Home />
      ) : (
        <div className="bg-blue-500 h-screen flex flex-col justify-center items-center">
          <h1 className="text-4xl text-white font-semibold mb-8">
            Welcome to DevHabit
          </h1>
          <div>
            <button
              className="bg-white text-blue-500 hover:bg-blue-600 text-lg font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 hover:text-white"
              onClick={handleSignIn}
            >
              Login with Google
            </button>
            <p className="mt-4 text-white text-lg">
              To proceed, please sign in with your Google account.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
