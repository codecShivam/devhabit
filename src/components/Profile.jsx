import React from "react";
import { useFirebase } from "../context/FirebaseContext";

const ProfilePage = () => {
    const { user, handleSignOut } = useFirebase();

    const handleLogout = () => {
      handleSignOut();
     
    };
    return (
        <div className="flex flex-col items-center justify-center mt-96">
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
            {user && (
        <button
          className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      )}
        </div>
    );
};

export default ProfilePage;
