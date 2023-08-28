import { useRoadmapContext } from "./RoadmapContext";
import { useState } from "react";
import Table from "./Table";

const RoadmapGenerator = () => {
  const [domain, setDomain] = useState("");
  const [days, setDays] = useState("");
  const { roadmap, generateRoadmap } = useRoadmapContext();

  const handleGenerateRoadmap = () => {
    generateRoadmap(domain, days);
  };

  return (
    <div className="App p-4 md:p-8">
      <div className="sm:max-w-4xl container mx-auto">
        <label htmlFor="domainInput" className="block mb-2">
          Domain:
        </label>
        <input
          type="text"
          id="domainInput"
          className="w-full px-2 py-1 border rounded"
          placeholder="Enter domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <br />
        <label htmlFor="daysInput" className="block my-2">
          Number of Days:
        </label>
        <input
          type="number"
          id="daysInput"
          className="w-full px-2 py-1 border rounded"
          placeholder="Enter number of days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <br />
        <button
          id="fetchButton"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleGenerateRoadmap}
        >
          Generate Roadmap
        </button>
        <h2 className="mt-8 text-xl font-semibold">Roadmap</h2>
        <Table roadmap={roadmap} />
      </div>
    </div>
  );
};

export default RoadmapGenerator;
