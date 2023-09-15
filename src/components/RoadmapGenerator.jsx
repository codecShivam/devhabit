import React, { useState } from "react";
import Table from "./Table";
import { useRoadmapContext } from "../context/RoadmapContext";
import { Button, Input } from "@material-tailwind/react";

const RoadmapGenerator = () => {
  const [domain, setDomain] = useState("");
  const [days, setDays] = useState("");
  const { roadmap, generateRoadmap} = useRoadmapContext(); // Include loading state
  const [loading, setLoading] = useState(false);

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    await generateRoadmap(domain, days);
    setLoading(false);
  };

  return (
    <div className="App p-4 md:p-8">
      <div className="sm:max-w-4xl container mx-auto text-[#ECEDEE] font-bold tracking-tight">
        <label htmlFor="domainInput" className="block mb-2 text-gray-700">
          Domain:
        </label>
        <Input
          type="email"
          placeholder="Enter domain"
          className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[100px]" }}
          id="domainInput"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <br />
        <label htmlFor="daysInput" className="block my-2 text-gray-700">
          Number of Days:
        </label>
        <Input
          type="email"
          placeholder="Enter days"
          className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[100px]" }}
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
        
          <Table roadmap={roadmap} loading={loading} />
        
      </div>
    </div>
  );
};

export default RoadmapGenerator;
