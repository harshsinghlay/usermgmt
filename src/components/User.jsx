import React from "react";

function User({ user = null }) {
  return (
    <div className="w-full h-screen flex justify-center items-center mt-14 sm:mt-0 px-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 ">
        {/* User Image Section */}
        <section className="w-48 sm:w-1/2">
          <img
            className="w-full h-full rounded-full mb-6 lg:mb-0"
            src={"/user.png"}
            alt="person"
          />
        </section>

        {/* User Details Section */}
        <section className="lg:ml-6 sm:text-lg lg:text-2xl self-center">
          {" "}
          <h4 className="text-3xl font-bold text-amber-500 mb-2">
            {user?.name || "User Name"}
          </h4>
          <span className="text-gray-600">{user?.username || "username"}</span>
          <ul className="mt-6 space-y-2">
            <li>
              <b className="font-bold text-gray-800">Email:</b>{" "}
              {user?.email || "N/A"}
            </li>
            <li>
              <b className="font-bold text-gray-800">Phone:</b>{" "}
              {user?.phone || "N/A"}
            </li>
            <li>
              <b className="font-bold text-gray-800">Website:</b>{" "}
              {user?.website || "N/A"}
            </li>
            <li>
              <b className="font-bold text-gray-800">Company Name:</b>{" "}
              {user?.company?.name || "N/A"}
            </li>
          </ul>
          <div className="mt-6">
            <b className="font-bold text-gray-800">Address:</b>
            <p>
              {user?.address?.suite || ""}, {user?.address?.street || ""}
            </p>
            <p>
              {user?.address?.city || ""}, {user?.address?.zipcode || ""}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default User;
