// src/services/UserService.ts
import { AxiosResponse } from "axios";
import APIService from "./APIService";

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
    const response: AxiosResponse<User[]> = await this.get<User[]>("/users");
    return response.data;
  }

  /**
   * Fetch a single user by ID
   * @param id - The user’s ID
   */
  async getUserById(id: number): Promise<User> {
    const response: AxiosResponse<User> = await this.get<User>(`/users/${id}`);
    return response.data;
  }

  /**
   * Create a new user
   * @param user - Object with `name` and `email`
   */
  async createUser(user: { name: string; email: string }): Promise<User> {
    const response: AxiosResponse<User> = await this.post<User>("/users", user);
    return response.data;
  }

  /**
   * Update an existing user
   * @param id - The user’s ID
   * @param user - Partial fields to update
   */
  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.put<User>(`/users/${id}`, user);
    return response.data;
  }

  /**
   * Delete a user by ID
   * @param id - The user’s ID
   */
  async deleteUser(id: number): Promise<void> {
    await this.delete(`/users/${id}`);
  }
}

export default new UserService();
