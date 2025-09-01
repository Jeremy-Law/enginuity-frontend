// src/services/UserService.ts
import { AxiosResponse } from "axios";
import APIService from "./APIService.tsx";

// Define the shape of your User data
export interface User {
  id: number;
  name: string;
  email: string;
}

class UserService extends APIService {
  constructor() {
    super(); // calls the APIService constructor
  }

  /**
   * Fetch all users from the backend
   */
  async getUsers(): Promise<User[]> {
    const url = this.buildURL("users"); // full URL with base + endpoint
    console.log("Fetching from API:", url); // 👈 log the URL being called

    const response: AxiosResponse<User[]> = await this.get<User[]>(url);
    return response.data;
    }

  async registerUser(user: { name: string; email: string; password: string }): Promise<User> {
    const response: AxiosResponse<{ message: string; user: User }> = await this.post("/users/registerUser", user);
    console.log(response.data);
    return response.data.user;
}

}

export default new UserService();
