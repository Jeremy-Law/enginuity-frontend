import { AxiosResponse } from "axios";
import APIService from "./APIService.tsx";

export interface User {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

class UserService extends APIService {
  constructor() {
    super();
  }

  // -------- USERS --------

  async getUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await this.get("/users");
    return response.data;
  }

  async getUserById(id: number): Promise<User> {
    const response: AxiosResponse<User> = await this.get(`/users/${id}`);
    return response.data;
  }

  async createUser(user: { name: string; email: string; password: string }): Promise<User> {
    const response: AxiosResponse<User> = await this.post("/users", user);
    return response.data;
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.put(`/users/${id}`, user);
    return response.data;
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(`/users/${id}`);
  }

  // -------- AUTH --------

  async login(email: string, password: string): Promise<{ message: string; user: User }> {
    const response: AxiosResponse<{ message: string; user: User }> = await this.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  }

  // -------- ACTIVATE / DEACTIVATE --------

  async activateUser(id: number): Promise<User> {
    const response: AxiosResponse<User> = await this.patch(`/users/${id}/activate`);
    return response.data;
  }

  async deactivateUser(id: number): Promise<User> {
    const response: AxiosResponse<User> = await this.patch(`/users/${id}/deactivate`);
    return response.data;
  }
}

export default new UserService();
