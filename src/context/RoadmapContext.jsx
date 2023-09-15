import React, { createContext, useContext, useState } from "react";
import RoadmapModel from "../components/RoadmapClass";
// import db from "../config/Firebase"; // Import your Firebase configuration

const RoadmapContext = createContext();
export default RoadmapContext;
export  const useRoadmapContext = () => {
  return useContext(RoadmapContext);
};

export const RoadmapProvider = ({ children }) => {
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async (domain, days) => {
    try {
      setLoading(true);

      const apiKey = "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";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };
      const body = {
        model: "text-davinci-003",
        prompt: `Create a day-wise roadmap to learn ${domain} in ${days} days. Provide a detailed plan for each day, including tasks and topics to cover. Start with the basics and progress to more advanced concepts. Add a brief description for each day's tasks. Make sure to break down the learning material appropriately. Format the output as follows:

        Day 1:
        Description: [Description of tasks and topics]
        - [Task 1]
        - [Task 2]
        ...

        Day 2:
        Description: [Description of tasks and topics]
        - [Task 1]
        - [Task 2]
        ...

        ...

        Day ${days}:
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

        if (tasks) {
          const roadmapModels = tasks.map((task, index) => {
            const lines = task.split('\n');
            const day = lines[0].trim().slice(0, -1);
            const description = lines[1].trim().slice(12);
            const tasks = lines.slice(2).map((task) => task.trim().slice(1)).filter((task) => task !== "");

            const [task1, task2, task3] = tasks;

            return new RoadmapModel(day, description, task1, task2, task3);
          });

          setRoadmap(roadmapModels);
        } else {
          setRoadmap([]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    roadmap,
    generateRoadmap,
  };

  return (
    <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>
  );
};
