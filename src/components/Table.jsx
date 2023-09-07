import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";

const Table = ({ roadmap, loading }) => {
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
            roadmap.map((task, index) => {
              const lines = task.split("\n");
              const day = lines[0].trim().slice(0, -1);
              const description = lines[1].trim().slice(12);
              const tasks = lines
                .slice(2)
                .map((task) => task.trim().slice(1))
                .filter((task) => task !== "");
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
                      className="font-normal"
                    >
                      {day}
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
                      {tasks.map((task, index) => (
                        <li key={index}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {task}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default Table;
