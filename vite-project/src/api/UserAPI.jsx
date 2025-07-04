import TokenManager from "./TokenManager";
import api from "./API";

const UserAPI = {
  postUser: async (newUser) => {
    try {
      await api.post("/users", newUser);
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  putUser: async (updatedUser) => {
    try {
      await api.put("/users", updatedUser, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      await api.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
};

export default UserAPI;