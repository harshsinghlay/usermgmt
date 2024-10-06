import { createUser, updateUser, deleteUser } from "../api/api";
import { useDispatch } from "react-redux";
import {
  addUser as addUserInStore,
  removeUser as removeUserFromStore,
  updateUser as updateUserInStore,
} from "../redux/features/userSlice";

export const useUsers = () => {
  const dispatch = useDispatch();

  // Create a new user
  const addUser = async (newUser) => {
    try {
      const user = await createUser(newUser);
      if (user) {
        dispatch(addUserInStore(user));
        return true;
      }
    } catch (err) {
      console.error(err.message);
      return false;
    }
  };

  // Update an existing user
  const editUser = async (id, updatedUser) => {
    try {
      const user = await updateUser(id, updatedUser);
      if (user) {
        dispatch(updateUserInStore(user));
        return true;
      }
    } catch (err) {
      console.error(err.message);
      return false;
    }
  };

  // Delete a user
  const removeUser = async (id) => {
    try {
      const deletedUserId = await deleteUser(id);
      if (deletedUserId) {
        dispatch(removeUserFromStore(deletedUserId));
        return true;
      }
    } catch (err) {
      console.error(err.message);
      return false;
    }
  };

  return {
    addUser,
    editUser,
    removeUser,
  };
};
