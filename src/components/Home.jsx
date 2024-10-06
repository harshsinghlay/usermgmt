import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";
import Form from "./Form";
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/features/userSlice";
import { fetchUsers } from "../api/api";

function Home() {
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setLoadingError(null);
    try {
      const data = await fetchUsers();
      dispatch(setUsers(data || []));
    } catch (err) {
      setLoadingError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Initially load users from database
  useEffect(() => {
    loadUsers();
  }, []);

  const openForm = (user = null) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentUser(null);
  };

  return (
    <div className="w-full">
      <main className="w-full px-4 lg:p-0 mt-20 lg:mx-auto lg:w-[85%]">
        <section>
          <div className="flex justify-between items-center my-4">
            <h2 className="text-3xl font-bold text-amber-600">All Users</h2>
            <button
              onClick={() => openForm()}
              className="p-2 px-4 bg-amber-400 rounded-lg font-bold hover:bg-amber-500 hover:text-white"
            >
              Create User
            </button>
          </div>

          {/* Search Field  */}
          <div className="flex justify-end my-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 w-full border-2 border-amber-400 rounded-lg focus:border-amber-500"
            />
          </div>
        </section>

        {/* Section to display users */}
        <section>
          {loading ? (
            <div className="grid min-h-[100px] place-items-center rounded-lg p-6">
              <p>Loading...</p>
            </div>
          ) : loadingError ? (
            <div className="text-red-500 text-center">
              <p>Failed to Fetch Users</p>
            </div>
          ) : (
            <UserTable onEdit={openForm} searchQuery={searchQuery} />
          )}
        </section>
      </main>

      {/* Modal for pop up form */}
      {isFormOpen && (
        <Form isOpen={isFormOpen} onClose={closeForm} user={currentUser} />
      )}
    </div>
  );
}

export default Home;
