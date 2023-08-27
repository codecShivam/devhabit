import React, { useState } from "react";
import "./App.css";

const RoadmapGenerator = () => {
  const [domain, setDomain] = useState("");
  const [days, setDays] = useState("");
  const [roadmap, setRoadmap] = useState([]);

  const generateRoadmap = async () => {
    try {
      const apiKey = "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"; // Replace with your actual API key
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };
      const body = {
        model: "text-davinci-003",
        prompt: `Create a day-wise roadmap to learn ${domain} in ${days} days. Provide a detailed plan for each day, including tasks and topics to cover. Start with the basics and progress to more advanced concepts. Add a brief description for each day's tasks. Make sure to break down the learning material appropriately. Format the output as follows:

        Day 1:
        Tasks:
        Description: [Description of tasks and topics]
        - [Task 1]
        - [Task 2]
        ...

        Day 2:
        Tasks:
        Description: [Description of tasks and topics]
        - [Task 1]
        - [Task 2]
        ...

        ...

        Day ${days}:
        Tasks:
        Description: [Description of tasks and topics]
        - [Task 1]
        - [Task 2]
        ...
      `,
        max_tokens: 3700,
        temperature: 0,
      };

      const res = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.status === 200) {
        const roadmapText = data.choices[0].text;
        const tasks = roadmapText.match(/Day \d+:[\s\S]+?(?=\n\n|$)/g);
        setRoadmap(tasks || []);
      }
    } catch (error) {
      console.error(error);
    }
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
          onClick={generateRoadmap}
        >
          Generate Roadmap
        </button>

        <h2 className="mt-8 text-xl font-semibold">Roadmap</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto mt-4 border border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-8">Day</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Tasks</th>
              </tr>
            </thead>
            <tbody>
              {roadmap.map((task, index) => {
                const lines = task.split("\n");
                const day = lines[0];
                const description = lines[2].replace("Description: ", "");
                const taskList = lines.slice(4).map((task, idx) => (
                  <li key={idx} className="list-disc pl-8">
                    {task.trim().replace(/^- /, "")}
                  </li>
                ));

                return (
                  <tr key={index} className="odd:bg-gray-50 even:bg-white">
                    <td className="py-2 px-4">{day}</td>
                    <td className="py-2 px-4">{description}</td>
                    <td className="py-2 px-4">
                      <ul className="list-inside list-none">{taskList}</ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoadmapGenerator;
