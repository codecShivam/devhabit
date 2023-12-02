import React from "react";
import { useFirebase } from "../context/FirebaseContext";

const ProfilePage = () => {
    const { user } = useFirebase();

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Welcome, {user.displayName}</h1>
            <div className="flex items-center mb-4">
                <img
                    className="w-16 h-16 rounded-full mr-4"
                    src={user.photoURL}
                    alt="User Avatar"
                />
                <div>
                    <p className="text-lg font-medium">{user.email}</p>
                    <p className="text-gray-500">{user.displayName}</p>
                </div>
            </div>
            {/* Add more profile sections here */}
        </div>
    );
};

export default ProfilePage;
