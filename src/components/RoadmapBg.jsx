import { Typography } from "@material-tailwind/react";
import image from "../assets/image.jpg";

export function RoadmapBg() {
  return (
    <>
      <div>
        <img
          className="w-screen h-[70vh] object-cover object-center"
          src={image}
          alt=""
        />
      </div>
    </>
  );
}
