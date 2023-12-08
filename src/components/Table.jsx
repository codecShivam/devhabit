import React, { useEffect, useState } from "react";
import { Card, Typography, Spinner, Checkbox } from "@material-tailwind/react";
import ReactModal from "react-modal";
import VerificationTask from "./VerificationTask.jsx";
import { useRoadmapContext } from "../context/RoadmapContext.jsx";

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "44rem",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
};

const Table = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [index, setIndex] = useState(null);
  const [passedTask, setPassedTask] = useState("");

  const { roadmap, loading } = useRoadmapContext();

  const handleTaskClick = (description, index, passedTask) => {
    setSelectedTask(description);
    setIndex(index);
    setPassedTask(passedTask);
    setShowPopup(true);
  };

  console.log(roadmap);

  return (
    <Card className="h-full w-full overflow-scroll mt-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Day
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Description
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Tasks
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="p-4 text-center">
                <Typography
                  variant="body"
                  color="blue-gray"
                  className="ml-2 font-normal"
                >
                  Loading...{" "}
                  <Spinner className="inline h-5 mb-1 w-5 text-gray-900/50" />
                </Typography>
              </td>
            </tr>
          ) : (
            roadmap.map((roadmapItem, index) => {
              const {
                day,
                description,
                task1,
                task2,
                task3,
                istask1,
                istask2,
                istask3,
              } = roadmapItem;

              const isLast = index === roadmap.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal ml-2 inline-block"
                    >
                      <span>{day}</span>
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {description}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <ul>
                      {task1 && (
                        <li className="flex items-center">
                          <Checkbox
                            onClick={() =>
                              handleTaskClick(task1, index, "istask1")
                            }
                            checked={istask1}
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal ml-2 inline-block"
                          >
                            {task1}
                          </Typography>
                        </li>
                      )}
                      {task2 && (
                        <li className="flex items-center">
                          <Checkbox
                            onClick={() =>
                              handleTaskClick(task2, index, "istask2")
                            }
                            checked={istask2}
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal ml-2 inline-block"
                          >
                            {task2}
                          </Typography>
                        </li>
                      )}
                      {task3 && (
                        <li className="flex items-center">
                          <Checkbox
                            onClick={() =>
                              handleTaskClick(task3, index, "istask3")
                            }
                            checked={istask3}
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal ml-2 inline-block"
                          >
                            {task3}
                          </Typography>
                        </li>
                      )}
                    </ul>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <ReactModal
        isOpen={showPopup}
        onRequestClose={() => setShowPopup(false)}
        contentLabel="Task Modal"
        style={customModalStyles}
      >
        {selectedTask && (
          <VerificationTask
            verificationDescription={selectedTask}
            day={index}
            istask={passedTask}
            setShowPopup={setShowPopup}
          />
        )}
      </ReactModal>
    </Card>
  );
};

export default Table;
