import React, { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import toast from "react-hot-toast";

function UserTable({ onEdit, searchQuery }) {
  const { users: allUsers, removeUser } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState(allUsers || []);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter users based on searchQuery
    const filtered = searchQuery
      ? allUsers.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allUsers;
    setFilteredUsers(filtered);
  }, [searchQuery, allUsers]);

  // Navigate to user details page
  const showUserDetails = (id) => {
    navigate(`/user/${id}`);
  };

  // Delete user handler
  const handleDeleteUser = async (userId) => {
    const status = await removeUser(userId);
    if (status) {
      toast.success("User Deleted Successfully");
    } else {
      toast.error("Failed to Delete User");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-amber-400 text-gray-800">
            <th className="border p-2 lg:p-4">Name</th>
            <th className="border p-2 lg:p-4">Username</th>
            <th className="border p-2 lg:p-4 hidden md:table-cell">Email</th>
            <th className="border p-2 lg:p-4 hidden md:table-cell">
              Phone Number
            </th>
            <th className="border p-2 lg:p-4 hidden lg:table-cell">Company</th>
            <th className="border p-2 lg:p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="border p-2 lg:p-4">{user.name}</td>
                <td className="border p-2 lg:p-4">{user.username}</td>
                <td className="border p-2 lg:p-4 hidden md:table-cell">
                  {user.email}
                </td>
                <td className="border p-2 lg:p-4 hidden md:table-cell">
                  {user.phone}
                </td>
                <td className="border p-2 lg:p-4 hidden lg:table-cell">
                  {user.company?.name}
                </td>
                <td className="border p-2 lg:p-4 flex space-x-2 lg:space-x-3 text-base lg:text-xl">
                  <button
                    onClick={() => showUserDetails(user.id)}
                    className="text-black"
                  >
                    <BsEye />
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
