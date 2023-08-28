import React, { createContext, useContext, useState } from "react";

const RoadmapContext = createContext();

export const useRoadmapContext = () => {
  return useContext(RoadmapContext);
};

export const RoadmapProvider = ({ children }) => {
  const [roadmap, setRoadmap] = useState([]);

  const generateRoadmap = async (domain, days) => {
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
        setRoadmap(tasks || []);
      }
    } catch (error) {
      console.error(error);
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
