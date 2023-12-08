import React, { useState } from "react";
import Table from "./Table";
import { useRoadmapContext } from "../context/RoadmapContext";
import { Button, Input } from "@material-tailwind/react";
import Hero from "./Hero";

const RoadmapGenerator = () => {
  const [domain, setDomain] = useState("");
  const [days, setDays] = useState("");
  const { roadmap, generateRoadmap } = useRoadmapContext();

  const handleGenerateRoadmap = async () => {
    try {
      if (!domain || !days) {
        console.error("Please provide both domain and days.");
        return;
      }

      await generateRoadmap(domain, days);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    }
  };

  return (
    <>
      <Hero />
      <div className="container mx-auto p-8">
        <div className="max-w-full mx-auto bg-white p-6 rounded-md shadow-md">
          <label htmlFor="domainInput" className="block mb-2 text-gray-700">
            Domain:
          </label>
          <Input
            type="text"
            placeholder="Enter domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />

          <label htmlFor="daysInput" className="block my-2 text-gray-700">
            Number of Days:
          </label>
          <Input
            type="number"
            placeholder="Enter days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />

          <Button
            className="bg-blue-500 text-white mt-4"
            onClick={handleGenerateRoadmap}
          >
            Generate Roadmap
          </Button>

          {roadmap.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-700">Roadmap</h2>
              <Table />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RoadmapGenerator;
