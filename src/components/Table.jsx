import React from "react";

const Table = ({ roadmap }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto mt-4 border border-collapse border-white">
        <thead>
          <tr>
            <th className="py-2 px-8 border-white border">Day</th>
            <th className="py-2 px-4 border-white border">Description</th>
            <th className="py-2 px-4 border-white border">Tasks</th>
          </tr>
        </thead>
        <tbody>
          {roadmap.map((task, index) => {
            const lines = task.split("\n");
            const day = lines[0].trim().slice(0, -1);
            const description = lines[1].trim().slice(12);
            const tasks = lines
              .slice(2)
              .map((task) => task.trim().slice(1))
              .filter((task) => task !== "");
            return (
              <tr key={index}>
                <td className="py-2 px-8 border border-white">{day}</td>
                <td className="py-2 px-4 border border-white">{description}</td>
                <td className="py-2 px-4 border border-white">
                  <ul>
                    {tasks.map((task, index) => (
                      <li key={index}>{task}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
