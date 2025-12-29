import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeCurrentPassword,
  updateAccountDetails,
  updateUserAvatar,
} from "../store/userSlice";
import { useForm } from "react-hook-form";
import Input from "./Input.jsx";

function UserProfile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [activeSelection, setActiveSelection] = useState(null);
  const [editedAvatar, setEditedAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    },
  });

  useEffect(() => {
    reset({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    });
  }, [user, reset]);

  const handleAvatarUpdate = () => {
    if (!editedAvatar) return;
    dispatch(updateUserAvatar({ avatarFile: editedAvatar }));
    setActiveSelection(null);
  };

  const handleAccountUpdate = (data) => {
    dispatch(
      updateAccountDetails({
        fullName: data.fullName,
        username: data.username,
        email: data.email,
      })
    );
    setActiveSelection(null);
  };

  const handlePasswordUpdate = (data) => {
    dispatch(
      changeCurrentPassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })
    );
    setActiveSelection(null);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-md">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800">User Profile</h2>

      {/* Avatar Section */}
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover border"
        />

        {activeSelection === "avatar" ? (
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditedAvatar(e.target.files[0])}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAvatarUpdate}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
              </button>
              <button
                onClick={() => setActiveSelection(null)}
                className="px-4 py-1 border rounded hover:bg-gray-100">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setActiveSelection("avatar")}
            className="text-blue-600 hover:underline">
            Edit Avatar
          </button>
        )}
      </div>

      {/* User Info */}
      <div className="space-y-1 text-gray-700">
        <p>
          <span className="font-medium">Full Name:</span> {user.fullName}
        </p>
        <p>
          <span className="font-medium">Username:</span> {user.username}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
      </div>

      {/* Change Password */}
      <div className="border-t pt-4">
        {activeSelection === "password" ? (
          <form
            onSubmit={handleSubmit(handlePasswordUpdate)}
            className="space-y-3">
            <Input
              label="Old Password"
              type="password"
              {...register("oldPassword", { required: true })}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm">Old password required</p>
            )}

            <Input
              label="New Password"
              type="password"
              {...register("newPassword", { required: true })}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">New password required</p>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Change Password
              </button>
              <button
                type="button"
                onClick={() => setActiveSelection(null)}
                className="px-4 py-1 border rounded hover:bg-gray-100">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setActiveSelection("password")}
            className="text-blue-600 hover:underline">
            Change Password
          </button>
        )}
      </div>

      {/* Update Account */}
      <div className="border-t pt-4">
        {activeSelection === "account" ? (
          <form
            onSubmit={handleSubmit(handleAccountUpdate)}
            className="space-y-3">
            <Input
              label="Full Name"
              {...register("fullName", {
                validate: (v) => v.trim() !== "" || "Cannot be empty",
              })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}

            <Input
              label="Username"
              {...register("username", {
                validate: (v) => v.trim() !== "" || "Cannot be empty",
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}

            <Input
              label="Email"
              {...register("email", {
                validate: (v) => v.trim() !== "" || "Cannot be empty",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Update Details
              </button>
              <button
                type="button"
                onClick={() => setActiveSelection(null)}
                className="px-4 py-1 border rounded hover:bg-gray-100">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setActiveSelection("account")}
            className="text-blue-600 hover:underline">
            Update Account Details
          </button>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
