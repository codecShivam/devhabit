import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation_lmeynrvu.json"; // Replace with the path to your animation JSON file
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-center pb-20 bg-[#e9f1ef]">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          className="w-[165rem]"
        />
      </div>
      <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
          <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl bg-gradient-to-r from-[#3578ff] to-[#ea4c89] bg-clip-text text-transparent">
            Devhabit
          </h1>
          <p class="max-w-2xl mb-6 text-gray-900 font-semibold lg:mb-8 md:text-lg lg:text-xl">
            Join a Thriving Community of Developers. Start Learning Today
          </p>
        </div>
        <div class="lg:col-span-5 lg:flex lg:items-center justify-end">
          <NavLink to="/roadmap">
            <div class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-700 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 border-2">
              Get started
              <svg
                class="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Hero;
