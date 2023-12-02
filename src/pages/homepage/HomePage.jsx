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
        </>
      ) : null}
    </>
  );
};

export default HomePage;
