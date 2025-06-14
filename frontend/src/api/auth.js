import axios from "axios";
import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/signup", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
