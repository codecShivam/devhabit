import React, { useState } from "react";
import axios from "axios";

const VerificationTask = ({ verificationDescription }) => {
  const [verificationResponse, setVerificationResponse] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [ratingResponse, setRatingResponse] = useState("");
  const [feedbackResponse, setFeedbackResponse] = useState(""); // Added missing state for feedbackResponse

  const handleVerifyClick = async () => {
    try {
      const prompt = `Imagine you are a teacher tasked with assessing a student's understanding of ${verificationDescription}. The student's response was: ${userResponse}. Your role now is to carefully verify the learning, provide constructive feedback in approximately 3-4 sentences, and rate it on a scale of 1 to 10. Your rating should be strictly based on how well the user's response aligns with the topic of ${verificationDescription}. Format the output as follows:

      Feedback: [Please provide constructive feedback in 3-4 sentences here.]
      Rating: [Rate how well the user has learned the topic on a scale of 1-10, strictly based on the alignment of their response with the topic: ${verificationDescription}]`;

      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-002/completions",
        {
          prompt,
          max_tokens: 100,
          temperature: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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",
          },
        }
      );

      const verificationResponse = response.data.choices[0].text;
      const feedbackResponse = verificationResponse.match(/Feedback: (.*)/)[1]; // Extract feedback text properly
      const ratingMatch = verificationResponse.match(/Rating: (\d+)/);

      let extractedRating = "";

      if (ratingMatch) {
        extractedRating = ratingMatch[1];
      }

      setRatingResponse(extractedRating);
      setFeedbackResponse(feedbackResponse);
      setVerificationResponse(verificationResponse);
    } catch (error) {
      console.error("Error verifying learning:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Verification Task</h1>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Verification Description:</label>
        <input
          type="text"
          onChange={(e) => setUserResponse(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <button
        onClick={handleVerifyClick}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold"
      >
        Verify
      </button>
      {/* <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Verification Response:</h2>
        <p className="border border-gray-300 rounded-md p-2">{verificationResponse}</p>
      </div> */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Rating Response:</h2>
        <p className="border border-gray-300 rounded-md p-2">{ratingResponse}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Feedback Response:</h2>
        <p className="border border-gray-300 rounded-md p-2">{feedbackResponse}</p>
      </div>
    </div>
  );
};

export default VerificationTask;
