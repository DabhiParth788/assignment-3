import React, { useState, useEffect } from "react";
import UserCard from "./components/UserCard";
import EditModal from "./components/EditModal";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // Fetch data from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Like button handler
  const handleLike = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, liked: !user.liked } : user
      )
    );
  };

  // Edit button handler
  const handleEdit = (id) => {
    const user = users.find((user) => user.id === id);
    setEditUser(user);
  };

  // Save edited user
  const handleSave = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditUser(null); // Close modal
  };

  // Remove button handler
  const handleRemove = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onLike={handleLike}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        ))}
      </div>
      {editUser && (
        <EditModal
          user={editUser}
          onSave={handleSave}
          onClose={() => setEditUser(null)}
        />
      )}
    </div>
  );
};

export default App;
