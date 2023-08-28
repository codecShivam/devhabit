import React from "react";

const Table = ({ roadmap }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto mt-4 border border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-8">Day</th>
                        <th className="py-2 px-4">Description</th>
                        <th className="py-2 px-4">Tasks</th>
                    </tr>
                </thead>
                <tbody>
                    {roadmap.map((task, index) => {
                        const lines = task.split("\n");
                        const day = lines[0].trim();
                        const description = lines[1].trim();
                        const tasks = lines.slice(2).map(task => task.trim()).filter(task => task !== '');
                        return (
                            <tr key={index}>
                                <td className="py-2 px-8">{day}</td>
                                <td className="py-2 px-4">{description}</td>
                                <td className="py-2 px-4">
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
