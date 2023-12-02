import React from "react";
import { useFirebase } from "../../context/FirebaseContext";
import Hero from "../../components/Hero";
import ThreeScene from "../../ThreeScene";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user, handleSignOut } = useFirebase();

  const handleLogout = () => {
    handleSignOut();
  };

  return (
    <>
      {user ? (
        <>
          <Hero />
          <ThreeScene />
          <button
            className="fixed top-2 right-36 font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </>
      ) : null}
    </>
  );
};

export default HomePage;
