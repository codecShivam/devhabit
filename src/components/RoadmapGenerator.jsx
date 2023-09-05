import { useState } from "react";
import Table from "./Table";
import { useRoadmapContext } from "../context/RoadmapContext";
import { Button } from "@material-tailwind/react";

const RoadmapGenerator = () => {
  const [domain, setDomain] = useState("");
  const [days, setDays] = useState("");
  const { roadmap, generateRoadmap } = useRoadmapContext();

  const handleGenerateRoadmap = () => {
    console.log(domain, days);
    generateRoadmap(domain, days);
  };

  return (
    <div className="App p-4 md:p-8 ">
      <div className="sm:max-w-4xl container mx-auto text-[#ECEDEE] font-bold tracking-tight">
        <label htmlFor="domainInput" className="block mb-2 text-gray-700">
          Domain:
        </label>
        <input
          type="text"
          id="domainInput"
          className="w-full px-2 py-1 border rounded text-gray-600"
          placeholder="Enter domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <br />
        <label htmlFor="daysInput" className="block my-2 text-gray-700">
          Number of Days:
        </label>
        <input
          type="number"
          id="daysInput"
          className="w-full px-2 py-1 border rounded text-gray-600"
          placeholder="Enter number of days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <br />
        <Button
          id="fetchButton"
          className="bg-blue-400 text-white mt-4"
          onClick={handleGenerateRoadmap}
        >
          Generate Roadmap
        </Button>
        <h2 className="mt-8 text-xl font-semibold text-gray-700">Roadmap</h2>
        <Table roadmap={roadmap} />
      </div>
    </div>
  );
};

export default RoadmapGenerator;
