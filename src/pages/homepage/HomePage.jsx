import React from "react";
import { useFirebase } from "../../context/FirebaseContext";
import Hero from "../../components/Hero";

const HomePage = () => {
  const { user, handleSignOut } = useFirebase();

  const handleLogout = () => {
    handleSignOut();
  };

  return (
    <>
      <Hero />
      {user && (
        <div className="text-center mt-4">
          <button
            className="bg-red-500 text-white text-lg font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 hover:bg-red-600 hover:text-white"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default HomePage;
