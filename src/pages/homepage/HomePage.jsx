import React from "react";
import { useFirebase } from "../../context/FirebaseContext";
import Hero from "../../components/Hero";
import ThreeScene from "../../ThreeScene";

const HomePage = () => {
  const { user, handleSignOut } = useFirebase();

  const handleLogout = () => {
    handleSignOut();
  };

  return (
    <>
      {/* <Hero /> */}
      {user && (
        <>
          <Hero  />
          <ThreeScene  />
        </>
      )}
    </>
  );
};

export default HomePage;
