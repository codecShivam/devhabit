import React, { createContext, useContext, useState } from "react";

const RoadmapContext = createContext();

export const useRoadmapContext = () => {
  return useContext(RoadmapContext);
};

export const RoadmapProvider = ({ children }) => {
  const [roadmap, setRoadmap] = useState([]);

  const generateRoadmap = async (domain, days) => {
    try {
      const apiKey = "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";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };
      const body = {
        model: "text-davinci-003",
        prompt: `Create a day-wise roadmap to learn ${domain} in ${days} days. Break down the learning material appropriately, starting from the basics and progressing to more advanced concepts.

Day 1:
[Description of tasks and topics for the day]
Tasks:
. [Task 1]
. [Task 2]

Day 2:
[Description of tasks and topics for the day]
Tasks:
. [Task 1]
. [Task 2]

...

Day ${days}:
[Description of tasks and topics for the day]
Tasks:
. [Task 1]
. [Task 2]
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
        const tasks = roadmapText.match(
          /Day \d+:\n(.*?)\nTasks:\n([\s\S]+?)(?=\n\nDay \d+|$)/g
        );
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
