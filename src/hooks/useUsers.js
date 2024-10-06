// useUsers.js
import { useState, useEffect } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "../api/api";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  // Fetch users
  const loadUsers = async () => {
    setLoading(true);
    setLoadingError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setLoadingError("Failed to load Users");
    } finally {
      setLoading(false);
    }
  };

  // Create a new user
  const addUser = async (newUser) => {
    try {
      const user = await createUser(newUser);
      setUsers([...users, user]);
      return true; 
    } catch (err) {
      console.error(err.message);
      return false; 
    }
  };

  // Update an existing user
  const editUser = async (id, updatedUser) => {
    try {
      const user = await updateUser(id, updatedUser);
      setUsers(users.map((u) => (u.id === id ? user : u)));
      return true; 
    } catch (err) {
      console.error(err.message);
      return false; 
    }
  };

  // Delete a user
  const removeUser = async (id) => {
    try {
      const deltedUserId = await deleteUser(id);
      setUsers(users.filter((u) => u.id != deltedUserId));
      return true; 
    } catch (err) {
      console.error(err.message);
      return false; 
    }
  };

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    loadingError,
    addUser,
    editUser,
    removeUser,
    loadUsers,
  };
};
