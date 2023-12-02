import React, { createContext, useContext, useState, useEffect } from "react";
import RoadmapModel from "../components/RoadmapClass";
import { db } from "../config/Firebase";
import { collection, doc, setDoc, addDoc, getDocs } from "firebase/firestore";
import { useFirebase } from "./FirebaseContext";
import { deleteDoc } from "firebase/firestore";

const RoadmapContext = createContext();
export default RoadmapContext;

export const useRoadmapContext = () => {
  return useContext(RoadmapContext);
};

export const RoadmapProvider = ({ children }) => {
  const [roadmap, setRoadmap] = useState([]);
  const { user } = useFirebase(); // Assuming you have a user object from Firebase authentication

  useEffect(() => {
    const fetchRoadmapFromFirebase = async () => {
      try {
        if (user) {
          const roadmapCollectionRef = collection(
            db,
            "users",
            user.email,
            "roadmaps"
          );
          const snapshot = await getDocs(roadmapCollectionRef);
          if (!snapshot.empty) {
            const lastSnapshot = snapshot.docs.length - 1;
            const roadmapData = snapshot.docs[lastSnapshot].data().roadmap;
            const roadmapModels = roadmapData.map((data) => {
              const { day, description, tasks } = data;
              const [task1, task2, task3] = tasks;
              return new RoadmapModel(day, description, task1, task2, task3);
            });
            setRoadmap(roadmapModels);
          }
        }
      } catch (error) {
        console.error("Error fetching roadmap from Firestore: ", error);
      }
    };

    fetchRoadmapFromFirebase();
  }, [user]);

  const generateRoadmap = async (domain, days) => {
    try {
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
            const lines = task.split("\n");
            const day = lines[0].trim().slice(0, -1);
            const description = lines[1].trim().slice(12);
            const tasks = lines
              .slice(2)
              .map((task) => task.trim().slice(1))
              .filter((task) => task !== "");

            const [task1, task2, task3] = tasks;

            return new RoadmapModel(day, description, task1, task2, task3);
          });

          setRoadmap(roadmapModels);

          if (user) {
            const roadmapCollectionRef = collection(
              db,
              "users",
              user.email,
              "roadmaps"
            );

            // Delete existing documents in the "roadmaps" collection for the user
            const existingRoadmaps = await getDocs(roadmapCollectionRef);
            await Promise.all(
              existingRoadmaps.docs.map(async (doc) => {
                await deleteDoc(doc.ref);
              })
            );

            // Add the new roadmap to the user's "roadmaps" subcollection
            const roadmapDocRef = await addDoc(roadmapCollectionRef, {
              roadmap: roadmapModels.map((model) => ({
                day: model.day,
                description: model.description,
                tasks: [model.task1, model.task2, model.task3],
              })),
            });

            console.log("Roadmap added with ID: ", roadmapDocRef.id);
          }
        } else {
          setRoadmap([]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      await fetchRoadmapFromFirebase();
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
