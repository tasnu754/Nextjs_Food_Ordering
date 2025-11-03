"use client";

import React from "react";
import UserCard from "./UserCard";
import UserRow from "./userRow";

import { Oswald, Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const UsersTable = ({ users }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterRole, setFilterRole] = React.useState("all");

  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === "all" || user?.role.toLowerCase() === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className={`${roboto.className}`}>
      <div className="px-4 sm:px-6 pt-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2.5 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition bg-white"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        <p className="text-md sm:text-sm text-[#C9983C] mt-3">
          Showing {filteredUsers?.length} of {users?.length} users
        </p>
      </div>

      <div className="block lg:hidden">
        {filteredUsers?.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              No users found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            {filteredUsers?.map((user) => (
              <UserCard key={user?._id || user?.id} user={user} />
            ))}
          </div>
        )}
      </div>

      <div className="hidden lg:block overflow-x-auto">
        {filteredUsers?.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              No users found matching your criteria.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead
              className={`bg-gray-50 border-b !text-lg border-gray-200 ${oswald.className}`}
            >
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-[#5E0208] uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left  font-semibold text-[#5E0208] uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left  font-semibold text-[#5E0208] uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-right flex justify-center font-semibold text-[#5E0208] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers?.map((user) => (
                <UserRow key={user?._id} user={user} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UsersTable;
