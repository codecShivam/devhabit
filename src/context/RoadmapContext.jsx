import React, { createContext, useContext, useState, useEffect } from "react";
import RoadmapModel from "../components/RoadmapClass";
import { db } from "../config/Firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useFirebase } from "./FirebaseContext";

const RoadmapContext = createContext();
export default RoadmapContext;

export const useRoadmapContext = () => {
  return useContext(RoadmapContext);
};

export const RoadmapProvider = ({ children }) => {
  const [roadmap, setRoadmap] = useState([]);
  const { user } = useFirebase();

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
          const querySnapshot = await getDocs(roadmapCollectionRef);
          if (!querySnapshot.empty) {
            const roadmapModels = querySnapshot.docs.map((doc) => {
              const {
                day,
                description,
                task1,
                task2,
                task3,
                istask1,
                istask2,
                istask3,
                rating,
                feedback,
                descriptionEplanation,
              } = doc.data();
              return new RoadmapModel(
                day,
                description,
                task1,
                task2,
                task3,
                istask1,
                istask2,
                istask3,
                rating,
                feedback,
                descriptionEplanation
              );
            });
            setRoadmap(roadmapModels);
          } else {
            setRoadmap([]);
          }
        }
      } catch (error) {
        console.error("Error fetching roadmap from Firestore: ", error);
      }
    };
    fetchRoadmapFromFirebase();
  }, []);

  const generateRoadmap = async (domain, days) => {
    try {
      const apiKey = "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";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };
      const body = {
        model: "gpt-3.5-turbo-instruct", 
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
      console.log(data);

      if (res.status === 200) {
        const roadmapText = data.choices[0].text;
        const tasks = roadmapText.match(/Day \d+:[\s\S]+?(?=\n\n|$)/g);

        if (tasks) {
          const roadmapModels = tasks.map((task, index) => {
            const lines = task.split("\n");
            const day = lines[0].trim().slice(0, -1);
            const description = lines[1].trim().slice(12);
            const [task1, task2, task3] = lines
              .slice(2)
              .map((task) => task.trim().slice(1))
              .filter((task) => task !== "");
            const [istask1, istask2, istask3] = [false, false, false];
            const [rating, feedback, descriptionEplanation] = ["", "", ""];
            return new RoadmapModel(
              day,
              description,
              task1,
              task2,
              task3,
              istask1,
              istask2,
              istask3,
              rating,
              feedback,
              descriptionEplanation
            );
          });

          setRoadmap(roadmapModels);

          if (user) {
            const roadmapCollectionRef = collection(
              db,
              "users",
              user.email,
              "roadmaps"
            );

            // Fetch existing roadmaps
            const existingRoadmaps = await getDocs(roadmapCollectionRef);

            // Delete the existing roadmaps
            await Promise.all(
              existingRoadmaps.docs.map(async (doc) => {
                await deleteDoc(doc.ref);
              })
            );

            // Add the new roadmaps
            await Promise.all(
              roadmapModels.map(async (model) => {
                const dayDocumentRef = doc(
                  roadmapCollectionRef,
                  model.day.toString()
                );
                await setDoc(dayDocumentRef, {
                  day: model.day,
                  description: model.description,
                  task1: model.task1,
                  task2: model.task2,
                  task3: model.task3,
                  istask1: model.istask1,
                  istask2: model.istask2,
                  istask3: model.istask3,
                  rating: model.rating,
                  feedback: model.feedback,
                  descriptionEplanation: model.descriptionEplanation,
                });
              })
            );

            console.log("Roadmap added successfully");
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
