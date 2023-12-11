import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation_lmeynrvu.json";

const Hero = () => {
  const [delayedAnimation, setDelayedAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedAnimation(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex flex-row z-50 absolute  items-center h-1 top-0 justify-center">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          className="ml-24 h-28"
        />
      </div>
      {delayedAnimation && (
        <div className="flex flex-row z-50 absolute  items-center h-1 top-2 -left-5 justify-center">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            className="ml-24 h-28"
          />
        </div>
      )}
    </>
  );
};

export default Hero;
