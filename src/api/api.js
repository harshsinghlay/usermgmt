const BASE_URL = "https://jsonplaceholder.typicode.com/users";

// Fetch all users
const fetchUsers = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Create a new user
const createUser = async (newUser) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) throw new Error("Failed to create user");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Update a user
const updateUser = async (id, updatedUser) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    if (!response.ok) throw new Error("Failed to update user");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Delete a user
const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user");
    return id; // Return the id of the deleted user to remove it from the UI
  } catch (error) {
    throw error;
  }
};

export { createUser, fetchUsers, deleteUser , updateUser};
