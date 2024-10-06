import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUsers } from "../hooks/useUsers";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";

function Form({ isOpen, onClose, user }) {
  const { addUser, editUser } = useUsers();

  // Initializing react-hook-form with default form values
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      username: "",
      street: "",
      city: "",
      companyName: "",
      website: "",
    },
  });

  // Auto-fill form fields if user passed
  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("username", user.username || "USER-");
      setValue("street", user.address?.street || "");
      setValue("city", user.address?.city || "");
      setValue("companyName", user.company?.name || "");
      setValue("website", user.website || "");
    } else {
      reset();
      setValue("username", "USER-");
    }
  }, [user, setValue, reset]);

  // Function to handle updating an existing user
  const handleEditUser = async (userData) => {
    const status = await editUser(userData);
    if (status) {
      toast.success("User updated successfully");
    } else {
      toast.error("Failed to Update user");
    }
  };

  // Function to handle adding a new user
  const handleCreateUser = async (userData) => {
    const status = await addUser(userData);
    if (status) {
      toast.success("User added successfully");
    } else {
      toast.error("Failed to Add user");
    }
  };

  // Function to handle form submission
  const onSubmitForm = async (data) => {
    const userData = {
      ...data,
      company: { name: data.companyName },
      address: { street: data.street, city: data.city },
    };

    if (user) {
       handleEditUser({ ...user, ...userData });
    } else {
       handleCreateUser(userData);
    }
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed w-full h-screen inset-0 bg-amber-200 bg-opacity-30 flex items-center justify-center px-6">
      <div className="bg-white border-2 border-amber-400 text-black p-6 rounded-md w-full mx-auto lg:w-[70%] shadow-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-amber-500 mb-4">
            {user ? "Edit User" : "Create User"}{" "}
          </h2>
          <button onClick={onClose}>
            <ImCross /> 
          </button>
        </div>

        {/* Form for creating or editing user */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="sm:divide-y sm:divide-amber-400">
            <div className="text-base leading-6 space-y-3 text-black sm:py-4 sm:text-lg">
              {/* Name Field */}
              <div className="flex flex-col">
                <label className="leading-loose text-amber-600">Name</label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  className="px-4 py-2 border focus:ring-amber-500 focus:border-amber-500 w-full sm:text-sm border-amber-400 rounded-md focus:outline-none"
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label className="leading-loose text-amber-600">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email must be a valid format",
                    },
                  })}
                  className="px-4 py-2 border focus:ring-amber-500 focus:border-amber-500 w-full sm:text-sm border-amber-400 rounded-md focus:outline-none"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="flex flex-col">
                <label className="leading-loose text-amber-600">Phone</label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^\d{10}$/, // Expect a 10-digit phone number
                      message: "Phone must be a valid phone number",
                    },
                  })}
                  className="px-4 py-2 border focus:ring-amber-500 focus:border-amber-500 w-full sm:text-sm border-amber-400 rounded-md focus:outline-none"
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* Username Field */}
              <div className="flex flex-col">
                <label className="leading-loose text-amber-600">Username</label>
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  className="px-4 py-2 border focus:ring-amber-500 focus:border-amber-500 w-full sm:text-sm border-amber-400 rounded-md focus:outline-none"
                  placeholder="User-"
                  readOnly={user}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Address Fields */}
              <div className="flex flex-col">
                <label className="leading-loose text-amber-600">Street</label>
                <input
                  type="text"
                  {...register("street", { required: "Street is required" })}
                  className="px-4 py-2 border focus:ring-amber-500 focus:border-amber-500 w-full sm:text-sm border-amber-400 rounded-md focus:outline-none"
                  placeholder="Enter street"
                />
                {errors.street && (
                  <p className="text-red-500 text-sm">
                    {errors.street.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="leading-loose text-amber-600">City</label>
                <input
                  type="text"
                  {...register("city", { required: "City is required" })}
                  className="px-4 py-2 border focus:ring-amber-500 focus:border-amber-500 w-full sm:text-sm border-amber-400 rounded-md focus:outline-none"
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>

              {/* Company Field */}
              <div className="flex flex-col">
                <label className="leading-loose text-amber-600">Company</label>
                <input
                  type="text"
                  {...register("companyName", {
                    minLength: {
                      value: 3,
                      message: "Company name must be at least 3 characters",
                    },
                  })}
                  className="px-4 py-2 border focus:ring-amber-500 focus:border-amber-500 w-full sm:text-sm border-amber-400 rounded-md focus:outline-none"
                  placeholder="Enter company name (optional)"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              {/* Website Field */}
              <div className="flex flex-col">
                <label className="leading-loose text-amber-600">Website</label>
                <input
                  type="text"
                  {...register("website", {
                    required: "Website is required",
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/,
                      message: "Website must be a valid URL",
                    },
                  })}
                  className="px-4 py-2 border focus:ring-amber-500 focus:border-amber-500 w-full sm:text-sm border-amber-400 rounded-md focus:outline-none"
                  placeholder="Enter website"
                />
                {errors.website && (
                  <p className="text-red-500 text-sm">
                    {errors.website.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form buttons for submission and cancel */}
          <div className="pt-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              type="button"
              className="flex justify-center items-center w-full text-amber-600 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-amber-500 border-amber-400 border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex justify-center items-center w-full text-white bg-amber-400 hover:bg-amber-500 px-4 py-3 rounded-md focus:outline-none"
            >
              {user ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(Form);
