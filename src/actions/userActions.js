"use server";

import { revalidatePath } from "next/cache";

export async function deleteUser(userId) {
  try {
    const res = await fetch(
      `http://localhost:5001/api/v1/user/delete/${userId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete user");
    }

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User deleted successfully!",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "Failed to delete user. Please try again.",
    };
  }
}

export async function makeAdmin(userId) {
  try {
    const res = await fetch(
      `http://localhost:5001/api/v1/user/make-admin/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "admin" }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update user role");
    }

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User promoted to admin successfully!",
    };
  } catch (error) {
    console.error("Error making admin:", error);
    return {
      success: false,
      message: "Failed to update user role. Please try again.",
    };
  }
}

export async function removeAdmin(userId) {
  try {
    const res = await fetch(
      `http://localhost:5001/api/v1/user/remove-admin/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "user" }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update user role");
    }

    // Revalidate the users page to refresh the data
    revalidatePath("/admin/users");

    return {
      success: true,
      message: "Admin role removed successfully!",
    };
  } catch (error) {
    console.error("Error removing admin:", error);
    return {
      success: false,
      message: "Failed to update user role. Please try again.",
    };
  }
}
