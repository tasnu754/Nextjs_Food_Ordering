"use client";

import { useSelector } from "react-redux";

const UserName = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Hey {user?.name}!</h1>
    </div>
  );
};

export default UserName;
