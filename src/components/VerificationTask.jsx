import React, { useState } from "react";
import axios from "axios";

const VerificationTask = ({ verificationDescription }) => {
  const [verificationResponse, setVerificationResponse] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [ratingResponse, setRatingResponse] = useState("");
  const [feedbackResponse, setFeedbackResponse] = useState("");
  const [descriptionResponse, setDescriptionResponse] = useState("");

  const handleVerifyClick = async () => {
    try {
      const prompt = `You have provided the following response to the question: ${userResponse}. Please provide feedback on your response in approximately 3-4 sentences, and rate it on a scale of 1 to 10. Your rating should be based on how well your response aligns with the topic of ${verificationDescription}. Format the output as follows:
Feedback: [Your feedback here in 3-4 sentences.]
Rating: [Your rating, 1-10, based on the alignment of your response with the topic: ${verificationDescription}]
Description: [Your description related to the task ${verificationDescription} here in 3-4 sentences.]`;

      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-002/completions",
        {
          prompt,
          max_tokens: 600,
          temperature: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
        }
      );

      const verificationResponse = response.data.choices[0].text;

      // Extract feedback and rating from the response
      const feedbackMatch = verificationResponse.match(
        /Feedback: (.*)\nRating:/
      );

      const ratingMatch = verificationResponse.match(/Rating: (\d+)/);
      const descriptionMatch = verificationResponse.match(/Description: (.*)/);

      let extractedFeedback = "";
      let extractedRating = "";
      let extractedDescription = "";

      if (feedbackMatch) {
        extractedFeedback = feedbackMatch[1].trim();
      }

      if (ratingMatch) {
        extractedRating = ratingMatch[1];
      }
      if (descriptionMatch) {
        extractedDescription = descriptionMatch[1].trim();
      }

      setFeedbackResponse(extractedFeedback);
      setRatingResponse(extractedRating);
      setDescriptionResponse(extractedDescription);
      setVerificationResponse(verificationResponse);
    } catch (error) {
      console.error("Error verifying learning:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        Task Verification :
        <span className="text-gray-700"> {verificationDescription}</span>
      </h1>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Your Learning:</label>
        <textarea
          onChange={(e) => setUserResponse(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
          rows="4" // Specify the number of rows you want in the textarea
        ></textarea>
      </div>
      <button
        onClick={handleVerifyClick}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold"
      >
        Verify
      </button>

      {feedbackResponse && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Feedback:</h2>
          <p className="border border-gray-300 rounded-md p-2">
            {feedbackResponse}
          </p>
        </div>
      )}

      {descriptionResponse && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Description:</h2>
          <p className="border border-gray-300 rounded-md p-2">
            {descriptionResponse}
          </p>
        </div>
      )}
      {ratingResponse && (
        <div className="mt-4 ">
          <h2 className="text-lg p-2 font-semibold mb-2 flex  items-center">
            Rating:
            <div
              className={`w-8 h-8 ml-2 rounded-full flex justify-center items-center text-xl font-semibold mr-2 ${
                ratingResponse > 6
                  ? "bg-green-400 text-white"
                  : ratingResponse >= 4
                  ? "bg-yellow-400 text-black"
                  : "bg-red-400 text-white"
              }`}
            >
              {ratingResponse}
            </div>
          </h2>
        </div>
      )}
    </div>
  );
};

export default VerificationTask;
