import React from "react";
import { useFirebase } from "../../context/FirebaseContext";
import Hero from "../../components/Hero";
import ThreeScene from "../../ThreeScene";
import { Link } from "react-router-dom";
// import TextSparksComponent from "../../components/TextSparksComponent";

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
          {/* <TextSparksComponent /> */}
          <ThreeScene />
        </>
      ) : null}
    </>
  );
};

export default HomePage;
